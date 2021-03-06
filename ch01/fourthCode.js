
//4.以查询取代临时变量
function playFor(aPerformance) {
    return plays[aPerformance.playID];
}
//3.对函数参数进行命名
function amountFor(aperformance) {
    let result = 0;
    switch (playfor(aperformance).type) {
        case "tragedy":
            result = 40000;
            if (aperformance.audience > 30) {
                result += 1000 * (aperformance.audience - 30);
            }
            break;
        case "comedy":
            result = 30000;
            if (aperformance.audience > 20) {
                result += 10000 + 500 * (aperformance.audience - 20);
            }
            result += 300 * aperformance.audience;
            break;
        default:
            throw new Error(`unknown type: ${playfor(aperformance).type}`);
    }
    return result;
}
//5. 内联变量手法内联 play,thisAmount 变量，减少局部变量
function statement(invoice, plays) {
    let totalAmount = 0;
    let volumeCredits = 0;
    let result = `Statement for ${invoice.customer}\n`;
    const format = new Intl.NumberFormat("en-US",
        {
            style: "currency", currency: "USD",
            minimumFractionDigits: 2
        }).format;
    for (let perf of invoice.performances) {
        //const play = playFor(perf);
        // let thisAmount = amountFor(perf, play);

        // add volume credits
        volumeCredits += Math.max(perf.audience - 30, 0);
        // add extra credit for every ten comedy attendees
        if ("comedy" === playfor(perf).type) volumeCredits += Math.floor(perf.audience / 5);
        // print line for this order
        result += ` ${playfor(perf).name}: ${format(amountFor(perf, playfor(perf)) / 100)} (${perf.audience} seats)\n`;
        totalAmount += amountFor(perf, playfor(perf));
    }
    result += `Amount owed is ${format(totalAmount / 100)}\n`;
    result += `You earned ${volumeCredits} credits\n`;
    return result;
}