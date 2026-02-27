import { useState } from 'react';
import { Sparkles, DollarSign, TrendingUp, Lightbulb, ChevronRight, Check } from 'lucide-react';

const categoryOptions = [
  { name: 'Food & Dining', icon: '🍔', suggestedPercent: 25, color: 'bg-orange-100 text-orange-600' },
  { name: 'Transportation', icon: '🚗', suggestedPercent: 15, color: 'bg-blue-100 text-blue-600' },
  { name: 'Books & Supplies', icon: '📚', suggestedPercent: 10, color: 'bg-green-100 text-green-600' },
  { name: 'Entertainment', icon: '🎮', suggestedPercent: 10, color: 'bg-purple-100 text-purple-600' },
  { name: 'Personal Care', icon: '💇', suggestedPercent: 8, color: 'bg-pink-100 text-pink-600' },
  { name: 'Health & Fitness', icon: '💪', suggestedPercent: 7, color: 'bg-red-100 text-red-600' },
  { name: 'Utilities', icon: '💡', suggestedPercent: 10, color: 'bg-yellow-100 text-yellow-600' },
  { name: 'Savings', icon: '💰', suggestedPercent: 15, color: 'bg-emerald-100 text-emerald-600' },
];

const aiInsights = [
  {
    title: 'Student-Optimized Budget',
    description: 'Based on average student spending patterns, we recommend allocating 25% to food and dining.',
    impact: 'high',
  },
  {
    title: 'Emergency Fund Priority',
    description: 'Try to save at least 15% of your income for unexpected expenses and future goals.',
    impact: 'high',
  },
  {
    title: 'Entertainment Balance',
    description: 'Keep entertainment at 10% to maintain a healthy balance between fun and financial goals.',
    impact: 'medium',
  },
  {
    title: 'Transportation Savings',
    description: 'Consider using public transit or bike-sharing to reduce transportation costs below 15%.',
    impact: 'medium',
  },
];

