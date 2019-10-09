import { Bot } from '../src/bot';
import { BotModule } from '../src/module/bot-module';
import { expect } from 'chai';
import { BaseClient, Channel, User, UserMessage, ClientUser, ClientHandler, Testing } from '../src';

/*
 * Created on Sun Oct 06 2019
 *
 * Copyright (c) storycraft. Licensed under the MIT Licence.
 */

describe('Bot events', function () {
    let bot = new Testing.TestBot();

    it('Bot starting', function(done) {
        bot.once('start', done);
        bot.start();
    });

    it('Bot stopping', function(done) {
        bot.once('stop', done);
        bot.stop();
    });
});