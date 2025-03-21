import React, { useState } from "react";

const CompoundInterestCalculator = () => {
  const [initialInvestment, setInitialInvestment] = useState("1000000");
  const [dailyReturnRate, setDailyReturnRate] = useState("5");
  const [investmentPeriod, setInvestmentPeriod] = useState("100");
  const [withdrawalRate, setWithdrawalRate] = useState("50");
  const [leverage, setLeverage] = useState("1");
  const [results, setResults] = useState([]);

  // 숫자에 쉼표 자동 추가하는 함수
  const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  // 입력값에서 쉼표 제거하고 숫자로 변환
  const parseNumber = (str) => {
    return parseFloat(str.replace(/,/g, "")) || 0;
  };

  const handleCalculate = () => {
    let balance = parseNumber(initialInvestment);
    let leveragedBalance = balance * parseNumber(leverage);
    let totalWithdrawals = 0;
    let totalEarnings = balance;
    let accumulatedNetProfit = 0;
    let tempResults = [];

    for (let day = 1; day <= parseNumber(investmentPeriod); day++) {
      let dailyProfit = (leveragedBalance * parseNumber(dailyReturnRate)) / 100;
      let withdrawAmount = (dailyProfit * parseNumber(withdrawalRate)) / 100;
      totalWithdrawals += withdrawAmount;
      totalEarnings += dailyProfit;
      accumulatedNetProfit = totalEarnings - parseNumber(initialInvestment);

      balance += dailyProfit - withdrawAmount;
      leveragedBalance = balance * parseNumber(leverage);
      let nextInvestment = balance;

      tempResults.push({
        day,
        balance: formatNumber(Math.round(balance)),
        leveragedBalance: formatNumber(Math.round(leveragedBalance)),
        dailyProfit: formatNumber(Math.round(dailyProfit)),
        withdrawAmount: formatNumber(Math.round(withdrawAmount)),
        nextInvestment: formatNumber(Math.round(nextInvestment)),
        totalWithdrawals: formatNumber(Math.round(totalWithdrawals)),
        totalEarnings: formatNumber(Math.round(totalEarnings)),
        accumulatedNetProfit: formatNumber(Math.round(accumulatedNetProfit)),
      });
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
                <th>Total Earnings</th>
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
                  <td>{result.totalEarnings}</td>
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
