class PerformanceCalculator {
  constructor(aPerformance) {
    this.performance = aPerformance;
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
    //공연료 계산기 생성
    const calculator = new PerformanceCalculator(aPerformance);
    console.log("aPerf", aPerformance)
    const result = Object.assign({}, aPerformance)
    result.play = playFor(result);
    result.amount = amountFor(result);
    result.volumeCredits = volumeCreditsFor(result);
    console.log("...", result)
    return result;
  }

  function playFor(aPerformance){
    return plays[aPerformance.playId]
  }

  function amountFor(aPerformance) {
    let result = 0;
    switch (aPerformance.play.type) {
      case "tragedy":
        result = 40000;
        if (aPerformance.audience > 30) {
          result += 1000 * (aPerformance.audience - 30);
        }
        break;
      case "comedy":
        result = 30000;
        if (aPerformance.audience > 20) {
          result += 500 * (aPerformance.audience - 20);
        }
        result += 300 * aPerformance.audience;
        break;
      default:
        throw new Error(`알 수 없는 장르: ${aPerformance.play.type}`);
    }
    return result;
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

