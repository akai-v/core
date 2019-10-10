import { Testing, BotCommandEvent } from "../src";
import { expect } from "chai";

/*
 * Created on Wed Oct 09 2019
 *
 * Copyright (c) storycraft. Licensed under the MIT Licence.
 */


describe('Command handling', function () {
    let bot = new Testing.TestBot();
    let testClient = new Testing.TestClient('command-testing-client');
    let testModule = new Testing.TestModule('test', 'test');

    bot.ModuleManager.addModule(testModule);
    bot.registerClient(testClient);

    testClient.start();

    bot.start();
    
    it('Namespaced command parsing', function() {
        let partList = bot.CommandHandler.parseNamespacedCommand('test/testCommand');

        expect(partList[0]).equal('test');
        expect(partList[1]).equal('testCommand');
    });

    it('Bot global command handling', function(done) {
        bot.once('command', (e: BotCommandEvent) => {
            if (e.Namespace == 'aa' && e.Command == 'bb' && e.RawArgument == 'x y z') {
                done();
            } else {
                done(new Error(`Expected namespace: aa, command: bb, expected arguments: a b c. Received namespace: ${e.Namespace}, command: ${e.Command}, arguments: ${e.RawArgument}`));
            }
        });

        testClient.simulateMessageReceived('aa/bb x y z');
    });

    it('Module command handling', function(done) {
        testModule.CommandManager.once('test', (e: BotCommandEvent) => {
            if (e.Command == 'test' && e.RawArgument == 'a b c') {
                done();
            } else {
                done(new Error(`Expected command: test, expected arguments: a b c. Received command: ${e.Command}, arguments: ${e.RawArgument}`));
            }
        });

        testClient.simulateMessageReceived('test/test a b c');
    });

    it('Module global command handling', function(done) {
        testModule.once('command', (e: BotCommandEvent) => {
            if (e.Command == 'test1' && e.RawArgument == 'd e f') {
                done();
            } else {
                done(new Error(`Expected command: test1, expected arguments: d e f. Received command: ${e.Command}, arguments: ${e.RawArgument}`));
            }
        });

        testClient.simulateMessageReceived('test/test1 d e f');
    });
});