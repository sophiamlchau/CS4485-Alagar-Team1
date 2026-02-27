"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameDay,
  isSameMonth,
  addMonths,
  subMonths,
  startOfWeek,
  endOfWeek,
} from "date-fns";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

interface Transaction {
  id: string;
  date: Date;
  type: "income" | "expense";
  amount: number;
  category: string;
  description: string;
}

const categoryColors: { [key: string]: string } = {
  "Food & Dining": "#FF6B6B",
  Transportation: "#4ECDC4",
  "Books & Supplies": "#45B7D1",
  Entertainment: "#FFA07A",
  Housing: "#98D8C8",
  Utilities: "#F7DC6F",
  "Personal Care": "#BB8FCE",
  Other: "#95A5A6",
  Salary: "#10B981",
  Freelance: "#34D399",
  Investment: "#6EE7B7",
};

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
  {
    id: "16",
    date: new Date(2026, 1, 16),
    type: "expense",
    amount: 45,
    category: "Transportation",
    description: "Public Transit Pass",
  },
  {
    id: "17",
    date: new Date(2026, 1, 19),
    type: "expense",
    amount: 80,
    category: "Books & Supplies",
    description: "Textbooks",
  },
  {
    id: "18",
    date: new Date(2026, 1, 23),
    type: "expense",
    amount: 35,
    category: "Other",
    description: "Miscellaneous",
  },
  { id: "19", date: new Date(2026, 0, 15), type: "income", amount: 3200, category: "Salary", description: "Monthly Salary" },
  { id: "20", date: new Date(2026, 0, 20), type: "expense", amount: 500, category: "Housing", description: "Apartment Rent" },
  { id: "21", date: new Date(2026, 2, 5), type: "income", amount: 3200, category: "Salary", description: "Monthly Salary" },
  { id: "22", date: new Date(2026, 2, 10), type: "expense", amount: 250, category: "Entertainment", description: "Electronics" },
];

