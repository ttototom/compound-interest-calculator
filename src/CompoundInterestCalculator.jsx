import React, { useState } from "react";

const CompoundInterestCalculator = () => {
  const [initialInvestment, setInitialInvestment] = useState("");
  const [dailyReturnRate, setDailyReturnRate] = useState("");
  const [investmentPeriod, setInvestmentPeriod] = useState("");
  const [withdrawalRate, setWithdrawalRate] = useState("");
  const [leverage, setLeverage] = useState("");

  const calculateResults = () => {
    // 계산 로직 추가
  };

  return (
    <div className="container">
      <h2>Compound Interest Calculator</h2>
      
      {/* 입력 필드 */}
      <div className="input-group">
        <label>Initial Investment ($)</label>
        <input 
          type="number"
          value={initialInvestment}
          onChange={(e) => setInitialInvestment(e.target.value)}
        />
      </div>

      <div className="input-group">
        <label>Daily Return Rate (%)</label>
        <input 
          type="number"
          value={dailyReturnRate}
          onChange={(e) => setDailyReturnRate(e.target.value)}
        />
      </div>

      <div className="input-group">
        <label>Investment Period (Days)</label>
        <input 
          type="number"
          value={investmentPeriod}
          onChange={(e) => setInvestmentPeriod(e.target.value)}
        />
      </div>

      <div className="input-group">
        <label>Withdrawal Rate (%)</label>
        <input 
          type="number"
          value={withdrawalRate}
          onChange={(e) => setWithdrawalRate(e.target.value)}
        />
      </div>

      <div className="input-group">
        <label>Leverage Ratio</label>
        <input 
          type="number"
          value={leverage}
          onChange={(e) => setLeverage(e.target.value)}
        />
      </div>

      <button onClick={calculateResults}>Calculate</button>

      {/* 결과 출력 */}
      <div className="results">
        <div className="result-container">
          <div className="result-item">
            <strong>Previous Balance:</strong> $1000
          </div>
          <div className="result-item">
            <strong>Total Balance (Including Profit):</strong> $1200
          </div>
        </div>
        <div className="result-item">
          <strong>Leverage Applied Balance:</strong> $2000
        </div>
      </div>
    </div>
  );
};

export default CompoundInterestCalculator;
