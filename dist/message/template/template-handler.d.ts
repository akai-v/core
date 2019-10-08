import { BaseClient, RichMessageTemplate, Channel, UserMessage, MultiTextTemplate } from "../..";
export declare abstract class TemplateHandler<C extends BaseClient> {
    private client;
    constructor(client: C);
    readonly Client: C;
    abstract canHandle(template: RichMessageTemplate): boolean;
    abstract send(template: RichMessageTemplate, channel: Channel): Promise<UserMessage[]>;
}
export declare class DefaultTemplateHandler extends TemplateHandler<BaseClient> {
    canHandle(template: RichMessageTemplate): boolean;
    send(template: RichMessageTemplate, channel: Channel): Promise<UserMessage[]>;
}
export declare class MultiTextTemplateHandler extends TemplateHandler<BaseClient> {
    canHandle(template: RichMessageTemplate): boolean;
    send(template: MultiTextTemplate, channel: Channel): Promise<UserMessage[]>;
}
