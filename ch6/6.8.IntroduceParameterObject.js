const station = {
   name: "ZB1",
   readings: [
      {temp: 47, time: "2016-11-01"},
      {temp: 53, time: "2016-11-02"},
      {temp: 58, time: "2016-11-03"},
   ]
}

// from
function readingOutsideRange(station, min, max) {
  return station.readings.filter((r) => r.temp < min || r.temp > max); //✨
}

alerts = readingOutsideRange(
  station,
  operationgPlan.temperatureFloor,
  operationPlan.temperatureCeiling
);
//--------------------------------------------------
// to
class NumberRange1 {
  constructor(min, max) {
    this._data = { min, max };
  }
  get min() {
    return this._data.min;
  }
  get max() {
    return this._data.max;
  }
}
const range1 = new NumberRange1(
  operationgPlan.temperatureFloor,
  operationPlan.temperatureCeiling
);
function readingOutsideRange1(station, range) {
  return station.reading.filter(
    (r) => r.temp < range.min || r.temp > range.max //✨
  );
}
//--------------------------------------------------
// to
class NumberRange {
  constructor(min, max) {
    this._data = { min: min, max: max };
  }

  get min() {
    return this._data.min;
  }
  get max() {
    return this._data.max;
  }

  contains(arg) {
    return arg >= this.min && arg <= this.max;
  }
}

function readingOutsideRange(station, range) {
  return station.readings.filter((r) => !range.contains(r.temp)); //✨
}

const range = new NumberRange(
  operationgPlan.temperatureFloor,
  operationPlan.temperatureCeiling
);

alerts = readingOutsideRange(station, range);
