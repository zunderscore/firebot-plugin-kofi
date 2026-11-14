import type { ReplaceVariable } from "@crowbartools/firebot-types";
import type { KofiEventData } from "../kofi-types";
import {
    VARIABLE_PREFIX,
    EVENT_SOURCE_ID,
    DONATION_EVENT_ID,
    SUBSCRIPTION_EVENT_ID,
    SHOP_ORDER_EVENT_ID
} from "../constants";

export const KofiEventTimestampVariable: ReplaceVariable = {
    definition: {
        handle: `${VARIABLE_PREFIX}EventTimestamp`,
        description: "The Ko-fi timestamp of when the event occurred.",
        possibleDataOutput: ["text"],
        categories: ["trigger based", "advanced"],
        triggers: {
            event: [
                `${EVENT_SOURCE_ID}:${DONATION_EVENT_ID}`,
                `${EVENT_SOURCE_ID}:${SUBSCRIPTION_EVENT_ID}`,
                `${EVENT_SOURCE_ID}:${SHOP_ORDER_EVENT_ID}`
            ],
            manual: true
        }
    },
    evaluator: async (trigger) => {
        return (trigger.metadata?.eventData as KofiEventData)?.timestamp;
    }
};