import { KofiCurrencyVariable } from "./kofi-currency";
import { KofiDonorDiscordUserIdVariable } from "./kofi-donor-discord-user-id";
import { KofiDonorDiscordUsernameVariable } from "./kofi-donor-discord-username";
import { KofiDonorEmailVariable } from "./kofi-donor-email";
import { KofiEventTimestampVariable } from "./kofi-event-timestamp";
import { KofiEventTypeVariable } from "./kofi-event-type";
import { KofiIsFirstSubscriptionPaymentVariable } from "./kofi-is-first-subscription-payment";
import { KofiIsSubscriptionPaymentVariable } from "./kofi-is-subscription-payment";
import { KofiMessageIdVariable } from "./kofi-message-id";
import { KofiShopOrderItemsVariable } from "./kofi-shop-order-items";
import { KofiSubscriptionTierNameVariable } from "./kofi-subscription-tier-name";
import { KofiTransactionIdVariable } from "./kofi-transaction-id";
import { KofiTransactionUrlVariable } from "./kofi-transaction-url";
import { KofiVerificationTokenVariable } from "./kofi-verification-token";

import {
    DONATION_EVENT_ID,
    SUBSCRIPTION_EVENT_ID,
    SHOP_ORDER_EVENT_ID
} from "../constants";

export const KofiVariables = [
    KofiCurrencyVariable,
    KofiDonorDiscordUserIdVariable,
    KofiDonorDiscordUsernameVariable,
    KofiDonorEmailVariable,
    KofiEventTimestampVariable,
    KofiEventTypeVariable,
    KofiIsFirstSubscriptionPaymentVariable,
    KofiIsSubscriptionPaymentVariable,
    KofiMessageIdVariable,
    KofiShopOrderItemsVariable,
    KofiSubscriptionTierNameVariable,
    KofiTransactionIdVariable,
    KofiTransactionUrlVariable,
    KofiVerificationTokenVariable
];

export const FirebotVariableAdditionalEvents: Record<string, string[]> = {
    donationFrom: [
        DONATION_EVENT_ID,
        SUBSCRIPTION_EVENT_ID,
        SHOP_ORDER_EVENT_ID
    ],
    donationMessage: [
        DONATION_EVENT_ID,
        SUBSCRIPTION_EVENT_ID,
        SHOP_ORDER_EVENT_ID
    ],
    donationAmount: [
        DONATION_EVENT_ID,
        SUBSCRIPTION_EVENT_ID,
        SHOP_ORDER_EVENT_ID
    ]
}