# Ko-fi Plugin for Firebot

This plugin adds support for Ko-fi events and related variables to Firebot.

## Prerequisites
- Firebot 5.65 or higher
- Ko-fi webhook verification token
  - **NOTE: This is a sensitive value. Treat it like a password and keep it safe!**
  - You can find this in your Ko-fi account under More > API > Webhooks > Advanced > Verification Token

## Setup

1. Copy the `firebot-kofi.js` file into your Firebot profile's `scripts` folder (e.g. `%appdata%\Firebot\v5\profiles\Main Profile\scripts`)
2. Go to Settings > Scripts in Firebot
3. Click on "Manage Startup Scripts"
4. Click "Add New Script"
5. Select the `firebot-kofi.js` file from the dropdown list
6. Enter your Ko-fi webhook verification token in the **Verification Token** field
7. Click "Save" to finish installing the plugin
8. Reopen the plugin settings by clicking the "Edit" button next to "Ko-fi" in the "Startup Scripts" modal
9. Click the "Copy URL" button under "Webhook URL", then close both the script settings and the "Startup Scripts" modals
10. In your Ko-fi account, under More > API > Webhooks, paste the copied URL into the **Webhook URL** field and click "Update"

## Events

New events:
- **Ko-fi: Donation**
- **Ko-fi: Subscription**
- **Ko-fi: Shop Order**

## Variables

Existing Firebot variables with added support for Ko-fi:
- `$donationAmount`
- `$donationFrom`
- `$donationMessage`

New variables:
- `$kofiCurrency`
- `$kofiEventTimestamp`
- `$kofiEventType`
- `$kofiIsFirstSubscriptionPayment`
- `$kofiIsSubscriptionPayment`
- `$kofiMessageId`
- `$kofiShopOrderItems`
- `$kofiSubscriptionTierName`
- `$kofiTransactionId`

**WARNING: The following variables may contain sensitive/private data. Use with caution!**

- `$kofiDonorDiscordUserId`
- `$kofiDonorDiscordUsername`
- `$kofiDonorEmail`
- `$kofiTransactionUrl`
- `$kofiVerificationToken`