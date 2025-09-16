import { ReplaceVariable } from "@crowbartools/firebot-custom-scripts-types/types/modules/replace-variable-manager";
import { KofiEventData } from "../kofi-types";
import {
    VARIABLE_PREFIX,
    KOFI_EVENT_SOURCE_ID,
    KOFI_DONATION_EVENT_ID,
    KOFI_SUBSCRIPTION_EVENT_ID,
    KOFI_SHOP_ORDER_EVENT_ID
} from "../constants";

export const KofiEventTypeVariable: ReplaceVariable = {
    definition: {
        handle: `${VARIABLE_PREFIX}EventType`,
        description: "The Ko-fi event type.",
        possibleDataOutput: [ "text" ],
        categories: [ "trigger based", "text" ],
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
        return (trigger.metadata?.eventData as KofiEventData)?.type;
    }
};