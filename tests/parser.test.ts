import { SpaceSplitedParser, OptionParser } from "../src/module/command/parser/argument-parser";
import { expect, assert } from "chai";

/*
 * Created on Sun Oct 06 2019
 *
 * Copyright (c) storycraft. Licensed under the MIT Licence.
 */

describe('Command parsers', function () {
    it('SpaceSplitedParser', function() {
        let result: string[] = new SpaceSplitedParser().parse('a b c');

        expect(result).to.deep.equal(['a', 'b', 'c']);
    });

    it('OptionParser', function() {
        let result: Map<string, any> = new OptionParser().parse('a b c --dev=true --string="asdf" -s true');

        assert.equal(result.get('a'), true);
        assert.equal(result.get('b'), true);
        assert.equal(result.get('c'), true);

        assert.equal(result.get('dev'), 'true');
        assert.equal(result.get('string'), '"asdf"');
        
        assert.equal(result.get('s'), 'true');
    });
});