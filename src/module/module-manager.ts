import { EventEmitter } from "events";
import { BotModule } from "./bot-module";
import { BotModuleEvent } from "../bot-event";
import { ModuleLogger, BotLogger } from "../logger/logger";

/*
 * Created on Sun Oct 06 2019
 *
 * Copyright (c) storycraft. Licensed under the MIT Licence.
 */

export class ModuleManager extends EventEmitter {

    private moduleMap: Map<BotModule, ModuleLogger>;

    constructor(private logger: BotLogger) {
        super();

        this.moduleMap = new Map();
    }

    has(module: BotModule) {
        return this.moduleMap.has(module);
    }

    addModule(module: BotModule): boolean {
        if (this.has(module)) {
            return false;
        }
        
        this.moduleMap.set(module, new ModuleLogger(module, this.logger));
        this.emit('add', new BotModuleEvent(module));

        return true;
    }

    removeModule(module: BotModule): boolean {
        if (!this.has(module)) {
            return false;
        }
        
        this.moduleMap.delete(module);
        this.emit('remove', new BotModuleEvent(module));

        return true;
    }
    
    forEach(func: (module: BotModule) => void) {
        let modules = this.moduleMap.keys();

        for (let module of modules) {
            func(module);
        }
    }

    getModuleLogger(module: BotModule): ModuleLogger {
        if (!this.has(module)) {
            throw new Error(`Module [ ${module.Name} ] is not registered module`);
        }
        
        return this.moduleMap.get(module)!;
    }

    // EventEmitter override

    on(event: 'add' | 'remove', listener: (e: BotModuleEvent) => void): this {
        return super.on(event, listener);
    }

    once(event: 'add' | 'remove', listener: (e: BotModuleEvent) => void): this {
        return super.once(event, listener);
    }

}