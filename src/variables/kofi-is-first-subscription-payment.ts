import { ReplaceVariable } from "@crowbartools/firebot-custom-scripts-types/types/modules/replace-variable-manager";
import { KofiEventData } from "../kofi-types";
import {
    KOFI_EVENT_SOURCE_ID,
    KOFI_DONATION_EVENT_ID,
    KOFI_SUBSCRIPTION_EVENT_ID,
    KOFI_SHOP_ORDER_EVENT_ID
} from "../constants";

export const KofiIsFirstSubscriptionPaymentVariable: ReplaceVariable = {
    definition: {
        handle: "kofiIsFirstSubscriptionPayment",
        description: "Whether this Ko-fi transaction is a donor's first subscription payment.",
        possibleDataOutput: [ "bool" ],
        categories: [ "trigger based", "advanced" ],
        triggers: {
            event: [
                `${KOFI_EVENT_SOURCE_ID}:${KOFI_DONATION_EVENT_ID}`,
                `${KOFI_EVENT_SOURCE_ID}:${KOFI_SUBSCRIPTION_EVENT_ID}`,
                `${KOFI_EVENT_SOURCE_ID}:${KOFI_SHOP_ORDER_EVENT_ID}`
            ],
            manual: true
        }
    },
    evaluator: async (trigger) => {
        return (trigger.metadata?.eventData as KofiEventData)?.isFirstSubscriptionPayment === true;
    }
};