import { Firebot } from "@crowbartools/firebot-custom-scripts-types";
import { Logger } from "@crowbartools/firebot-custom-scripts-types/types/modules/logger";
import { EventManager } from "@crowbartools/firebot-custom-scripts-types/types/modules/event-manager";
import { ReplaceVariableManager } from "@crowbartools/firebot-custom-scripts-types/types/modules/replace-variable-manager";
import { WebhookConfig, WebhookManager } from "@crowbartools/firebot-custom-scripts-types/types/modules/webhook-manager";

import { KofiEventSource } from "./events";
import { KofiVariables, FirebotVariableAdditionalEvents } from "./variables";

import {
    KofiPayload,
    KofiBaseEventData,
    KofiSubscriptionEventData,
    KofiShopItem,
    KofiShopOrderEventData
} from "./kofi-types";

import {
    PLUGIN_NAME,
    EVENT_SOURCE_ID,
    DONATION_EVENT_ID,
    SUBSCRIPTION_EVENT_ID,
    SHOP_ORDER_EVENT_ID
} from "./constants";


const packageInfo = require("../package.json");

let logger: Logger;
let eventManager: EventManager;
let replaceVariableManager: ReplaceVariableManager;
let webhookManager: WebhookManager;

let verificationToken: string;

const logDebug = (msg: string, ...meta: any[]) => logger.debug(`[${PLUGIN_NAME}] ${msg}`, ...meta);
const logInfo = (msg: string, ...meta: any[]) => logger.info(`[${PLUGIN_NAME}] ${msg}`, ...meta);
const logWarn = (msg: string, ...meta: any[]) => logger.warn(`[${PLUGIN_NAME}] ${msg}`, ...meta);
const logError = (msg: string, ...meta: any[]) => logger.error(`[${PLUGIN_NAME}] ${msg}`, ...meta);

const processWebhook = ({ config, payload }: { config: WebhookConfig, payload: { data: string } }) => {
    logDebug(`Got webhook for ${config.name}`);
    if (config.name !== PLUGIN_NAME) {
        logDebug(`Received unknown webhook event for ${config.name}. Ignoring.`);
        return;
    }

    const payloadData: KofiPayload = JSON.parse(payload.data);

    if (payloadData.verification_token !== verificationToken) {
        logWarn(`Received webhook but verification token does not match. Ignoring.`);
        return;
    }

    let eventName: string;
    let eventData: KofiBaseEventData = {
        from: payloadData.from_name,
        donationMessage: payloadData.is_public === true ? payloadData.message : null,
        donationAmount: Number(payloadData.amount),

        verificationToken: payloadData.verification_token,
        messageId: payloadData.message_id,
        timestamp: payloadData.timestamp,
        type: payloadData.type,
        isPublic: payloadData.is_public,
        url: payloadData.url,
        email: payloadData.email,
        currency: payloadData.currency,
        isSubscriptionPayment: payloadData.is_subscription_payment,
        isFirstSubscriptionPayment: payloadData.is_first_subscription_payment,
        transactionId: payloadData.kofi_transaction_id,
        discordUsername: payloadData.discord_username,
        discordUserId: payloadData.discord_userid
    };

    logDebug(`Webhook type: ${payloadData.type}`);

    switch (payloadData.type) {
        case "Donation":
            eventName = DONATION_EVENT_ID;
            break;
            
        case "Subscription":
            eventName = SUBSCRIPTION_EVENT_ID;
            (eventData as KofiSubscriptionEventData).tierName = payloadData.tier_name;
            break;
            
        case "Shop Order":
            eventName = SHOP_ORDER_EVENT_ID;
            
            const shopItems: KofiShopItem[] = [];
            for (const item of payloadData.shop_items) {
                shopItems.push({
                    directLinkCode: item.direct_link_code,
                    variationName: item.variation_name,
                    quantity: item.quantity
                })
            }
            (eventData as KofiShopOrderEventData).shopItems = shopItems;

            break;

        default:
            logDebug(`Unknown event type ${(payloadData as any).type}`);
            return;
    }

    logDebug(`Triggering event ${eventName}`);
    eventManager.triggerEvent(EVENT_SOURCE_ID, eventName, eventData);
};

const script: Firebot.CustomScript<{
    verificationToken: string;
    copyWebhookUrl: void;
}> = {
    getScriptManifest: () => {
        return {
            name: PLUGIN_NAME,
            description: packageInfo.description,
            author: packageInfo.author,
            version: packageInfo.version,
            firebotVersion: "5",
            startupOnly: true,
            initBeforeShowingParams: true
        };
    },
    getDefaultParameters: () => ({
        verificationToken: {
            title: "Ko-fi Verification Token",
            description: "This value is provided by Ko-fi on the API page of your Ko-fi settings. It ensures that any webhook data received is legitimate and correlates to your Ko-fi account.",
            type: "password",
            default: ""
        },
        copyWebhookUrl: {
            type: "button",
            title: "Webhook URL",
            description: "Copy this URL and paste it into the **Webhook URL** field in your Ko-fi account under More > API > Webhooks.",
            backendEventName: "kofi:copy-webhook-url",
            buttonText: "Copy URL",
            icon: "fa-copy",
            sync: true
        }
    }),
    parametersUpdated: (params) => {
        verificationToken = params.verificationToken;
        logDebug("Verification token updated");
    },
    run: ({ modules, parameters }) => {
        ({ logger, eventManager, replaceVariableManager, webhookManager } = modules);
        ({ verificationToken } = parameters);

        logInfo(`Starting ${PLUGIN_NAME} plugin...`);

        if (webhookManager == null) {
            logError(`Cannot start ${PLUGIN_NAME} plugin. You must be on Firebot 5.65 or higher.`);
            return;
        }

        logDebug("Registering events...");
        eventManager.registerEventSource(KofiEventSource);

        logDebug("Registering variables...");
        for (const variable of KofiVariables) {
            replaceVariableManager.registerReplaceVariable(variable);
        }

        for (const firebotVariable of Object.keys(FirebotVariableAdditionalEvents)) {
            for (const eventName of FirebotVariableAdditionalEvents[firebotVariable]) {
                replaceVariableManager.addEventToVariable(firebotVariable, EVENT_SOURCE_ID, eventName);
            }
        }

        logDebug("Registering frontend listener");
        const frontendCommunicator = modules.frontendCommunicator;
        frontendCommunicator.on("kofi:copy-webhook-url", () => {
            frontendCommunicator.send("copy-to-clipboard", { 
                text: webhookManager.getWebhookUrl(PLUGIN_NAME),
            });
        });


        logDebug("Registering webhook listener...");
        webhookManager.on("webhook-received", processWebhook);

        logDebug("Checking for webhook...");
        let webhook = webhookManager.getWebhook(PLUGIN_NAME);

        if (webhook == null) {
            logDebug("Webhook not found. Registering...");

            webhook = webhookManager.saveWebhook(PLUGIN_NAME);
        }

        if (webhook == null) {
            logError("Something went wrong while registering webhook. Exiting.");
            return;
        }

        logDebug("Webhook registered");
        logInfo("Plugin ready. Listening for events.");
    },
    stop: (uninstalling: boolean) => {
        logDebug(`Stopping ${PLUGIN_NAME} plugin`);

        logDebug("Stopping webhook listener");
        webhookManager.removeListener("webhook-received", processWebhook);

        if (uninstalling === true) {
            logDebug("Removing webhook...");

            webhookManager.deleteWebhook(PLUGIN_NAME);

            logInfo("Plugin uninstalled");
        } else {
            logInfo("Plugin stopped");
        }
    }
};

export default script;