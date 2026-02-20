import { TrendingUp, TrendingDown, DollarSign, AlertCircle } from 'lucide-react';
import { SpendingPieChart } from './components/SpendingPieChart';
import { RemainingBudgetChart } from './components/RemainingBudgetChart';
import { AIRecommendations } from './components/AIRecommendations';
import { Header } from './components/Header';

export default function App() {
  // Mock data for student budget
  const totalBudget = 1200;
  const totalSpent = 847.50;
  const remaining = totalBudget - totalSpent;
  const percentSpent = (totalSpent / totalBudget) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header with menu */}
      <Header />
      
      <div className="p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Student Budget Dashboard</h1>
          <p className="text-gray-600">Track your spending and stay on budget - February 2026</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <DollarSign className="w-6 h-6 text-blue-600" />
              </div>
              <span className="text-sm text-gray-500">Total Budget</span>
            </div>
            <div className="text-3xl font-bold text-gray-900">${totalBudget.toFixed(2)}</div>
            <p className="text-sm text-gray-500 mt-2">This month's budget</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-red-100 rounded-lg">
                <TrendingDown className="w-6 h-6 text-red-600" />
              </div>
              <span className="text-sm text-gray-500">Total Spent</span>
            </div>
            <div className="text-3xl font-bold text-gray-900">${totalSpent.toFixed(2)}</div>
            <p className="text-sm text-gray-500 mt-2">{percentSpent.toFixed(1)}% of budget</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
              <span className="text-sm text-gray-500">Remaining</span>
            </div>
            <div className="text-3xl font-bold text-gray-900">${remaining.toFixed(2)}</div>
            <p className="text-sm text-gray-500 mt-2">{(100 - percentSpent).toFixed(1)}% left</p>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Monthly Spending Pie Chart */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Monthly Spending by Category</h2>
            <SpendingPieChart />
          </div>

          {/* Remaining Budget */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Remaining Budget by Category</h2>
            <RemainingBudgetChart />
          </div>
        </div>

        {/* AI Recommendations */}
        <div className="bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl shadow-lg p-6 border border-purple-200 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-white/20 rounded-lg">
              <AlertCircle className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-xl font-semibold text-white">AI-Powered Budget Recommendations</h2>
          </div>
          <AIRecommendations />
        </div>
      </div>
      </div>
    </div>
  );
}