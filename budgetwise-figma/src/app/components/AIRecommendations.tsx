import { TrendingDown, TrendingUp, Sparkles, CheckCircle, AlertTriangle } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const recommendationData = [
  { category: 'Food & Dining', current: 320, recommended: 280, status: 'reduce' },
  { category: 'Transportation', current: 85, recommended: 85, status: 'good' },
  { category: 'Entertainment', current: 125, recommended: 100, status: 'reduce' },
  { category: 'Personal Care', current: 60, recommended: 60, status: 'good' },
  { category: 'Other', current: 40, recommended: 80, status: 'increase' },
];

const insights = [
  {
    icon: TrendingDown,
    type: 'warning',
    title: 'High Spending Alert',
    message: 'Your food spending is 20% above the recommended amount for students. Consider meal prepping to save $40/month.',
    color: 'text-red-400',
    bgColor: 'bg-red-500/10',
  },
  {
    icon: CheckCircle,
    type: 'success',
    title: 'On Track',
    message: 'Your transportation costs are well-optimized! You\'re using public transit efficiently.',
    color: 'text-green-400',
    bgColor: 'bg-green-500/10',
  },
  {
    icon: Sparkles,
    type: 'tip',
    title: 'Smart Saving Tip',
    message: 'Based on your spending patterns, you could save $50 by switching to a student meal plan.',
    color: 'text-yellow-400',
    bgColor: 'bg-yellow-500/10',
  },
  {
    icon: TrendingUp,
    type: 'opportunity',
    title: 'Budget Reallocation',
    message: 'Consider allocating more to "Other" for unexpected expenses. You have room in your overall budget.',
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/10',
  },
];

export function AIRecommendations() {
  return (
    <div className="space-y-6">
      {/* AI Insights Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {insights.map((insight, index) => {
          const Icon = insight.icon;
          return (
            <div key={index} className={`${insight.bgColor} backdrop-blur-sm rounded-lg p-4 border border-white/20`}>
              <div className="flex items-start gap-3">
                <div className={`${insight.color} mt-1`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-white mb-1">{insight.title}</h3>
                  <p className="text-sm text-white/90">{insight.message}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recommended vs Current Spending Chart */}
      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
        <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
          <Sparkles className="w-5 h-5" />
          AI-Optimized Budget Comparison
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={recommendationData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis dataKey="category" tick={{ fill: 'white' }} angle={-15} textAnchor="end" height={80} />
            <YAxis tick={{ fill: 'white' }} />
            <Tooltip 
              contentStyle={{ backgroundColor: '#e5e7eb', border: 'none', borderRadius: '8px' }}
              formatter={(value) => `$${value}`}
            />
            <Bar dataKey="current" fill="#3b82f6" name="Current Spending" />
            <Bar dataKey="recommended" fill="#10b981" name="AI Recommended" />
          </BarChart>
        </ResponsiveContainer>
        
        <div className="mt-4 flex items-center gap-4 text-sm text-white/80">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#3b82f6]"></div>
            <span>Current Spending</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#10b981]"></div>
            <span>AI Recommended</span>
          </div>
        </div>
      </div>

      {/* Action Items */}
      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
        <h3 className="font-semibold text-white mb-4">Recommended Actions</h3>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 text-yellow-400" />
            <p className="text-white/90">Reduce food spending by 12.5% to stay within optimal range</p>
          </div>
          <div className="flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-green-400" />
            <p className="text-white/90">Continue current transportation habits</p>
          </div>
          <div className="flex items-center gap-3">
            <TrendingDown className="w-5 h-5 text-red-400" />
            <p className="text-white/90">Cut entertainment costs by $25 this month</p>
          </div>
        </div>
      </div>
    </div>
  );
}