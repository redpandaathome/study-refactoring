// let assert = require('assert');
import * as assert from "assert";
import "mocha";
import { Province, sampleProvinceData } from "../Province.js";
describe("TEST START", function () {
  describe("province", function () {
    let asia;
    this.beforeEach(function () {
      asia = new Province(sampleProvinceData());
    });
    it("shortfall", function () {
      assert.equal(asia.shortfall, 5);
    });
    it("profit", function () {
      assert.equal(asia.profit, 230);
    });
    it("change production", function () {
      asia.producers[0].production = 20;
      assert.equal(asia.shortfall, -6);
      assert.equal(asia.profit, 292);
    });
    it("zero demand", function () {
      asia.demand = 0;
      assert.equal(asia.shortfall, -25);
      assert.equal(asia.profit, 0);
    });
    it("minus demand", function () {
      asia.demand = -1;
      assert.equal(asia.shortfall, -26);
      assert.equal(asia.profit, -10);
    });
    it("empty string demand", function () {
      asia.demand = "";
      assert.equal(asia.shortfall, NaN);
      assert.equal(asia.profit, NaN);
    });
  });
});

describe("no producers", function () {
  let noProducers;
  this.beforeEach(function () {
    const data = {
      name: "No producers",
      producers: [],
      demand: 30,
      price: 20,
    };
    noProducers = new Province(data);
  });
  it("shortfall", function () {
    assert.equal(noProducers.shortfall, 5);
  });
  it("profit", function () {
    assert.equal(noProducers.profit, 230);
  });
});

describe("string for producers", function(){
   it('', function(){
      const data = {
         name: "String producers",
         producers:"",
         demand: 30,
         price: 20
      };
      const prov = new Province(data);
      assert.equal(prov.shortfall, 0);
   })
})