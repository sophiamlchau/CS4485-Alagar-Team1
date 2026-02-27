import { Calendar, DollarSign, Repeat, CreditCard, Trash2, Plus } from 'lucide-react';

const expenses = [
  { id: 1, name: 'Grocery Shopping', amount: 85.50, category: 'Food & Dining', date: '2026-02-24', recurring: false },
  { id: 2, name: 'Coffee Shop', amount: 12.75, category: 'Food & Dining', date: '2026-02-23', recurring: false },
  { id: 3, name: 'Uber Ride', amount: 18.00, category: 'Transportation', date: '2026-02-22', recurring: false },
  { id: 4, name: 'Movie Tickets', amount: 28.00, category: 'Entertainment', date: '2026-02-21', recurring: false },
  { id: 5, name: 'Textbook Purchase', amount: 95.00, category: 'Books & Supplies', date: '2026-02-20', recurring: false },
  { id: 6, name: 'Haircut', amount: 35.00, category: 'Personal Care', date: '2026-02-19', recurring: false },
  { id: 7, name: 'Lunch at Campus', amount: 15.50, category: 'Food & Dining', date: '2026-02-18', recurring: false },
];

const recurringExpenses = [
  { id: 1, name: 'Spotify Premium', amount: 9.99, category: 'Entertainment', frequency: 'Monthly', nextDue: '2026-03-01' },
  { id: 2, name: 'Netflix Subscription', amount: 15.99, category: 'Entertainment', frequency: 'Monthly', nextDue: '2026-03-05' },
  { id: 3, name: 'Gym Membership', amount: 25.00, category: 'Health & Fitness', frequency: 'Monthly', nextDue: '2026-03-10' },
  { id: 4, name: 'Phone Bill', amount: 45.00, category: 'Utilities', frequency: 'Monthly', nextDue: '2026-03-15' },
];

export function Expenses() {
  const handleAddExpense = () => {
    alert('Opening add expense dialog...');
  };

  const handleDeleteExpense = (id: number) => {
    alert(`Deleting expense ${id}...`);
  };

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Expenses</h1>
          <p className="text-gray-600">Manage your one-time and recurring expenses</p>
        </div>

        {/* Add Expense Button */}
        <div className="mb-6">
          <button
            onClick={handleAddExpense}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            <Plus className="w-5 h-5" />
            <span>Add Expense</span>
          </button>
        </div>

        {/* Recent Expenses */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Expenses</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Date</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Description</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Category</th>
                  <th className="text-right py-3 px-4 text-sm font-semibold text-gray-600">Amount</th>
                  <th className="text-center py-3 px-4 text-sm font-semibold text-gray-600">Action</th>
                </tr>
              </thead>
              <tbody>
                {expenses.map((expense) => (
                  <tr key={expense.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Calendar className="w-4 h-4" />
                        {new Date(expense.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="text-sm font-medium text-gray-900">{expense.name}</div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {expense.category}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1 text-sm font-semibold text-gray-900">
                        <DollarSign className="w-4 h-4" />
                        {expense.amount.toFixed(2)}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <button
                        onClick={() => handleDeleteExpense(expense.id)}
                        className="inline-flex items-center justify-center p-2 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recurring Expenses */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center gap-2 mb-4">
            <Repeat className="w-5 h-5 text-indigo-600" />
            <h2 className="text-xl font-semibold text-gray-900">Recurring Expenses</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {recurringExpenses.map((expense) => (
              <div key={expense.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">{expense.name}</h3>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                      {expense.category}
                    </span>
                  </div>
                  <button
                    onClick={() => handleDeleteExpense(expense.id)}
                    className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4 text-red-600" />
                  </button>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-1 text-gray-600">
                    <Repeat className="w-4 h-4" />
                    {expense.frequency}
                  </div>
                  <div className="flex items-center gap-1 font-semibold text-gray-900">
                    <DollarSign className="w-4 h-4" />
                    {expense.amount.toFixed(2)}
                  </div>
                </div>
                <div className="mt-2 text-xs text-gray-500">
                  Next due: {new Date(expense.nextDue).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
