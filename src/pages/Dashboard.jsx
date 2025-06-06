import React, { useState } from 'react';
import { LineChart, Line, Tooltip, ResponsiveContainer } from 'recharts';

const chartData = [
  { time: 'Mon', value: 30 },
  { time: 'Tue', value: 80 },
  { time: 'Wed', value: 45 },
  { time: 'Thu', value: 60 },
  { time: 'Fri', value: 70 },
];

export default function Dashboard() {
  const [count, setCount] = useState(0);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow hover:scale-105 transition transform">
        <h3 className="text-lg font-semibold text-gray-700 dark:text-white">Live Counter</h3>
        <p className="text-4xl font-bold text-blue-500 mt-2">{count}</p>
        <button
          onClick={() => setCount(count + 1)}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Increment
        </button>
      </div>

      <div className="col-span-1 md:col-span-2 bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
        <h3 className="text-lg font-semibold text-gray-700 dark:text-white mb-4">Weekly Stats</h3>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={chartData}>
            <Tooltip />
            <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
