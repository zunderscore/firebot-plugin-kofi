import type { EventSource } from "@crowbartools/firebot-types";

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
            description: "When you receive a Ko-fi donation",
            activityFeed: {
                icon: "fad fa-coffee",
                getMessage: (eventData) => {
                    return `Ko-fi: **${eventData.from}** donated **${eventData.donationAmount} ${eventData.currency}**`;
                }
            },
            manualMetadata: {
                from: "zunderscore",
                donationAmount: 10,
                currency: "USD",
                donationMessage: "Thanks for being awesome!",
                isPublic: true
            }
        },
        {
            id: SUBSCRIPTION_EVENT_ID,
            name: `${PLUGIN_NAME}: Subscription`,
            description: "When you receive a Ko-fi subscription payment",
            activityFeed: {
                icon: "fad fa-coffee",
                getMessage: (eventData) => {
                    return eventData.tierName != null
                        ? `Ko-fi: **${eventData.from}** ${eventData.isFirstSubscriptionPayment !== true ? "re" : ""}subscribed at the **${eventData.tierName}** tier`
                        : `Ko-fi: **${eventData.from}** ${eventData.isFirstSubscriptionPayment !== true ? "re" : ""}subscribed`;
                }
            },
            manualMetadata: {
                from: "zunderscore",
                donationAmount: 10,
                currency: "USD",
                donationMessage: "Thanks for being awesome!",
                isPublic: true,
                isFirstSubscriptionPayment: true,
                tierName: "Gold"
            }
        },
        {
            id: SHOP_ORDER_EVENT_ID,
            name: `${PLUGIN_NAME}: Shop Order`,
            description: "When you receive a Ko-fi shop order",
            activityFeed: {
                icon: "fad fa-coffee",
                getMessage: (eventData) => {
                    return `Ko-fi: **${eventData.from}** made a **${eventData.donationAmount} ${eventData.currency}** shop purchase`;
                }
            },
            manualMetadata: {
                from: "zunderscore",
                donationAmount: 10,
                currency: "USD",
                donationMessage: "Thanks for being awesome!",
                isPublic: true
            }
        }
    ]
}