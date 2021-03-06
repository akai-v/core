import { Bot, BaseClient, Channel, ClientUser, ClientHandler, User, UserMessage, BotModule } from "..";

/*
 * Created on Wed Oct 09 2019
 *
 * Copyright (c) storycraft. Licensed under the MIT Licence.
 */

export namespace Testing {
    export class TestBot extends Bot {

        constructor() {
            super('testBot', '');
        }
    
        onStart() {
    
        }
    
        onStop() {
    
        }
    
    }
    
    export class TestClient extends BaseClient { // Clients should export `${clientName}Client` like here
    
        private clientId: string;
        
        private testChannel: Channel;
    
        constructor({ clientId }: {
            clientId: string
        }) { //All clients should receive object as params
            super();
    
            this.clientId = clientId;
    
            this.testChannel = new TestChannel(this, 'null');
        }
    
        get ClientId(): string {
            return this.clientId;
        }
    
        get ClientName(): string {
            return 'Test Client';
        }
    
        get TestChannel() {
            return this.testChannel;
        }
    
        get ChannelList(): Channel[] {
            return [ this.testChannel ];
        }
    
        protected createClientUser(): ClientUser {
            return new TestClientUser(this, '1');
        }
    
        protected createHandler(bot: Bot): ClientHandler<BaseClient> {
            return new TestClientHandler(this, bot);
        }
    
        protected async startClient(): Promise<void> {
    
        }
    
        protected async stopClient(): Promise<void> {
    
        }
    
        isValidChannel(channel: Channel): boolean {
            return channel && channel === this.testChannel;
        }
    
        isValidUser(user: User): boolean {
            return user && user instanceof TestUser;
        }
    
        async sendText(text: string, channel: Channel): Promise<UserMessage[]> {
            return [ new TestMessage(this.ClientUser, channel, text, Date.now()) ];
        }

        async simulateSendText(text: string, channel: Channel = this.TestChannel) {
            return this.sendText(text, channel);
        }

        simulateMessageReceived(text: string, channel: Channel = this.TestChannel) {
            this.messageReceived(new TestMessage(this.ClientUser, channel, text, Date.now()));
        }
    
    }
    
    export class TestClientHandler extends ClientHandler<TestClient> {
        
    }
    
    export class TestChannel extends Channel {

        public userList: User[] = [];

        get Name(): string {
            return 'TestChannel';
        }

        async getUserList() {
            return this.userList;
        }
    
    }
    
    export class TestMessage extends UserMessage {
    
        get Editable(): boolean {
            return true;
        }
    
        get Deletable(): boolean {
            return true;
        }
    
        async editText(text: string): Promise<UserMessage> {
            return new TestMessage(this.Sender, this.Channel, text, Date.now(), this.AttachmentList);
        }
    
        async delete() {
            return true;
        }
    
    }
    
    export class TestClientUser extends ClientUser {
    
        get Name(): string {
            return 'TestChannel';
        }
    
        get Connected() {
            return true;
        }

        get HasAvatar() {
            return false;
        }
    
        async getAvatarURL(): Promise<string> {
            throw new Error(`Test User doesn't have avatar`);
        }
    
    }
    
    
    export class TestUser extends User {
    
        get Client(): TestClient {
            return this.Client as TestClient;
        }
    
        get Name(): string {
            return 'TestChannel';
        }
    
        get HasDMChannel() {
            return true;
        }
    
        async getDMChannel(): Promise<Channel> {
            return this.Client.TestChannel;
        }

        get HasAvatar() {
            return false;
        }
    
        async getAvatarURL(): Promise<string> {
            throw new Error(`Test User doesn't have avatar`);
        }
    
    }
    
    export class TestModule extends BotModule {
    
        private name: string;
        private namespace: string;
        
        constructor(name: string, namespace: string) {
            super();
    
            this.name = name;
            this.namespace = namespace;
        }
        
        get Name() {
            return this.name;
        }
    
        get Namespace() {
            return this.namespace;
        }
    
        get Description() {
            return 'Test module';
        }
    }
}