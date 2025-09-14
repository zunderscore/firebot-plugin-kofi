import { ReplaceVariable } from "@crowbartools/firebot-custom-scripts-types/types/modules/replace-variable-manager";
import { KofiShopOrderEventData } from "../kofi-types";
import {
    KOFI_EVENT_SOURCE_ID,
    KOFI_SHOP_ORDER_EVENT_ID
} from "../constants";

export const KofiShopOrderItemsVariable: ReplaceVariable = {
    definition: {
        handle: "kofiShopOrderItems",
        description: "The items from the Ko-fi shop order as an array. Each item has a `directLinkCode`, `variationName`, and `quantity`.",
        possibleDataOutput: [ "array" ],
        categories: [ "trigger based", "advanced" ],
        triggers: {
            event: [
                `${KOFI_EVENT_SOURCE_ID}:${KOFI_SHOP_ORDER_EVENT_ID}`
            ],
            manual: true
        }
    },
    evaluator: async (trigger) => {
        return (trigger.metadata?.eventData as KofiShopOrderEventData)?.shopItems;
    }
};