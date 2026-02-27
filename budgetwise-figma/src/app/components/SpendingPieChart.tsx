import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const spendingData = [
  { name: 'Food & Dining', value: 320, color: '#FF6B6B' },
  { name: 'Transportation', value: 85, color: '#4ECDC4' },
  { name: 'Books & Supplies', value: 150, color: '#45B7D1' },
  { name: 'Entertainment', value: 125, color: '#FFA07A' },
  { name: 'Housing', value: 0, color: '#98D8C8' },
  { name: 'Utilities', value: 67.50, color: '#F7DC6F' },
  { name: 'Personal Care', value: 60, color: '#BB8FCE' },
  { name: 'Other', value: 40, color: '#95A5A6' },
];

export function SpendingPieChart() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <PieChart>
        <Pie
          data={spendingData}
          cx="50%"
          cy="50%"
          outerRadius={100}
          fill="#8884d8"
          dataKey="value"
        >
          {spendingData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip formatter={(value) => `$${value}`} />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}