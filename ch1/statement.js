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

import createStatementData from './createStatementData.js'

function statement(invoice, plays) {
  return renderPlainText(createStatementData(invoice, plays))
}

function renderPlainText(data, plays){
  let result = `청구 내역 (고객명: ${data.customer})\n`;

  for (let perf of data.performances) {
    result += ` ${perf.play.name}: ${usd(perf.amount)} (${
      perf.audience
    }석)\n`;
  }

  result += `총액: ${usd(data.totalAmount)}`;
  result += `적립포인트: ${data.totalVolumeCredits}점\n`;
  return result;
}

function htmlStatement(invoice, plays) {
  return renderHtml(createStatementData(invoice, plays));
}

function renderHtml(data){
  let result = `<h1>청구 내역 (고객명 ${data.customer})</h1>\n`
  result += "<table>\n";
  result += "<tr><th>연극</th><th>좌석 수</th><th>금액</th></tr>"
  for (let perf of data.performances) {
    result += ` <tr><td>${perf.paly.name}</td><td>${perf.audience}</td>`
    result += `<td>${usd(perf.amount)}</td></tr>\n`
  }
  result += "</table>\n"

  result += `<p>총액: <em>${usd(data.totalAmount)}</p>\n`
  result += `<p>적립 포인트: <em>${data.totalVolumeCredits}</p>\n`
  return result;
}

function usd(aNumber){
  return new Intl.NumberFormat("en-Us", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(aNumber/100);
}

console.log(statement(invoice, plays));

