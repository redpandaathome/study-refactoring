class PerformanceCalculator {
  constructor(aPerformance, aPlay) {
    this.performance = aPerformance;
    this.play = aPlay
  }

  //copied from function amountFor()
  get amount(){
    console.log("this.performance: ",this.performance)
    console.log("this.play: ",this.play)

    let result = 0;
    switch (this.performance.play.type) {
      case "tragedy":
        result = 40000;
        if (this.performance.audience > 30) {
          result += 1000 * (this.performance.audience - 30);
        }
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
}

export default function createStatementData(invoice, plays){
  const result = {};
  result.customer = invoice[0].customer;
  result.performances = invoice[0].performances.map(enrichPerformance);
  result.totalAmount = totalAmount(result);
  result.totalVolumeCredits = totalVolumeCredits(result);
  return result;

  function enrichPerformance(aPerformance){
    //공연료 계산기 생성, 공연 정보를 계산기로 전달
    const calculator = new PerformanceCalculator(aPerformance, playFor(aPerformance));
    console.log("aPerf", aPerformance)
    const result = Object.assign({}, aPerformance)
    result.play = playFor(result);
    result.amount = amountFor(result);
    result.volumeCredits = volumeCreditsFor(result);
    console.log("result: ", result)
    return result;
  }

  function playFor(aPerformance){
    return plays[aPerformance.playId]
  }

  function amountFor(aPerformance) {
    return new PerformanceCalculator(aPerformance, playFor(aPerformance)).amount;
  }

  function volumeCreditsFor(aPerformance) {
    let result = 0;
    result += Math.max(aPerformance.audience - 30, 0);
    if ("comedy" == aPerformance.type)
      result += Math.floor(aPerformance.audience / 5);
    return result;
  }

  function totalAmount(data){
    //p58. 반복문을 파이프라인으로 바꾸기
    return data.performances.reduce((total, p)=>{total+=p.amount, 0})
  }

  function totalVolumeCredits(data){
    return data.performances.reduce((total, p)=> total+p.volumeCredits ,0)
 }
}
