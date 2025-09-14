type KofiPayloadType = 
    | "Donation"
    | "Subscription"
    | "Shop Order"

type KofiPayloadBase = {
    "verification_token": string;
    "message_id": string;
    "timestamp": Date;
    "type": KofiPayloadType;
    "is_public": boolean;
    "message": string | null;
    "from_name": string;
    "amount": string;
    "url": string;
    "email": string;
    "currency": string;
    "is_subscription_payment": boolean;
    "is_first_subscription_payment": boolean;
    "kofi_transaction_id": string;
    "discord_username": string;
    "discord_userid": string;
}

type KofiDonationPayload = KofiPayloadBase & {
    "type": "Donation";
}

type KofiSubscriptionPayload = KofiPayloadBase & {
    "type": "Subscription";
    "tier_name": string;
}

type KofiShopOrderPayload = KofiPayloadBase & {
    "type": "Shop Order";
    "shop_items": {
        "direct_link_code": string;
        "variation_name": string;
        "quantity": number;
    }[];
    
    // Intentionally leaving out for privacy
    "shipping": unknown;
}

export type KofiPayload = 
    | KofiDonationPayload
    | KofiSubscriptionPayload
    | KofiShopOrderPayload


export type KofiBaseEventData = {
    // Existing Firebot donation var fields
    from: string;
    donationMessage: string;
    donationAmount: number;

    // Unique fields
    verificationToken: string;
    messageId: string;
    timestamp: Date;
    type?: KofiPayloadType;
    isPublic: boolean;
    url: string;
    email: string;
    currency: string;
    isSubscriptionPayment: boolean;
    isFirstSubscriptionPayment: boolean;
    transactionId: string;
    discordUsername: string;
    discordUserId: string;
}

export type KofiDonationEventData = KofiBaseEventData & {
    type: "Donation";
}

export type KofiSubscriptionEventData = KofiBaseEventData & {
    type: "Subscription";
    tierName: string;
}

export type KofiShopItem = {
    directLinkCode: string;
    variationName: string;
    quantity: number;
}

export type KofiShopOrderEventData = KofiBaseEventData & {
    type: "Shop Order";
    shopItems: KofiShopItem[];
}

export type KofiEventData = 
    | KofiDonationEventData
    | KofiSubscriptionEventData
    | KofiShopOrderEventData