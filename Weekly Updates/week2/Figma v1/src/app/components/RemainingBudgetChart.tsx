import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, Legend } from 'recharts';

const remainingData = [
  { category: 'Food & Dining', allocated: 400, spent: 320, remaining: 80 },
  { category: 'Transportation', allocated: 100, spent: 85, remaining: 15 },
  { category: 'Books & Supplies', allocated: 200, spent: 150, remaining: 50 },
  { category: 'Entertainment', allocated: 150, spent: 125, remaining: 25 },
  { category: 'Housing', allocated: 0, spent: 0, remaining: 0 },
  { category: 'Utilities', allocated: 100, spent: 67.50, remaining: 32.50 },
  { category: 'Personal Care', allocated: 100, spent: 60, remaining: 40 },
  { category: 'Other', allocated: 150, spent: 40, remaining: 110 },
];

const getBarColor = (remaining: number, allocated: number) => {
  const percentRemaining = (remaining / allocated) * 100;
  if (percentRemaining > 40) return '#82ca9d'; // Green
  if (percentRemaining > 15) return '#ffd54f'; // Yellow
  return '#ff6b6b'; // Red
};

export function RemainingBudgetChart() {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={remainingData} layout="vertical">
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis type="number" />
        <YAxis dataKey="category" type="category" width={150} />
        <Tooltip 
          formatter={(value, name) => {
            if (name === 'Remaining') return [`$${value}`, name];
            return value;
          }}
        />
        <Legend />
        <Bar dataKey="spent" stackId="a" fill="#8884d8" name="Spent" />
        <Bar dataKey="remaining" stackId="a" name="Remaining" fill="#000000" />
      </BarChart>
    </ResponsiveContainer>
  );
}