export function BudgetCreator() {
  const [totalIncome, setTotalIncome] = useState('1200');
  const [budgetCategories, setBudgetCategories] = useState(
    categoryOptions.map(cat => ({
      ...cat,
      amount: 0,
      percent: cat.suggestedPercent,
    }))
  );
  const [step, setStep] = useState(1);

  const handleIncomeChange = (value: string) => {
    setTotalIncome(value);
    const income = parseFloat(value) || 0;
    setBudgetCategories(
      categoryOptions.map(cat => ({
        ...cat,
        amount: Math.round((income * cat.suggestedPercent) / 100),
        percent: cat.suggestedPercent,
      }))
    );
  };

  const handleCategoryPercentChange = (index: number, percent: string) => {
    const percentValue = parseFloat(percent) || 0;
    const income = parseFloat(totalIncome) || 0;
    const newCategories = [...budgetCategories];
    newCategories[index].percent = percentValue;
    newCategories[index].amount = Math.round((income * percentValue) / 100);
    setBudgetCategories(newCategories);
  };

  const handleCategoryAmountChange = (index: number, amount: string) => {
    const amountValue = parseFloat(amount) || 0;
    const income = parseFloat(totalIncome) || 0;
    const newCategories = [...budgetCategories];
    newCategories[index].amount = amountValue;
    newCategories[index].percent = income > 0 ? (amountValue / income) * 100 : 0;
    setBudgetCategories(newCategories);
  };

  const applyAISuggestions = () => {
    const income = parseFloat(totalIncome) || 0;
    setBudgetCategories(
      categoryOptions.map(cat => ({
        ...cat,
        amount: Math.round((income * cat.suggestedPercent) / 100),
        percent: cat.suggestedPercent,
      }))
    );
  };

  const totalAllocated = budgetCategories.reduce((sum, cat) => sum + cat.amount, 0);
  const totalPercent = budgetCategories.reduce((sum, cat) => sum + cat.percent, 0);
  const income = parseFloat(totalIncome) || 0;
  const remaining = income - totalAllocated;

  const handleSaveBudget = () => {
    alert('Budget saved successfully! This would normally save to your database.');
  };

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900">AI Budget Creator</h1>
          </div>
          <p className="text-gray-600">Let AI help you create an optimized budget based on your income and goals</p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8 bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-500'}`}>
                {step > 1 ? <Check className="w-5 h-5" /> : '1'}
              </div>
              <div>
                <div className="font-semibold text-gray-900">Income</div>
                <div className="text-sm text-gray-500">Enter your monthly income</div>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-500'}`}>
                {step > 2 ? <Check className="w-5 h-5" /> : '2'}
              </div>
              <div>
                <div className="font-semibold text-gray-900">Categories</div>
                <div className="text-sm text-gray-500">Allocate your budget</div>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 3 ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-500'}`}>
                {step > 3 ? <Check className="w-5 h-5" /> : '3'}
              </div>
              <div>
                <div className="font-semibold text-gray-900">Review</div>
                <div className="text-sm text-gray-500">Finalize your budget</div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Income Input */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Monthly Income</h2>
              <div className="relative">
                <DollarSign className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400" />
                <input
                  type="number"
                  value={totalIncome}
                  onChange={(e) => handleIncomeChange(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 text-2xl font-bold border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:outline-none"
                  placeholder="0.00"
                />
              </div>
              {income > 0 && (
                <button
                  onClick={applyAISuggestions}
                  className="mt-4 w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-lg hover:from-purple-600 hover:to-indigo-700 transition-colors"
                >
                  <Sparkles className="w-5 h-5" />
                  <span>Apply AI Suggestions</span>
                </button>
              )}
            </div>

            {/* Budget Categories */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Budget Allocation</h2>
              <div className="space-y-4">
                {budgetCategories.map((category, index) => (
                  <div key={category.name} className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-lg ${category.color} flex items-center justify-center text-xl`}>
                          {category.icon}
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">{category.name}</div>
                          <div className="text-sm text-gray-500">
                            AI suggests: {category.suggestedPercent}% (${Math.round((income * category.suggestedPercent) / 100)})
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <input
                            type="number"
                            value={category.amount}
                            onChange={(e) => handleCategoryAmountChange(index, e.target.value)}
                            className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Percentage</label>
                        <div className="relative">
                          <input
                            type="number"
                            value={category.percent.toFixed(1)}
                            onChange={(e) => handleCategoryPercentChange(index, e.target.value)}
                            className="w-full pr-8 pl-3 py-2 border border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none"
                          />
                          <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Save Button */}
            <button
              onClick={handleSaveBudget}
              disabled={Math.abs(remaining) > 0.01}
              className="w-full px-6 py-4 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              {Math.abs(remaining) > 0.01 ? 'Balance Your Budget First' : 'Save Budget'}
            </button>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Budget Summary */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <h3 className="font-semibold text-gray-900 mb-4">Budget Summary</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between pb-3 border-b border-gray-200">
                  <span className="text-gray-600">Total Income</span>
                  <span className="font-semibold text-gray-900">${income.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between pb-3 border-b border-gray-200">
                  <span className="text-gray-600">Allocated</span>
                  <span className="font-semibold text-gray-900">${totalAllocated.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between pb-3 border-b border-gray-200">
                  <span className="text-gray-600">Total Percent</span>
                  <span className={`font-semibold ${totalPercent > 100 ? 'text-red-600' : 'text-gray-900'}`}>
                    {totalPercent.toFixed(1)}%
                  </span>
                </div>
                <div className="flex items-center justify-between pt-2">
                  <span className="text-gray-600">Remaining</span>
                  <span className={`font-bold text-lg ${remaining < 0 ? 'text-red-600' : remaining > 0 ? 'text-orange-600' : 'text-green-600'}`}>
                    ${remaining.toFixed(2)}
                  </span>
                </div>
              </div>
              {Math.abs(remaining) > 0.01 && (
                <div className={`mt-4 p-3 rounded-lg ${remaining < 0 ? 'bg-red-50 text-red-700' : 'bg-orange-50 text-orange-700'}`}>
                  <p className="text-sm font-medium">
                    {remaining < 0 
                      ? '⚠️ Over budget! Reduce allocations.' 
                      : '💡 You have unallocated funds.'}
                  </p>
                </div>
              )}
              {Math.abs(remaining) < 0.01 && (
                <div className="mt-4 p-3 rounded-lg bg-green-50 text-green-700">
                  <p className="text-sm font-medium">✅ Budget is balanced!</p>
                </div>
              )}
            </div>

            {/* AI Insights */}
            <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl shadow-lg p-6 border border-purple-200">
              <div className="flex items-center gap-2 mb-4">
                <Lightbulb className="w-5 h-5 text-purple-600" />
                <h3 className="font-semibold text-gray-900">AI Insights</h3>
              </div>
              <div className="space-y-3">
                {aiInsights.map((insight, index) => (
                  <div key={index} className="p-3 bg-white rounded-lg border border-purple-100">
                    <div className="flex items-start gap-2">
                      <div className={`px-2 py-1 rounded text-xs font-medium ${
                        insight.impact === 'high' 
                          ? 'bg-red-100 text-red-700' 
                          : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {insight.impact.toUpperCase()}
                      </div>
                    </div>
                    <h4 className="font-semibold text-gray-900 mt-2 text-sm">{insight.title}</h4>
                    <p className="text-sm text-gray-600 mt-1">{insight.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <h3 className="font-semibold text-gray-900 mb-4">Quick Stats</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-green-600" />
                    <span className="text-sm text-gray-600">Savings Rate</span>
                  </div>
                  <span className="font-semibold text-gray-900">
                    {income > 0 ? ((budgetCategories.find(c => c.name === 'Savings')?.amount || 0) / income * 100).toFixed(1) : 0}%
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-blue-600" />
                    <span className="text-sm text-gray-600">Daily Budget</span>
                  </div>
                  <span className="font-semibold text-gray-900">
                    ${(income / 30).toFixed(2)}/day
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
