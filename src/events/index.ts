import { EventSource } from "@crowbartools/firebot-custom-scripts-types/types/modules/event-manager";
import {
    PLUGIN_NAME,
    EVENT_SOURCE_ID,
    DONATION_EVENT_ID,
    SUBSCRIPTION_EVENT_ID,
    SHOP_ORDER_EVENT_ID
} from "../constants";

export const KofiEventSource: EventSource = {
    id: EVENT_SOURCE_ID,
    name: PLUGIN_NAME,
    events: [
        {
            id: DONATION_EVENT_ID,
            name: `${PLUGIN_NAME}: Donation`,
            description: "When you receive a Ko-fi donation"
        },
        {
            id: SUBSCRIPTION_EVENT_ID,
            name: `${PLUGIN_NAME}: Subscription`,
            description: "When you receive a Ko-fi subscription payment"
        },
        {
            id: SHOP_ORDER_EVENT_ID,
            name: `${PLUGIN_NAME}: Shop Order`,
            description: "When you receive a Ko-fi shop order"
        }
    ]
}