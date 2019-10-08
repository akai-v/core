import { Bot } from '../src/bot';
import { BotModule } from '../src/module/bot-module';
import { expect } from 'chai';

/*
 * Created on Sun Oct 06 2019
 *
 * Copyright (c) storycraft. Licensed under the MIT Licence.
 */

class TestBot extends Bot {

    constructor() {
        super('testBot', '');
    }

    onStart() {

    }

    onStop() {

    }

}

class TestModule extends BotModule {
    
    constructor() {
        super();
    }
    
    get Name() {
        return 'test';
    }

    get Namespace() {
        return 'test';
    }

    get Description() {
        return '';
    }
}

let bot = new TestBot();
let testModule = new TestModule();

bot.ModuleManager.addModule(testModule);

describe('Bot events', function () {
    it('Bot starting', function(done) {
        bot.once('start', done);
        bot.start();
    });

    it('Bot stopping', function(done) {
        bot.once('stop', done);
        bot.stop();
    });
});

describe('Command handling', function () {
    it('Namespaced command parsing', function() {
        let partList = bot.CommandHandler.parseNamespacedCommand('test/testCommand');
        let nonCommandPart = bot.CommandHandler.parseNamespacedCommand('testCommand');

        expect(partList[0]).equal('test');
        expect(partList[1]).equal('testCommand');

        expect(nonCommandPart.length).equal(1);
    });
});