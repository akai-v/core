"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const minimist = require("minimist");
class SpaceSplitedParser {
    parse(rawArgs) {
        return rawArgs.split(' ');
    }
}
exports.SpaceSplitedParser = SpaceSplitedParser;
class OptionParser {
    parse(rawArgs) {
        let map = new Map();
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
exports.OptionParser = OptionParser;
//# sourceMappingURL=argument-parser.js.map