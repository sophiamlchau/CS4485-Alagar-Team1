"use client";

import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isSameDay,
  isSameMonth,
  startOfMonth,
  startOfWeek,
  subMonths,
} from "date-fns";

import { Card } from "../components/ui/card";
import { Input } from "../components/ui/input";

interface Transaction {
  id: string;
  date: Date;
  type: "income" | "expense";
  amount: number;
  category: string;
  description: string;
}

// NOTE: This is a UI only calendar using mock data.
// In the future, replace `mockTransactions` with API calls to your backend expenses endpoints.
const mockTransactions: Transaction[] = [
  {
    id: "1",
    date: new Date(2026, 1, 1),
    type: "income",
    amount: 3200,
    category: "Salary",
    description: "Monthly Salary",
  },
  {
    id: "2",
    date: new Date(2026, 1, 1),
    type: "expense",
    amount: 45,
    category: "Food & Dining",
    description: "Groceries",
  },
  {
    id: "3",
    date: new Date(2026, 1, 5),
    type: "expense",
    amount: 120,
    category: "Utilities",
    description: "Electricity Bill",
  },
  {
    id: "4",
    date: new Date(2026, 1, 5),
    type: "expense",
    amount: 60,
    category: "Utilities",
    description: "Internet Bill",
  },
  {
    id: "5",
    date: new Date(2026, 1, 8),
    type: "expense",
    amount: 85,
    category: "Food & Dining",
    description: "Restaurant",
  },
  {
    id: "6",
    date: new Date(2026, 1, 10),
    type: "income",
    amount: 500,
    category: "Freelance",
    description: "Web Design Project",
  },
  {
    id: "7",
    date: new Date(2026, 1, 12),
    type: "expense",
    amount: 200,
    category: "Personal Care",
    description: "Haircut & Spa",
  },
  {
    id: "8",
    date: new Date(2026, 1, 14),
    type: "expense",
    amount: 50,
    category: "Transportation",
    description: "Gas",
  },
  {
    id: "9",
    date: new Date(2026, 1, 15),
    type: "income",
    amount: 3200,
    category: "Salary",
    description: "Monthly Salary",
  },
  {
    id: "10",
    date: new Date(2026, 1, 18),
    type: "expense",
    amount: 150,
    category: "Entertainment",
    description: "Concert Tickets",
  },
  {
    id: "11",
    date: new Date(2026, 1, 20),
    type: "expense",
    amount: 75,
    category: "Food & Dining",
    description: "Groceries",
  },
  {
    id: "12",
    date: new Date(2026, 1, 22),
    type: "expense",
    amount: 100,
    category: "Personal Care",
    description: "Gym Membership",
  },
  {
    id: "13",
    date: new Date(2026, 1, 25),
    type: "income",
    amount: 300,
    category: "Freelance",
    description: "Logo Design",
  },
  {
    id: "14",
    date: new Date(2026, 1, 27),
    type: "expense",
    amount: 90,
    category: "Food & Dining",
    description: "Dining Out",
  },
  {
    id: "15",
    date: new Date(2026, 1, 28),
    type: "expense",
    amount: 1200,
    category: "Housing",
    description: "Rent Payment",
  },
];

const categoryColors: Record<string, string> = {
  "Food & Dining": "#DC2626",
  Groceries: "#16A34A",
  Transportation: "#4ECDC4",
  "Books & Supplies": "#45B7D1",
  Entertainment: "#FFA07A",
  Housing: "#98D8C8",
  Utilities: "#D97706",
  Health: "#0891B2",
  "Personal Care": "#BB8FCE",
  Other: "#95A5A6",
  Salary: "#10B981",
  Freelance: "#34D399",
  Investment: "#6EE7B7",
};

