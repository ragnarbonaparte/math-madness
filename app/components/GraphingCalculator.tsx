'use client';

import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface GraphingCalculatorProps {
  equation?: string;
}

export function GraphingCalculator({ equation = 'x^2' }: GraphingCalculatorProps) {
  const [inputEquation, setInputEquation] = useState(equation);
  const [data, setData] = useState<{ x: number; y: number }[]>([]);

  const parseEquation = (eq: string, x: number): number => {
    try {
      // Replace x with actual value, replace ^ with **
      let expr = eq.replace(/x/g, `(${x})`).replace(/\^/g, '**');
      // Evaluate using Function constructor for safety
      const fn = new Function('x', `return ${expr}`);
      const result = fn(x);
      return isFinite(result) ? result : NaN;
    } catch {
      return NaN;
    }
  };

  const generateGraph = () => {
    const newData = [];
    for (let x = -10; x <= 10; x += 0.5) {
      const y = parseEquation(inputEquation, x);
      if (!isNaN(y)) {
        newData.push({ x: parseFloat(x.toFixed(2)), y: parseFloat(y.toFixed(2)) });
      }
    }
    setData(newData);
  };

  return (
    <div className="w-full bg-white rounded-lg shadow-lg p-4">
      <h3 className="text-lg font-bold text-gray-900 mb-4">Graphing Calculator</h3>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={inputEquation}
          onChange={(e) => setInputEquation(e.target.value)}
          placeholder="Enter equation (e.g., x^2, 2*x+1, sin(x))"
          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
        />
        <button
          onClick={generateGraph}
          className="px-4 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition whitespace-nowrap"
        >
          Plot
        </button>
      </div>

      {data.length > 0 && (
        <div className="bg-gray-50 rounded-lg p-2">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="x" type="number" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip
                contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px', color: '#fff' }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="y"
                stroke="#9333ea"
                dot={false}
                isAnimationActive={true}
                name={inputEquation}
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}

      <div className="mt-3 text-xs text-gray-500">
        <p className="mb-2">
          <strong>Tips:</strong> Use <code className="bg-gray-100 px-1">x</code> for variable, <code className="bg-gray-100 px-1">^</code> for power
        </p>
        <p>Examples: x^2, 2*x+1, (x-1)^2, x^3-x</p>
      </div>
    </div>
  );
}
