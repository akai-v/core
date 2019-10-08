import { BaseClient, RichMessageTemplate, Channel, UserMessage, MultiTextTemplate } from "../..";

/*
 * Created on Tue Oct 08 2019
 *
 * Copyright (c) storycraft. Licensed under the MIT Licence.
 */

export abstract class TemplateHandler<C extends BaseClient> {

    private client: C;

    constructor(client: C) {
        this.client = client;
    }

    get Client() {
        return this.client;
    }

    abstract canHandle(template: RichMessageTemplate): boolean;

    abstract async send(template: RichMessageTemplate, channel: Channel): Promise<UserMessage[]>;
    
}

export class DefaultTemplateHandler extends TemplateHandler<BaseClient> {

    canHandle(template: RichMessageTemplate) {
        return !!template;
    }

    async send(template: RichMessageTemplate, channel: Channel): Promise<UserMessage[]> {
        return this.Client.sendText(template.toString(), channel);
    }

}

export class MultiTextTemplateHandler extends TemplateHandler<BaseClient> {

    canHandle(template: RichMessageTemplate) {
        return template && template instanceof MultiTextTemplate;
    }

    async send(template: MultiTextTemplate, channel: Channel): Promise<UserMessage[]> {
        let list: UserMessage[] = [];

        for (let text of template.TextList) {
            list.push(...(await this.Client.sendText(text, channel)));
        }

        return list;
    }

}