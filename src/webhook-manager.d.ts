// This is only here until the types get updated
import { EventEmitter } from "events";

type WebhookConfig = {
    id: string;
    name: string;
    scriptId: string;
}

export class WebhookManager extends EventEmitter {
    scriptName: string;
    saveWebhook(name: string): WebhookConfig | null;
    getWebhook(name: string): WebhookConfig | null;
    deleteWebhook(name: string): boolean;
    getWebhooks(): WebhookConfig[];
}