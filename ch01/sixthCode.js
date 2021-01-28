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
function volumeCreditsFor(aPerformance) {
    let result = 0;
    result += Math.max(aPerformance.audience - 30, 0);
    if ("comedy" === playFor(aPerformance).type) {
        result += Math.floor(aPerformance.audience / 5);
    }
    return result;
}
//6.改变 format 函数命名
function usd(aNumber) {
    return new Intl.NumberFormat("en-US",
        {
            style: "currency", currency: "USD",
            minimumFractionDigits: 2
        }).format(aNumber / 100);
}
//计算过程应用提炼函数 (106)手法。
function totalVolumeCredits() {
    let volumeCredits = 0;
    for (let perf of invoice.performances) {
        volumeCredits += volumeCreditsFor(perf);
    }
    return volumeCredits;
}
//5. 内联变量手法内联 play,thisAmount 变量，减少局部变量
function statement(invoice, plays) {
    let totalAmount = 0;
    let result = `Statement for ${invoice.customer}\n`;

    //7.拆分循环
    for (let perf of invoice.performances) {
        // print line for this order
        result += ` ${playFor(perf).name}: ${usd(amountFor(perf))} (${perf.audience} seats)\n`;
        totalAmount += amountFor(perf);
    }
    //8.移动变量语句(223)手法
    let volumeCredits = 0;
    for (let perf of invoice.performances) {
        volumeCredits += volumeCreditsFor(perf);
    }
    // for (let perf of invoice.performances) {
    //     volumeCredits += volumeCreditsFor(perf);

    //     // print line for this order
    //     result += ` ${playfor(perf).name}: ${usd(amountFor(perf, playfor(perf)) / 100)} (${perf.audience} seats)\n`;
    //     totalAmount += amountFor(perf, playfor(perf));
    // }
    result += `Amount owed is ${usd(totalAmount / 100)}\n`;
    result += `You earned ${volumeCredits} credits\n`;
    return result;
}