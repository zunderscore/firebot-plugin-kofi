import { EventSource } from "@crowbartools/firebot-custom-scripts-types/types/modules/event-manager";
import {
    PLUGIN_NAME,
    KOFI_EVENT_SOURCE_ID,
    KOFI_DONATION_EVENT_ID,
    KOFI_SUBSCRIPTION_EVENT_ID,
    KOFI_SHOP_ORDER_EVENT_ID
} from "../constants";

export const KofiEventSource: EventSource = {
    id: KOFI_EVENT_SOURCE_ID,
    name: PLUGIN_NAME,
    events: [
        {
            id: KOFI_DONATION_EVENT_ID,
            name: "Ko-fi: Donation",
            description: "When you receive a Ko-fi donation"
        },
        {
            id: KOFI_SUBSCRIPTION_EVENT_ID,
            name: "Ko-fi: Subscription",
            description: "When you receive a Ko-fi subscription payment"
        },
        {
            id: KOFI_SHOP_ORDER_EVENT_ID,
            name: "Ko-fi: Shop Order",
            description: "When you receive a Ko-fi shop order"
        }
    ]
}