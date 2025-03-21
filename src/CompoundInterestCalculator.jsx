import { useState } from "react";

export default function CompoundInterestCalculator() {
  const [principal, setPrincipal] = useState(1000);
  const [dailyRate, setDailyRate] = useState(1);
  const [days, setDays] = useState(30);
  const [withdrawRate, setWithdrawRate] = useState(0);
  const [leverage, setLeverage] = useState(1);
  const [leverageCost, setLeverageCost] = useState(0);
  const [results, setResults] = useState([]);

  const calculateCompoundInterest = () => {
    let data = [];
    let balance = principal;
    let totalWithdrawn = 0;

    for (let i = 1; i <= days; i++) {
      let leveragedInvestment = balance * leverage;
      let interest = (leveragedInvestment * dailyRate) / 100;
      let cost = (leveragedInvestment * leverageCost) / 100;
      let netInterest = interest - cost;
      let withdraw = (netInterest * withdrawRate) / 100;
      totalWithdrawn += withdraw;
      balance += netInterest - withdraw;
      
      data.push({
        day: i,
        principal: balance.toFixed(2),
        leveragedInvestment: leveragedInvestment.toFixed(2),
        dailyRate: dailyRate,
        interest: interest.toFixed(2),
        cost: cost.toFixed(2),
        netInterest: netInterest.toFixed(2),
        withdraw: withdraw.toFixed(2),
        totalBalance: balance.toFixed(2),
        totalWithdrawn: totalWithdrawn.toFixed(2),
      });
    }
    setResults(data);
  };

  return (
    <div className="p-6 max-w-xl mx-auto bg-white shadow-md rounded-lg">
      <h1 className="text-xl font-bold mb-4">Compound Interest Calculator</h1>
      <div className="space-y-2">
        <input
          type="number"
          value={principal}
          onChange={(e) => setPrincipal(Number(e.target.value))}
          placeholder="Initial Investment"
          className="w-full p-2 border rounded"
        />
        <input
          type="number"
          value={dailyRate}
          onChange={(e) => setDailyRate(Number(e.target.value))}
          placeholder="Daily Interest Rate (%)"
          className="w-full p-2 border rounded"
        />
        <input
          type="number"
          value={days}
          onChange={(e) => setDays(Number(e.target.value))}
          placeholder="Investment Duration (days)"
          className="w-full p-2 border rounded"
        />
        <input
          type="number"
          value={withdrawRate}
          onChange={(e) => setWithdrawRate(Number(e.target.value))}
          placeholder="Daily Withdrawal (%)"
          className="w-full p-2 border rounded"
        />
        <input
          type="number"
          value={leverage}
          onChange={(e) => setLeverage(Number(e.target.value))}
          placeholder="Leverage Multiplier (e.g. 2 for 2x)"
          className="w-full p-2 border rounded"
        />
        <input
          type="number"
          value={leverageCost}
          onChange={(e) => setLeverageCost(Number(e.target.value))}
          placeholder="Daily Leverage Cost (%)"
          className="w-full p-2 border rounded"
        />
        <button
          onClick={calculateCompoundInterest}
          className="w-full bg-blue-500 text-white p-2 rounded mt-4"
        >
          Calculate
        </button>
      </div>
      <div className="mt-6">
        <h2 className="text-lg font-semibold">Results</h2>
        <table className="w-full border mt-2 text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-1">Day</th>
              <th className="border p-1">Balance</th>
              <th className="border p-1">Leverage Investment</th>
              <th className="border p-1">Interest</th>
              <th className="border p-1">Leverage Cost</th>
              <th className="border p-1">Net Interest</th>
              <th className="border p-1">Withdrawn</th>
              <th className="border p-1">Total Withdrawn</th>
            </tr>
          </thead>
          <tbody>
            {results.map((row) => (
              <tr key={row.day}>
                <td className="border p-1 text-center">{row.day}</td>
                <td className="border p-1 text-center">${row.principal}</td>
                <td className="border p-1 text-center">${row.leveragedInvestment}</td>
                <td className="border p-1 text-center">${row.interest}</td>
                <td className="border p-1 text-center">${row.cost}</td>
                <td className="border p-1 text-center">${row.netInterest}</td>
                <td className="border p-1 text-center">${row.withdraw}</td>
                <td className="border p-1 text-center">${row.totalWithdrawn}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
