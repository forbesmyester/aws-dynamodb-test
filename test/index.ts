/// <reference path="../typings/main.d.ts" />

import * as Types from '../src/types';
import * as Index from '../src/index';
import {expect} from 'chai';

describe('Can', function() {
    it('can do single item stuff', function(done) {
        this.timeout(20000);
        function printResult(result) {
            console.dir(result);
            done();
        }
        Index.addSomething().then(printResult, done);
    });
    it('can do the set thing', function() {
        console.log(Index.createSet());
    });
});
