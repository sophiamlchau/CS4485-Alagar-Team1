'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Calendar, DollarSign, Trash2, Plus, Save } from 'lucide-react';
import { z } from 'zod';
import { apiJson } from '../lib/api';
import { useAuth } from '../context/AuthContext';

const createExpenseSchema = z.object({
  amount: z.coerce.number().positive(),
  category: z.string().min(1),
  date: z.string().min(1),
  note: z.string().optional(),
});

type Expense = {
  id: string;
  amount: number;
  category: string;
  date: string;
  note?: string | null;
};

const categories = [
  'Rent',
  'Groceries',
  'Tuition',
  'Transportation',
  'Entertainment',
  'Utilities',
  'Health',
  'Dining',
  'Other',
];

export function Expenses() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  const [items, setItems] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState(categories[0]);
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [note, setNote] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) router.push('/login');
  }, [isAuthenticated, router]);

  const refresh = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await apiJson('/api/expenses');
      setItems((data?.expenses || []).map((e: any) => ({
        id: e.id,
        amount: e.amount,
        category: e.category,
        date: new Date(e.date).toISOString(),
        note: e.note,
      })));
    } catch (e: any) {
      setError(e?.message || 'Failed to load expenses');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  const total = useMemo(() => items.reduce((sum, e) => sum + (e.amount || 0), 0), [items]);

  const onAdd = async () => {
    setSaving(true);
    setError(null);
    try {
      const parsed = createExpenseSchema.parse({ amount, category, date, note: note || undefined });
      await apiJson('/api/expenses', {
        method: 'POST',
        body: JSON.stringify({
          amount: parsed.amount,
          category: parsed.category,
          date: parsed.date,
          note: parsed.note,
        }),
      });
      setShowForm(false);
      setAmount('');
      setNote('');
      await refresh();
    } catch (e: any) {
      setError(e?.message || 'Failed to add expense');
    } finally {
      setSaving(false);
    }
  };

  const onDelete = async (id: string) => {
    setError(null);
    try {
      await apiJson(`/api/expenses/${id}`, { method: 'DELETE' });
      setItems((prev) => prev.filter((x) => x.id !== id));
    } catch (e: any) {
      setError(e?.message || 'Failed to delete expense');
    }
  };

  return (
    <div className="p-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-start justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Expenses</h1>
            <p className="text-gray-600">Create, view, and delete expenses. Dates support backdating.</p>
          </div>

          <button
            onClick={() => setShowForm((v) => !v)}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            <Plus className="w-5 h-5" />
            <span>{showForm ? 'Close' : 'Add Expense'}</span>
          </button>
        </div>

        {error ? (
          <div className="mb-4 p-3 rounded-lg border border-red-200 bg-red-50 text-red-700">
            {error}
          </div>
        ) : null}

        {showForm ? (
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">New Expense</h2>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Amount</label>
                <input
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  inputMode="decimal"
                  placeholder="12.34"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                >
                  {categories.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Note (optional)</label>
                <input
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Coffee with friends"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                />
              </div>
            </div>

            <div className="mt-4">
              <button
                onClick={onAdd}
                disabled={saving}
                className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-black disabled:opacity-60"
              >
                <Save className="w-4 h-4" />
                <span>{saving ? 'Saving...' : 'Save Expense'}</span>
              </button>
            </div>
          </div>
        ) : null}

        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Your Expenses</h2>
            <div className="text-sm font-semibold text-gray-900 flex items-center gap-1">
              <DollarSign className="w-4 h-4" />
              {total.toFixed(2)}
            </div>
          </div>

          {loading ? (
            <div className="text-gray-600">Loading...</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Date</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Category</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Note</th>
                    <th className="text-right py-3 px-4 text-sm font-semibold text-gray-600">Amount</th>
                    <th className="text-center py-3 px-4 text-sm font-semibold text-gray-600">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((expense) => (
                    <tr key={expense.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Calendar className="w-4 h-4" />
                          {new Date(expense.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {expense.category}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-700">{expense.note || ''}</td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-1 text-sm font-semibold text-gray-900">
                          <DollarSign className="w-4 h-4" />
                          {expense.amount.toFixed(2)}
                        </div>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <button
                          onClick={() => onDelete(expense.id)}
                          className="inline-flex items-center justify-center p-2 hover:bg-red-50 rounded-lg transition-colors"
                          aria-label="Delete expense"
                        >
                          <Trash2 className="w-4 h-4 text-red-600" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {items.length === 0 ? <div className="text-sm text-gray-600 mt-4">No expenses yet.</div> : null}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
