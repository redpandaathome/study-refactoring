// let assert = require('assert');
import * as assert from 'assert'
import 'mocha'
import { Province, sampleProvinceData } from '../Province.js';
describe('TEST START', function() {
  describe('province', function() {
    it('shortfall', function() {
       const asia = new Province(sampleProvinceData());
      assert.equal(asia.shortfall, 5);
    });
    it('profit', function() {
      const asia = new Province(sampleProvinceData());
      assert.equal(asia.profit, 230);
   });
  });
});