import { ReplaceVariable } from "@crowbartools/firebot-custom-scripts-types/types/modules/replace-variable-manager";
import { KofiSubscriptionEventData } from "../kofi-types";
import {
    VARIABLE_PREFIX,
    KOFI_EVENT_SOURCE_ID,
    KOFI_SUBSCRIPTION_EVENT_ID
} from "../constants";

export const KofiSubscriptionTierNameVariable: ReplaceVariable = {
    definition: {
        handle: `${VARIABLE_PREFIX}SubscriptionTierName`,
        description: "The tier name of the Ko-fi subscription.",
        possibleDataOutput: [ "text" ],
        categories: [ "trigger based", "text" ],
        triggers: {
            event: [
                `${KOFI_EVENT_SOURCE_ID}:${KOFI_SUBSCRIPTION_EVENT_ID}`
            ],
            manual: true
        }
    },
    evaluator: async (trigger) => {
        return (trigger.metadata?.eventData as KofiSubscriptionEventData)?.tierName;
    }
};