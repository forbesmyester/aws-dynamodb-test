/// <reference path="../typings/main.d.ts" />

import * as Types from '../src/types';
import * as Index from '../src/index';
import {expect} from 'chai';

describe('Can', function() {
    it('can get', function(done) {
        this.timeout(20000);
        function printResult(result) {
            console.dir(result);
            done();
        }
        Index.addSomething().then(printResult, done);
    });

});
