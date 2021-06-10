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
  let totalAmount = 0;
  let volumeCredits = 0;
  let result = `청구 내역 (고객명: ${invoice[0].customer})\n`;
  const format = new Intl.NumberFormat("en-Us", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format;

  for (let perf of invoice[0].performances) {
    //✨play변수 제거하기
    // const play = plays[perf.playId];
    let thisAmount = amountFor(perf, playFor(perf));

    //accumulate points
    volumeCredits += Math.max(perf.audience - 30, 0);
    //희극 관객 5명마다 추가포인트
    //✨변수인라인
    if ("comedy" == playFor(perf).type)
      volumeCredits += Math.floor(perf.audience / 5);

    //print
    //✨변수인라인
    result += ` ${playFor(perf).name}: ${format(thisAmount / 100)} (${
      perf.audience
    }석)\n`;
    totalAmount += thisAmount;
  }
  result += `총액: ${format(totalAmount / 100)}`;
  result += `적립포인트: ${volumeCredits}점\n`;
  return result;
}

function amountFor(aPerformance, play) {
  let result = 0;
  switch (play.type) {
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
      throw new Error(`알 수 없는 장르: ${play.type}`);
  }
  return result;
}

function playFor(aPerformance) {
  return plays[aPerformance.playId];
}
console.log(statement(invoice, plays));
