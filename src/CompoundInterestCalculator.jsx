import React, { useState } from "react";

const CompoundInterestCalculator = () => {
  const [initialInvestment, setInitialInvestment] = useState("");
  const [dailyReturnRate, setDailyReturnRate] = useState("");
  const [investmentPeriod, setInvestmentPeriod] = useState("");
  const [withdrawalRate, setWithdrawalRate] = useState("");
  const [leverage, setLeverage] = useState("");

  const calculateResults = () => {
    let results = [];
    let balance = parseFloat(initialInvestment);
    let totalWithdrawn = 0;

    for (let day = 1; day <= parseInt(investmentPeriod); day++) {
      let prevBalance = balance;
      let leveragedBalance = prevBalance * parseFloat(leverage);
      let dailyProfit = leveragedBalance * (parseFloat(dailyReturnRate) / 100);
      let withdrawalAmount = dailyProfit * (parseFloat(withdrawalRate) / 100);
      totalWithdrawn += withdrawalAmount;
      balance = prevBalance + dailyProfit - withdrawalAmount;

      results.push({
        day,
        prevBalance: prevBalance.toFixed(2),
        leveragedBalance: leveragedBalance.toFixed(2),
        dailyProfit: dailyProfit.toFixed(2),
        withdrawalAmount: withdrawalAmount.toFixed(2),
        totalWithdrawn: totalWithdrawn.toFixed(2),
        reinvestmentBalance: balance.toFixed(2),
        totalBalance: (balance + totalWithdrawn).toFixed(2),
      });
    }
    return results;
  };

  const results = calculateResults();

  return (
    <div className="container">
      <h2>Compound Interest Calculator</h2>

      <div className="input-group">
        <label>Initial Investment ($)</label>
        <input type="number" value={initialInvestment} onChange={(e) => setInitialInvestment(e.target.value)} />
      </div>

      <div className="input-group">
        <label>Daily Return Rate (%)</label>
        <input type="number" value={dailyReturnRate} onChange={(e) => setDailyReturnRate(e.target.value)} />
      </div>

      <div className="input-group">
        <label>Investment Period (Days)</label>
        <input type="number" value={investmentPeriod} onChange={(e) => setInvestmentPeriod(e.target.value)} />
      </div>

      <div className="input-group">
        <label>Withdrawal Rate (%)</label>
        <input type="number" value={withdrawalRate} onChange={(e) => setWithdrawalRate(e.target.value)} />
      </div>

      <div className="input-group">
        <label>Leverage Multiplier</label>
        <input type="number" value={leverage} onChange={(e) => setLeverage(e.target.value)} />
      </div>

      <button onClick={calculateResults}>Calculate</button>

      {results.length > 0 && (
        <div className="results">
          <h3>Results</h3>
          <table>
            <thead>
              <tr>
                <th>Day</th>
                <th>Balance (Investment)</th>
                <th>Leverage Balance</th>
                <th>Daily Profit</th>
                <th>Withdrawal</th>
                <th>Total Withdrawn</th>
                <th>Reinvestment Balance</th>
                <th>Total Balance</th>
              </tr>
            </thead>
            <tbody>
              {results.map((row, index) => (
                <tr key={index}>
                  <td>{row.day}</td>
                  <td>${row.prevBalance}</td>
                  <td>${row.leveragedBalance}</td>
                  <td>${row.dailyProfit}</td>
                  <td>${row.withdrawalAmount}</td>
                  <td>${row.totalWithdrawn}</td>
                  <td>${row.reinvestmentBalance}</td>
                  <td>${row.totalBalance}</td>
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
