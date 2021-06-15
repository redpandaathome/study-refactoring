let plays = {
  hamlet: { name: "Hamlet", type: "tragedy" },
  "as-like": { name: "As You Like it", type: "comedy" },
  othello: { name: "Othello", type: "tragedy" },
};

let invoice = [
  {
    customer: "BigCo",
    performances: [
      { playId: "hamlet", audience: 55 },
      { playId: "as-like", audience: 35 },
      { playId: "othello", audience: 40 },
    ],
  },
];

function statement(invoice, plays) {
  const statementData = {};
  statementData.customer = invoice[0].customer;
  //✨instead of calling playFor()->middle data
  statementData.performances = invoice[0].performances.map(enrichPerformance);
  return renderPlainText(statementData)

  //✨ js shallow copy
  function enrichPerformance(aPerformance){
    console.log("aPerf", aPerformance)
    const result = Object.assign({}, aPerformance)
    result.play = playFor(result);
    result.amount = amountFor(result);
    result.volumeCredits = volumeCreditsFor(result);
    console.log("...", result)
    return result;
  }

  function volumeCreditsFor(aPerformance) {
    let result = 0;
    result += Math.max(aPerformance.audience - 30, 0);
    if ("comedy" == aPerformance.type)
      result += Math.floor(aPerformance.audience / 5);
    return result;
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

  function playFor(aPerformance){
    return plays[aPerformance.playId]
  }

  function renderPlainText(data){
    let result = `청구 내역 (고객명: ${data.customer})\n`;
  
    for (let perf of data.performances) {
      //perf:
      // {
      //   playId: 'othello',
      //   audience: 40,
      //   play: { name: 'Othello', type: 'tragedy' }
      // }
      result += ` ${perf.play.name}: ${usd(perf.amount)} (${
        perf.audience
      }석)\n`;
    }
  
    result += `총액: ${usd(totalAmount())}`;
    result += `적립포인트: ${totalVolumeCredits()}점\n`;
    return result;

    //반복문을 쪼개서 성능이 느려지지 않을까? ->이 정도 중복은 영향이 미미하다.
    //리팩터링에 대한 성능 문제는 특별한 경우가 아니라면 일단 무시하라
    function totalVolumeCredits(){
      let result = 0;
      //separate...
      for (let perf of data.performances) {
        result += perf.volumeCredits;
      }
      return result
    }
    
    function totalAmount(){
      let result = 0;
      for (let perf of data.performances) {
        result += amountFor(perf);
      }
      return result
    }
    
    
    
    function usd(aNumber){
      return new Intl.NumberFormat("en-Us", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
      }).format(aNumber/100);
    }
    
    
  }
}

console.log(statement(invoice, plays));
