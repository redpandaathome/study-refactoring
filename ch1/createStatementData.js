function createPerfrmanceCalculator(aPerformance, aPlay) {
  switch (aPlay.type) {
    case "tragedy":
      return new TragedyCalculator(aPerformance, aPlay);
    case "comedy":
      return new ComedyCalculator(aPerformance, aPlay);
    default:
      throw new Error(`알 수 없는 장르: ${aPlay.type}`);
  }
}

class PerformanceCalculator {
  constructor(aPerformance, aPlay) {
    this.performance = aPerformance;
    this.play = aPlay;
  }

  //copied from function amountFor()
  get amount() {
    console.log("this.performance: ", this.performance);
    console.log("this.play: ", this.play);
    let result = 0;
    switch (this.play.type) {
      case "tragedy":
        throw '오류 발생!' //비극 공연료는 TragedyCalculator를 이용하도록 유도
        break;
      case "comedy":
        result = 30000;
        if (this.performance.audience > 20) {
          result += 500 * (this.performance.audience - 20);
        }
        result += 300 * this.performance.audience;
        break;
      default:
        throw new Error(`알 수 없는 장르: ${this.play.play.type}`);
    }
    return result;
  }

  get volumeCredits() {
    let result = 0;
    // q1. 초반에 [0] 부분
    // q2.어째서 this.performance와 this.play를 혼용해서 쓸까? 이미 전자에 필요한 정보가 다 있는데?
    result += Math.max(this.performance.audience - 30, 0);
    if ("comedy" == this.play.type)
      result += Math.floor(this.performance.audience / 5);
    return result;
  }
}

class TragedyCalculator extends PerformanceCalculator {
  get amount(){
    let result = 40000;
      if (this.performance.audience > 30) {
        result += 1000 * (this.performance.audience - 30);
      }
      return result;
  }
}

class ComedyCalculator extends PerformanceCalculator {
  
}

export default function createStatementData(invoice, plays) {
  const result = {};
  result.customer = invoice[0].customer;
  result.performances = invoice[0].performances.map(enrichPerformance);
  result.totalAmount = totalAmount(result);
  result.totalVolumeCredits = totalVolumeCredits(result);
  return result;

  function enrichPerformance(aPerformance) {
    //공연료 계산기 생성, 공연 정보를 계산기로 전달
    const calculator = new createPerfrmanceCalculator(
      aPerformance,
      playFor(aPerformance)
    );
    console.log("aPerf", aPerformance);
    const result = Object.assign({}, aPerformance);
    result.play = calculator.play;
    result.amount = calculator.amount;
    result.volumeCredits = calculator.volumeCredits;
    console.log("result: ", result);
    return result;
  }

  function playFor(aPerformance) {
    return plays[aPerformance.playId];
  }

  function amountFor(aPerformance) {
    return new PerformanceCalculator(aPerformance, playFor(aPerformance))
      .amount;
  }

  function totalAmount(data) {
    //p58. 반복문을 파이프라인으로 바꾸기
    return data.performances.reduce((total, p) => {
      (total += p.amount), 0;
    });
  }

  function totalVolumeCredits(data) {
    return data.performances.reduce((total, p) => total + p.volumeCredits, 0);
  }
}