export default function Page() {
  const [currentMonth, setCurrentMonth] = useState(new Date(2026, 1, 1)); // February 2026
  const [selectedDate, setSelectedDate] = useState(new Date(2026, 1, 27)); // Feb 27, 2026

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const calendarStart = startOfWeek(monthStart);
  const calendarEnd = endOfWeek(monthEnd);
  const calendarDays = eachDayOfInterval({ start: calendarStart, end: calendarEnd });

  const getTransactionsForDate = (date: Date) => mockTransactions.filter((t) => isSameDay(t.date, date));

  const getTransactionsForMonth = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return mockTransactions.filter((t) => {
      const transactionDate = new Date(t.date);
      transactionDate.setHours(0, 0, 0, 0);
      return isSameMonth(t.date, date) && transactionDate <= today;
    });
  };

  const selectedDateTransactions = getTransactionsForDate(selectedDate);
  const monthTransactions = getTransactionsForMonth(currentMonth);

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const checkSelectedDate = new Date(selectedDate);
  checkSelectedDate.setHours(0, 0, 0, 0);
  const isSelectedDateFuture = checkSelectedDate > today;

  const calculateTotals = (transactions: Transaction[]) => {
    const income = transactions.filter((t) => t.type === "income").reduce((sum, t) => sum + t.amount, 0);
    const expenses = transactions.filter((t) => t.type === "expense").reduce((sum, t) => sum + t.amount, 0);
    return { income, expenses, net: income - expenses };
  };

  const dayTotals = calculateTotals(selectedDateTransactions);
  const monthTotals = calculateTotals(monthTransactions);

  const getCategoryBreakdown = (transactions: Transaction[]) => {
    const expenses = transactions.filter((t) => t.type === "expense");
    const breakdown: { [key: string]: number } = {};

    expenses.forEach((transaction) => {
      breakdown[transaction.category] = (breakdown[transaction.category] ?? 0) + transaction.amount;
    });

    return Object.entries(breakdown)
      .map(([category, amount]) => ({ category, amount }))
      .sort((a, b) => b.amount - a.amount);
  };

  const monthCategoryBreakdown = getCategoryBreakdown(monthTransactions);

  const hasTransactions = (date: Date) => mockTransactions.some((t) => isSameDay(t.date, date));

  const getDateNetBalance = (date: Date) => calculateTotals(getTransactionsForDate(date)).net;

  const isToday = (date: Date) => isSameDay(date, new Date());

  const handlePrevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
  const handleNextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));

  const handleDateClick = (date: Date) => setSelectedDate(date);

  const handleDateInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = new Date(e.target.value);
    if (!Number.isNaN(newDate.getTime())) {
      setSelectedDate(newDate);
      setCurrentMonth(newDate);
    }
  };

  return (
    <div
      className="min-h-screen p-8"
      style={{
        background:
          "linear-gradient(to bottom right, rgb(239, 246, 255), rgb(238, 242, 255), rgb(250, 245, 255))",
      }}
    >
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl mb-8">Budget Calendar</h1>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <button
                    onClick={handlePrevMonth}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    aria-label="Previous month"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <h2 className="text-xl min-w-[180px] text-center">
                    {format(currentMonth, "MMMM yyyy")}
                  </h2>
                  <button
                    onClick={handleNextMonth}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    aria-label="Next month"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <label htmlFor="date-input" className="text-sm text-gray-500">
                    Select Date
                  </label>
                  <Input
                    id="date-input"
                    type="date"
                    value={format(selectedDate, "yyyy-MM-dd")}
                    onChange={handleDateInputChange}
                    className="w-40 text-sm bg-gray-800 text-white border-2 border-gray-700"
                    style={{ colorScheme: "dark" }}
                  />
                </div>
              </div>

              <div className="border rounded-lg overflow-hidden">
                <div className="grid grid-cols-7 bg-gray-100">
                  {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                    <div
                      key={day}
                      className="p-3 text-center text-sm font-medium text-gray-600"
                    >
                      {day}
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-7 bg-white">
                  {calendarDays.map((day, index) => {
                    const isCurrentMonth = isSameMonth(day, currentMonth);
                    const isSelected = isSameDay(day, selectedDate);
                    const dayIsToday = isToday(day);
                    const hasTransaction = hasTransactions(day);

                    const checkDate = new Date(day);
                    checkDate.setHours(0, 0, 0, 0);
                    const isFutureDate = checkDate > today;

                    const netBalance =
                      isCurrentMonth && !isFutureDate ? getDateNetBalance(day) : 0;

                    let bgClass = "";
                    if (isCurrentMonth && hasTransaction && !isFutureDate) {
                      if (netBalance > 0) bgClass = "bg-green-50";
                      else if (netBalance < 0) bgClass = "bg-red-50";
                    }

                    return (
                      <button
                        key={index}
                        onClick={() => handleDateClick(day)}
                        className={`
                          relative p-3 min-h-[90px] border-r border-b
                          hover:bg-gray-100 transition-colors
                          ${!isCurrentMonth ? "bg-gray-50 text-gray-400" : bgClass}
                          ${isSelected ? "ring-2 ring-blue-500 ring-inset" : ""}
                        `}
                      >
                        <div className="flex flex-col h-full justify-between">
                          <div className="flex flex-col items-center">
                            <span
                              className={`
                                w-9 h-9 flex items-center justify-center rounded-full text-base font-bold
                                shadow-sm
                                ${
                                  isSelected
                                    ? "bg-blue-500 text-white shadow-md"
                                    : "text-gray-700 bg-white/50"
                                }
                              `}
                              style={
                                !isSelected
                                  ? { textShadow: "0 1px 2px rgba(0,0,0,0.1)" }
                                  : {}
                              }
                            >
                              {format(day, "d")}
                            </span>
                          </div>

                          <div className="flex justify-between items-end">
                            {dayIsToday && isCurrentMonth && (
                              <span className="text-[10px] text-blue-600 font-bold">
                                Today
                              </span>
                            )}
                            {isCurrentMonth && hasTransaction && !isFutureDate && (
                              <span
                                className={`text-[10px] font-bold ml-auto ${
                                  netBalance >= 0 ? "text-green-600" : "text-red-600"
                                }`}
                              >
                                {netBalance >= 0 ? "+" : ""}${netBalance.toFixed(0)}
                              </span>
                            )}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="font-medium mb-4 text-lg">
                {format(selectedDate, "EEEE, MMMM d, yyyy")}
              </h3>

              {isSelectedDateFuture ? (
                <div className="text-center py-8">
                  <p className="text-gray-500">Nothing to display at this time</p>
                </div>
              ) : selectedDateTransactions.length > 0 ? (
                <div className="space-y-6">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                      <div className="text-sm text-green-700 mb-1">Income</div>
                      <div className="text-2xl font-medium text-green-600">
                        ${dayTotals.income.toFixed(2)}
                      </div>
                    </div>
                    <div className="bg-red-50 rounded-lg p-4 border border-red-200">
                      <div className="text-sm text-red-700 mb-1">Expenses</div>
                      <div className="text-2xl font-medium text-red-600">
                        ${dayTotals.expenses.toFixed(2)}
                      </div>
                    </div>
                    <div
                      className={`rounded-lg p-4 border ${
                        dayTotals.net >= 0
                          ? "bg-blue-50 border-blue-200"
                          : "bg-orange-50 border-orange-200"
                      }`}
                    >
                      <div
                        className={`text-sm mb-1 ${
                          dayTotals.net >= 0 ? "text-blue-700" : "text-orange-700"
                        }`}
                      >
                        Net Balance
                      </div>
                      <div
                        className={`text-2xl font-medium ${
                          dayTotals.net >= 0 ? "text-blue-600" : "text-orange-600"
                        }`}
                      >
                        {dayTotals.net >= 0 ? "+" : ""}${dayTotals.net.toFixed(2)}
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-3">Transactions</h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <div className="text-sm text-green-700 font-medium mb-2 flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-green-500" />
                          Income (
                          {selectedDateTransactions.filter((t) => t.type === "income").length})
                        </div>
                        <div className="space-y-2">
                          {selectedDateTransactions
                            .filter((t) => t.type === "income")
                            .map((transaction) => (
                              <div
                                key={transaction.id}
                                className="bg-white rounded-lg p-3 border border-gray-200"
                              >
                                <div className="flex justify-between items-start">
                                  <div className="flex-1">
                                    <div className="font-medium text-sm">
                                      {transaction.description}
                                    </div>
                                    <div className="flex items-center gap-2 mt-1">
                                      <div
                                        className="w-2 h-2 rounded-full"
                                        style={{
                                          backgroundColor:
                                            categoryColors[transaction.category] ||
                                            "#95A5A6",
                                        }}
                                      />
                                      <span className="text-xs text-gray-500">
                                        {transaction.category}
                                      </span>
                                    </div>
                                  </div>
                                  <div className="text-green-600 font-medium">
                                    +${transaction.amount.toFixed(2)}
                                  </div>
                                </div>
                              </div>
                            ))}
                          {selectedDateTransactions.filter((t) => t.type === "income")
                            .length === 0 && (
                            <div className="text-sm text-gray-400 italic">
                              No income transactions
                            </div>
                          )}
                        </div>
                      </div>

                      <div>
                        <div className="text-sm text-red-700 font-medium mb-2 flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-red-500" />
                          Expenses (
                          {selectedDateTransactions.filter((t) => t.type === "expense").length})
                        </div>
                        <div className="space-y-2">
                          {selectedDateTransactions
                            .filter((t) => t.type === "expense")
                            .map((transaction) => (
                              <div
                                key={transaction.id}
                                className="bg-white rounded-lg p-3 border border-gray-200"
                              >
                                <div className="flex justify-between items-start">
                                  <div className="flex-1">
                                    <div className="font-medium text-sm">
                                      {transaction.description}
                                    </div>
                                    <div className="flex items-center gap-2 mt-1">
                                      <div
                                        className="w-2 h-2 rounded-full"
                                        style={{
                                          backgroundColor:
                                            categoryColors[transaction.category] ||
                                            "#95A5A6",
                                        }}
                                      />
                                      <span className="text-xs text-gray-500">
                                        {transaction.category}
                                      </span>
                                    </div>
                                  </div>
                                  <div className="text-red-600 font-medium">
                                    -${transaction.amount.toFixed(2)}
                                  </div>
                                </div>
                              </div>
                            ))}
                          {selectedDateTransactions.filter((t) => t.type === "expense")
                            .length === 0 && (
                            <div className="text-sm text-gray-400 italic">
                              No expense transactions
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {getCategoryBreakdown(selectedDateTransactions).length > 0 && (
                    <div>
                      <h4 className="font-medium mb-3">Category Breakdown</h4>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {getCategoryBreakdown(selectedDateTransactions).map((item, index) => (
                          <div
                            key={index}
                            className="bg-white rounded-lg p-3 border border-gray-200"
                          >
                            <div className="flex items-center gap-2 mb-1">
                              <div
                                className="w-3 h-3 rounded-full"
                                style={{
                                  backgroundColor:
                                    categoryColors[item.category] || "#95A5A6",
                                }}
                              />
                              <span className="text-xs text-gray-600 truncate">
                                {item.category}
                              </span>
                            </div>
                            <div className="text-red-600 font-medium">
                              ${item.amount.toFixed(2)}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500">No transactions on this date</p>
                  <p className="text-sm text-gray-400 mt-2">
                    Select a date with transactions to view details
                  </p>
                </div>
              )}
            </Card>
          </div>

          <div>
            <Card className="p-6">
              <h3 className="font-medium mb-4">
                {format(currentMonth, "MMMM yyyy")} Summary
              </h3>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Total Income</span>
                  <span className="text-green-600 font-medium text-lg">
                    ${monthTotals.income.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Total Expenses</span>
                  <span className="text-red-600 font-medium text-lg">
                    ${monthTotals.expenses.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between items-center pt-3 border-t">
                  <span className="font-medium">Net Balance</span>
                  <span
                    className={`font-medium text-xl ${
                      monthTotals.net >= 0 ? "text-blue-600" : "text-orange-600"
                    }`}
                  >
                    {monthTotals.net >= 0 ? "+" : ""}${monthTotals.net.toFixed(2)}
                  </span>
                </div>

                <div className="pt-4 space-y-2">
                  <div className="text-xs text-gray-500">
                    {monthTransactions.length} transactions this month
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden flex">
                    <div
                      className="bg-green-500 h-2 transition-all"
                      style={{
                        width: `${
                          monthTotals.income + monthTotals.expenses > 0
                            ? (monthTotals.income /
                                (monthTotals.income + monthTotals.expenses)) *
                              100
                            : 0
                        }%`,
                      }}
                    />
                    <div
                      className="bg-red-500 h-2 transition-all"
                      style={{
                        width: `${
                          monthTotals.income + monthTotals.expenses > 0
                            ? (monthTotals.expenses /
                                (monthTotals.income + monthTotals.expenses)) *
                              100
                            : 0
                        }%`,
                      }}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Income vs Expenses</span>
                    <span>
                      {monthTotals.income + monthTotals.expenses > 0
                        ? Math.round(
                            (monthTotals.income /
                              (monthTotals.income + monthTotals.expenses)) *
                              100,
                          )
                        : 0}
                      % Income
                    </span>
                  </div>
                </div>

                <div className="pt-4">
                  <h4 className="font-medium mb-2">Category Breakdown</h4>
                  <div className="space-y-2">
                    {monthCategoryBreakdown.map((item, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <div
                            className="w-2 h-2 rounded-full"
                            style={{
                              backgroundColor:
                                categoryColors[item.category] || "#95A5A6",
                            }}
                          />
                          <span className="text-sm">{item.category}</span>
                        </div>
                        <span className="text-sm font-medium text-red-600">
                          ${item.amount.toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
