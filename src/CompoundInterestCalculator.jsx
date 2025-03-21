
import React, { useState } from "react";

const CompoundInterestCalculator = () => {
  const [initialInvestment, setInitialInvestment] = useState("");
  const [dailyReturnRate, setDailyReturnRate] = useState("");
  const [investmentPeriod, setInvestmentPeriod] = useState("");
  const [withdrawalRate, setWithdrawalRate] = useState("");
  const [leverage, setLeverage] = useState("1"); // 기본값 1로 설정
  const [results, setResults] = useState([]);

  const formatNumber = (num) => {
    if (!num) return "";
    return new Intl.NumberFormat().format(num);
  };

  const handleInputChange = (setter) => (e) => {
    const rawValue = e.target.value.replace(/,/g, ""); // 쉼표 제거
    setter(rawValue);
  };

  const calculateCompoundInterest = () => {
    let balance = parseFloat(initialInvestment) || 0;
    let dailyRate = parseFloat(dailyReturnRate) / 100 || 0;
    let period = parseInt(investmentPeriod) || 0;
    let withdrawRate = parseFloat(withdrawalRate) / 100 || 0;
    let lev = parseFloat(leverage) || 1;
    let accumulatedWithdrawals = 0;

    let newResults = [];
    for (let day = 1; day <= period; day++) {
      let leveragedBalance = balance * lev;
      let dailyProfit = leveragedBalance * dailyRate;
      let withdrawAmount = dailyProfit * withdrawRate;
      accumulatedWithdrawals += withdrawAmount;
      balance += dailyProfit - withdrawAmount;

      newResults.push({
        day,
        balance: balance.toFixed(2),
        leveragedBalance: leveragedBalance.toFixed(2),
        dailyProfit: dailyProfit.toFixed(2),
        withdrawAmount: withdrawAmount.toFixed(2),
        totalWithdrawals: accumulatedWithdrawals.toFixed(2),
      });
    }
    setResults(newResults);
  };

  return (
    <div className="container">
      <h2>Compound Interest Calculator</h2>
      <div className="input-group">
        <label>Initial Investment</label>
        <input
          type="text"
          value={formatNumber(initialInvestment)}
          onChange={handleInputChange(setInitialInvestment)}
        />
      </div>
      <div className="input-group">
        <label>Daily Return Rate (%)</label>
        <input
          type="text"
          value={formatNumber(dailyReturnRate)}
          onChange={handleInputChange(setDailyReturnRate)}
        />
      </div>
      <div className="input-group">
        <label>Investment Period (Days)</label>
        <input
          type="text"
          value={formatNumber(investmentPeriod)}
          onChange={handleInputChange(setInvestmentPeriod)}
        />
      </div>
      <div className="input-group">
        <label>Withdrawal Rate (%)</label>
        <input
          type="text"
          value={formatNumber(withdrawalRate)}
          onChange={handleInputChange(setWithdrawalRate)}
        />
      </div>
      <div className="input-group">
        <label>Leverage</label>
        <input
          type="text"
          value={formatNumber(leverage)}
          onChange={handleInputChange(setLeverage)}
        />
      </div>
      <button onClick={calculateCompoundInterest}>Calculate</button>

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
                <th>Total Withdrawals</th>
              </tr>
            </thead>
            <tbody>
              {results.map((row) => (
                <tr key={row.day}>
                  <td>{row.day}</td>
                  <td>{formatNumber(row.balance)}</td>
                  <td>{formatNumber(row.leveragedBalance)}</td>
                  <td>{formatNumber(row.dailyProfit)}</td>
                  <td>{formatNumber(row.withdrawAmount)}</td>
                  <td>{formatNumber(row.totalWithdrawals)}</td>
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
