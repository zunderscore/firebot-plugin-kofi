import firebot, { Plugin, PluginWebhookEventHandler } from "@crowbartools/firebot-types";

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

let verificationToken: string;

const processWebhook: PluginWebhookEventHandler = ({ webhook, payload }) => {
    firebot.logger.debug(`Got webhook for ${webhook.name}`);
    if (webhook.name !== PLUGIN_NAME) {
        firebot.logger.debug(`Received unknown webhook event for ${webhook.name}. Ignoring.`);
        return;
    }

    const payloadData: KofiPayload = JSON.parse((payload as any).data);

    if (payloadData.verification_token !== verificationToken) {
        firebot.logger.warn(`Received webhook but verification token does not match. Ignoring.`);
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

    firebot.logger.debug(`Webhook type: ${payloadData.type}`);

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
            firebot.logger.debug(`Unknown event type ${(payloadData as any).type}`);
            return;
    }

    firebot.logger.debug(`Triggering event ${eventName}`);
    firebot.events.trigger(EVENT_SOURCE_ID, eventName, eventData);
};

const plugin: Plugin<{
    verificationToken: string;
    copyWebhookUrl: void;
}> = {
    manifest: {
        name: PLUGIN_NAME,
        description: packageInfo.description,
        author: packageInfo.author,
        version: packageInfo.version,
        repo: "https://github.com/zunderscore/firebot-plugin-kofi",
        icon: {
            type: "custom",
            url: "data:image/png;base64,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",
            backgroundColor: "#72A5F2"
        },
        minimumFirebotVersion: { major: 5, minor: 67 },
        initBeforeShowingParams: true
    },
    parametersSchema: [
        {
            name: "verificationToken",
            title: "Ko-fi Verification Token",
            description: "This value is provided by Ko-fi on the API page of your Ko-fi settings. It ensures that any webhook data received is legitimate and correlates to your Ko-fi account.",
            type: "password",
            default: ""
        },
        {
            name: "copyWebhookUrl",
            type: "button",
            title: "Webhook URL",
            description: "Copy this URL and paste it into the **Webhook URL** field in your Ko-fi account under More > API > Webhooks.",
            backendEventName: "kofi:copy-webhook-url",
            buttonText: "Copy URL"
        }
    ],
    registers: {
        eventSources: [KofiEventSource],
        variables: KofiVariables,
        additionalVariableEvents: FirebotVariableAdditionalEvents,
        webhooks: {
            handler: processWebhook,
            webhookNames: [
                PLUGIN_NAME
            ]
        }
    },
    onLoad: (context) => {
        firebot.frontendCommunicator.on("kofi:copy-webhook-url", () => {
            firebot.frontendCommunicator.send("copy-to-clipboard", {
                text: firebot.webhooks.getUrl(PLUGIN_NAME),
            });
        });

        verificationToken = context.parameters.verificationToken;
        firebot.logger.debug("Verification token updated");
    },
    onParameterUpdate: (context) => {
        verificationToken = context.parameters.verificationToken;
        firebot.logger.debug("Verification token updated");
    }
}

export default plugin;