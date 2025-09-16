import { ReplaceVariable } from "@crowbartools/firebot-custom-scripts-types/types/modules/replace-variable-manager";
import { KofiEventData } from "../kofi-types";
import {
    VARIABLE_PREFIX,
    KOFI_EVENT_SOURCE_ID,
    KOFI_DONATION_EVENT_ID,
    KOFI_SUBSCRIPTION_EVENT_ID,
    KOFI_SHOP_ORDER_EVENT_ID
} from "../constants";

export const KofiTransactionUrlVariable: ReplaceVariable = {
    definition: {
        handle: `${VARIABLE_PREFIX}TransactionUrl`,
        description: "**WARNING: Potentially sensitive data! Use this variable with caution!** The URL of the Ko-fi transaction.",
        possibleDataOutput: [ "text" ],
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
        return (trigger.metadata?.eventData as KofiEventData)?.url;
    }
};