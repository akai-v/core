import * as minimist from "minimist";

/*
 * Created on Sun Oct 06 2019
 *
 * Copyright (c) storycraft. Licensed under the MIT Licence.
 */

export interface ArgumentParser<T> {

    parse(rawArgs: string): T;

}

export class SpaceSplitedParser implements ArgumentParser<string[]> {

    parse(rawArgs: string): string[] {
        return rawArgs.split(' ');
    }

}

export class OptionParser implements ArgumentParser<Map<string, any>> {

    parse(rawArgs: string): Map<string, any> {
        let map = new Map<string, any>();

        let object = minimist(rawArgs.split(' '));

        for (let key of object._) {
            map.set(key, true);
        }

        for (let key in object) {
            if (key == '_') {
                continue;
            }

            map.set(key, object[key]);
        }
        
        return map;
    }

}