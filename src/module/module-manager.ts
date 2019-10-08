import { EventEmitter } from "events";
import { BotModule } from "./bot-module";
import { BotModuleEvent } from "../bot-event";

/*
 * Created on Sun Oct 06 2019
 *
 * Copyright (c) storycraft. Licensed under the MIT Licence.
 */

export class ModuleManager extends EventEmitter {

    private moduleList: BotModule[];

    constructor() {
        super();

        this.moduleList = [];
    }

    has(module: BotModule) {
        return this.moduleList.includes(module);
    }

    addModule(module: BotModule): boolean {
        if (this.has(module)) {
            return false;
        }
        
        this.moduleList.push(module);
        this.emit('add', new BotModuleEvent(module));

        return true;
    }

    removeModule(module: BotModule): boolean {
        if (!this.has(module)) {
            return false;
        }
        
        this.moduleList.splice(this.moduleList.indexOf(module), 1);
        this.emit('remove', new BotModuleEvent(module));

        return true;
    }
    
    forEach(func: (module: BotModule) => void) {
        this.moduleList.forEach(func);
    }

    // EventEmitter override

    on(event: 'add' | 'remove', listener: (e: BotModuleEvent) => void): this {
        return super.on(event, listener);
    }

    once(event: 'add' | 'remove', listener: (e: BotModuleEvent) => void): this {
        return super.once(event, listener);
    }

}