import React, { useState } from "react";

const CompoundInterestCalculator = () => {
  const [initialInvestment, setInitialInvestment] = useState("1000000");
  const [dailyReturnRate, setDailyReturnRate] = useState("5");
  const [investmentPeriod, setInvestmentPeriod] = useState("100");
  const [withdrawalRate, setWithdrawalRate] = useState("50");
  const [leverage, setLeverage] = useState("1");
  const [results, setResults] = useState([]);

  const formatNumber = (num) => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  const parseNumber = (str) => parseFloat(str.replace(/,/g, "")) || 0;

const handleCalculate = () => {
  let prevBalance = parseNumber(initialInvestment); // 첫날 balance = 초기 투자금
  let leveragedBalance = prevBalance * parseNumber(leverage);
  let totalWithdrawals = 0;
  let totalBalance = prevBalance;
  let accumulatedNetProfit = 0;
  let tempResults = [];

for (let day = 1; day <= parseNumber(investmentPeriod); day++) {
    let balance = prevBalance; // 당일 balance는 전일 재투자금
    leveragedBalance = balance * parseNumber(leverage);

    
    let dailyProfit = (leveragedBalance * parseNumber(dailyReturnRate)) / 100;

    let withdrawAmount = (dailyProfit * parseNumber(withdrawalRate)) / 100;
    totalWithdrawals += withdrawAmount;
    totalBalance += dailyProfit;
    accumulatedNetProfit = totalBalance - parseNumber(initialInvestment);

    let nextInvestment = balance + dailyProfit - withdrawAmount; // 다음날 재투자금

tempResults.push({
    day,
    balance: formatNumber(parseFloat(balance.toFixed(1))),
    leveragedBalance: formatNumber(parseFloat(leveragedBalance.toFixed(1))),
    dailyProfit: formatNumber(parseFloat(dailyProfit.toFixed(1))),
    withdrawAmount: formatNumber(parseFloat(withdrawAmount.toFixed(1))),
    nextInvestment: formatNumber(parseFloat(nextInvestment.toFixed(1))),
    totalWithdrawals: formatNumber(parseFloat(totalWithdrawals.toFixed(1))),
    totalBalance: formatNumber(parseFloat(totalBalance.toFixed(1))),
    accumulatedNetProfit: formatNumber(parseFloat(accumulatedNetProfit.toFixed(1))),
});

    prevBalance = nextInvestment;
}


  setResults(tempResults);
};


  return (
    <div className="container">
      <h2>Compound Interest Calculator</h2>
      <div className="input-group">
        <label>Initial Investment</label>
        <input
          type="text"
          value={initialInvestment}
          onChange={(e) => setInitialInvestment(formatNumber(parseNumber(e.target.value)))}
        />
      </div>
      <div className="input-group">
        <label>Daily Return Rate (%)</label>
        <input
          type="text"
          value={dailyReturnRate}
          onChange={(e) => setDailyReturnRate(e.target.value)}
        />
      </div>
      <div className="input-group">
        <label>Investment Period (Days)</label>
        <input
          type="text"
          value={investmentPeriod}
          onChange={(e) => setInvestmentPeriod(e.target.value)}
        />
      </div>
      <div className="input-group">
        <label>Withdrawal Rate (%)</label>
        <input
          type="text"
          value={withdrawalRate}
          onChange={(e) => setWithdrawalRate(e.target.value)}
        />
      </div>
      <div className="input-group">
        <label>Leverage</label>
        <input
          type="text"
          value={leverage}
          onChange={(e) => setLeverage(e.target.value)}
        />
      </div>
      <button onClick={handleCalculate}>Calculate</button>

      {results.length > 0 && (
        <div className="results">
          <h3>Results</h3>
          <table className="result-table">
            <thead>
              <tr>
                <th>Day</th>
                <th>Balance</th>
                <th>Leveraged Balance</th>
                <th>Daily Profit</th>
                <th>Withdraw Amount</th>
                <th>Next Investment</th>
                <th>Total Withdrawals</th>
                <th>Total Balance</th>
                <th>Accumulated Net Profit</th>
              </tr>
            </thead>
            <tbody>
              {results.map((result, index) => (
                <tr key={index}>
                  <td>{result.day}</td>
                  <td>{result.balance}</td>
                  <td>{result.leveragedBalance}</td>
                  <td>{result.dailyProfit}</td>
                  <td>{result.withdrawAmount}</td>
                  <td>{result.nextInvestment}</td>
                  <td>{result.totalWithdrawals}</td>
                  <td>{result.totalBalance}</td>
                  <td>{result.accumulatedNetProfit}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CompoundInterestCalculator;