export function Calendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date(2026, 1, 1));
  const [selectedDate, setSelectedDate] = useState(new Date(2026, 1, 27));
  const [search, setSearch] = useState("");

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const calendarStart = startOfWeek(monthStart);
  const calendarEnd = endOfWeek(monthEnd);
  const calendarDays = eachDayOfInterval({ start: calendarStart, end: calendarEnd });

  const selectedDateTransactions = useMemo(
    () => mockTransactions.filter((t) => isSameDay(t.date, selectedDate)),
    [selectedDate]
  );

  const filteredSelectedTransactions = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return selectedDateTransactions;
    return selectedDateTransactions.filter((t) => `${t.category} ${t.description}`.toLowerCase().includes(q));
  }, [search, selectedDateTransactions]);

  const getTransactionsForDate = (date: Date) => mockTransactions.filter((t) => isSameDay(t.date, date));

  const monthTransactions = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return mockTransactions.filter((t) => {
      const transactionDate = new Date(t.date);
      transactionDate.setHours(0, 0, 0, 0);
      return isSameMonth(t.date, currentMonth) && transactionDate <= today;
    });
  }, [currentMonth]);

  const totalIncome = monthTransactions.filter((t) => t.type === "income").reduce((sum, t) => sum + t.amount, 0);
  const totalExpense = monthTransactions.filter((t) => t.type === "expense").reduce((sum, t) => sum + t.amount, 0);
  const net = totalIncome - totalExpense;

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Calendar</h1>
          <p className="text-gray-600">View income and expenses by day</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2 p-6">
            <div className="flex items-center justify-between mb-4">
              <button onClick={() => setCurrentMonth(subMonths(currentMonth, 1))} className="p-2 rounded-lg hover:bg-gray-100" aria-label="Previous month">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <div className="text-lg font-semibold">{format(currentMonth, "MMMM yyyy")}</div>
              <button onClick={() => setCurrentMonth(addMonths(currentMonth, 1))} className="p-2 rounded-lg hover:bg-gray-100" aria-label="Next month">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-7 text-sm font-medium text-gray-500 mb-2">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
                <div key={d} className="p-2 text-center">
                  {d}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-1">
              {calendarDays.map((day) => {
                const dayTransactions = getTransactionsForDate(day);
                const isSelected = isSameDay(day, selectedDate);
                const inMonth = isSameMonth(day, currentMonth);
                const dayTotal = dayTransactions.reduce((sum, t) => (t.type === "expense" ? sum - t.amount : sum + t.amount), 0);

                return (
                  <button
                    key={day.toISOString()}
                    onClick={() => setSelectedDate(day)}
                    className={`min-h-[80px] p-2 rounded-lg border text-left transition-colors ${inMonth ? "bg-white" : "bg-gray-50"} ${isSelected ? "border-indigo-500 ring-2 ring-indigo-100" : "border-gray-200"} hover:bg-gray-50`}
                  >
                    <div className={`text-sm font-medium ${inMonth ? "text-gray-900" : "text-gray-400"}`}>{format(day, "d")}</div>
                    {dayTransactions.length > 0 && (
                      <div className="mt-2 space-y-1">
                        <div className={`text-xs font-semibold ${dayTotal >= 0 ? "text-green-600" : "text-red-600"}`}>
                          {dayTotal >= 0 ? "+" : ""}${dayTotal.toFixed(0)}
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {Array.from(new Set(dayTransactions.map((t) => t.category)))
                            .slice(0, 3)
                            .map((c) => (
                              <span
                                key={c}
                                className="inline-block w-2 h-2 rounded-full"
                                style={{ backgroundColor: categoryColors[c] ?? "#95A5A6" }}
                                aria-label={c}
                                title={c}
                              />
                            ))}
                        </div>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </Card>

          <Card className="p-6">
            <div className="mb-4">
              <div className="text-lg font-semibold">{format(selectedDate, "MMMM d, yyyy")}</div>
              <div className="text-sm text-gray-500">Transactions</div>
            </div>

            <div className="mb-4">
              <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search category or description" />
            </div>

            {filteredSelectedTransactions.length === 0 ? (
              <div className="text-sm text-gray-500">No transactions for this date.</div>
            ) : (
              <div className="space-y-3">
                {filteredSelectedTransactions.map((t) => (
                  <div key={t.id} className="flex items-start justify-between gap-3 border-b border-gray-100 pb-3">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{t.description}</div>
                      <div className="text-xs text-gray-500">{t.category}</div>
                    </div>
                    <div className={`text-sm font-semibold ${t.type === "income" ? "text-green-600" : "text-red-600"}`}>
                      {t.type === "income" ? "+" : "-"}${t.amount.toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-6 pt-4 border-t border-gray-100">
              <div className="text-sm text-gray-600 mb-2">This month totals</div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Income</span>
                <span className="font-semibold text-green-600">+${totalIncome.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between text-sm mt-1">
                <span className="text-gray-500">Expenses</span>
                <span className="font-semibold text-red-600">-${totalExpense.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between text-sm mt-3">
                <span className="text-gray-700 font-medium">Net</span>
                <span className={`font-semibold ${net >= 0 ? "text-green-700" : "text-red-700"}`}>${net.toFixed(2)}</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
