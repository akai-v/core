import { Testing, ClientMessageEvent, BotMessageEvent } from "../src";
import { expect } from "chai";

/*
 * Created on Wed Oct 09 2019
 *
 * Copyright (c) storycraft. Licensed under the MIT Licence.
 */

describe('Message handling', function () {
    let bot = new Testing.TestBot();

    let testModule = new Testing.TestModule('test', 'test');
    let testClient = new Testing.TestClient({ clientId: 'message-testing-client' });

    testClient.start();

    bot.registerClient(testClient);
    bot.ModuleManager.addModule(testModule);

    bot.start();

    it('Client Message handling', function(done) {
        testClient.once('message', (e: ClientMessageEvent) => {
            if (e.Message.Text == 'test0') {
                done();
            } else {
                done(new Error(`Received wrong message ${e.Message.Text}`));
            }
        });

        testClient.simulateMessageReceived('test0');
    });
    
    it('Channel Message handling', function(done) {
        let channel = testClient.TestChannel;

        channel.once('message', (e: ClientMessageEvent) => {
            if (e.Message.Text == 'test1') {
                done();
            } else {
                done(new Error(`Received wrong message ${e.Message.Text}`));
            }
        });

        testClient.simulateMessageReceived('test1', channel);
    });

    it('User Message handling', function(done) {
        testClient.ClientUser.once('message', (e: ClientMessageEvent) => {
            if (e.Message.Text == 'test2') {
                done();
            } else {
                done(new Error(`Received wrong message ${e.Message.Text}`));
            }
        });

        testClient.simulateMessageReceived('test2');
    });

    it('Bot Message handling', function(done) {
        bot.once('message', (e: BotMessageEvent) => {
            if (e.Message.Text == 'test3') {
                done();
            } else {
                done(new Error(`Received wrong message ${e.Message.Text}`));
            }
        });

        testClient.simulateMessageReceived('test3');
    });

    it('Module Message handling', function(done) {
        testModule.once('message', (e: BotMessageEvent) => {
            if (e.Message.Text == 'test4') {
                done();
            } else {
                done(new Error(`Received wrong message ${e.Message.Text}`));
            }
        });

        testClient.simulateMessageReceived('test4');
    });

});