
import React, { useMemo, useState } from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import {
  Banknote,
  ShoppingBag,
  TrendingUp,
  Receipt,
  Download,
  CalendarDays,
  CreditCard,
  Smartphone,
  Wallet,
  ArrowUpRight,
  Award,
} from "lucide-react";

// Sample revenue data
const revenueData = [
  { date: "2026-10-01", revenue: 12500, orders: 18 },
  { date: "2026-10-02", revenue: 15800, orders: 23 },
  { date: "2026-10-03", revenue: 11200, orders: 16 },
  { date: "2026-10-04", revenue: 18900, orders: 27 },
  { date: "2026-10-05", revenue: 14600, orders: 21 },
  { date: "2026-10-06", revenue: 21000, orders: 31 },
  { date: "2026-10-07", revenue: 17400, orders: 25 },
  { date: "2026-10-08", revenue: 23500, orders: 34 },
  { date: "2026-10-09", revenue: 19200, orders: 29 },
  { date: "2026-10-10", revenue: 26800, orders: 38 },
  { date: "2026-10-11", revenue: 22100, orders: 32 },
  { date: "2026-10-12", revenue: 29500, orders: 42 },
  { date: "2026-10-13", revenue: 24800, orders: 36 },
  { date: "2026-10-14", revenue: 32100, orders: 45 },
  { date: "2026-10-15", revenue: 28400, orders: 40 },
  { date: "2026-10-16", revenue: 35200, orders: 49 },
  { date: "2026-10-17", revenue: 31000, orders: 44 },
  { date: "2026-10-18", revenue: 38600, orders: 54 },
  { date: "2026-10-19", revenue: 33500, orders: 47 },
  { date: "2026-10-20", revenue: 41200, orders: 58 },
  { date: "2026-10-21", revenue: 36800, orders: 51 },
  { date: "2026-10-22", revenue: 43900, orders: 61 },
  { date: "2026-10-23", revenue: 39700, orders: 56 },
  { date: "2026-10-24", revenue: 46500, orders: 65 },
  { date: "2026-10-25", revenue: 42100, orders: 59 },
  { date: "2026-10-26", revenue: 48900, orders: 68 },
  { date: "2026-10-27", revenue: 44500, orders: 62 },
  { date: "2026-10-28", revenue: 51800, orders: 72 },
  { date: "2026-10-29", revenue: 47300, orders: 66 },
  { date: "2026-10-30", revenue: 54900, orders: 76 },
  { date: "2026-10-31", revenue: 49200, orders: 69 },
  { date: "2026-11-01", revenue: 56500, orders: 79 },
  { date: "2026-11-02", revenue: 52800, orders: 74 },
];

const menuItems = [
  { name: "Chicken Biryani", category: "Main Course", quantity: 245, revenue: 183750 },
  { name: "Grilled Chicken", category: "Main Course", quantity: 198, revenue: 178200 },
  { name: "Beef Burger", category: "Fast Food", quantity: 176, revenue: 105600 },
  { name: "Chips Masala", category: "Snacks", quantity: 164, revenue: 49200 },
  { name: "Fresh Juice", category: "Drinks", quantity: 152, revenue: 45600 },
];

const paymentSummary = [
  { name: "M-Pesa", amount: 485000, icon: Smartphone },
  { name: "Cash", amount: 312000, icon: Wallet },
  { name: "Card", amount: 185000, icon: CreditCard },
  { name: "Bank Transfer", amount: 98000, icon: Banknote },
];

const currency = (amount) =>
  new Intl.NumberFormat("en-KE", {
    style: "currency",
    currency: "KES",
    maximumFractionDigits: 0,
  }).format(amount);

const dateLabel = (date) =>
  new Date(`${date}T00:00:00`).toLocaleDateString("en-KE", {
    day: "2-digit",
    month: "short",
  });

const startOfDay = (date) => {
  const result = new Date(date);
  result.setHours(0, 0, 0, 0);
  return result;
};

export default function SalesStatistics() {
  const [period, setPeriod] = useState("7days");
  const [customStart, setCustomStart] = useState("2026-10-01");
  const [customEnd, setCustomEnd] = useState("2026-11-02");
  const [reportType, setReportType] = useState("summary");
  const [reportMessage, setReportMessage] = useState("");

  const filteredRevenue = useMemo(() => {
    const today = startOfDay(new Date());
    let start = null;
    let end = today;

    if (period === "today") {
      start = today;
    } else if (period === "7days") {
      start = new Date(today);
      start.setDate(today.getDate() - 6);
    } else if (period === "30days") {
      start = new Date(today);
      start.setDate(today.getDate() - 29);
    } else if (period === "thisMonth") {
      start = new Date(today.getFullYear(), today.getMonth(), 1);
    } else if (period === "thisYear") {
      start = new Date(today.getFullYear(), 0, 1);
    } else if (period === "custom") {
      start = customStart ? startOfDay(new Date(`${customStart}T00:00:00`)) : null;
      end = customEnd ? startOfDay(new Date(`${customEnd}T00:00:00`)) : today;
    }

    if (period === "all") return revenueData;

    return revenueData.filter((item) => {
      const date = startOfDay(new Date(`${item.date}T00:00:00`));
      return (!start || date >= start) && (!end || date <= end);
    });
  }, [period, customStart, customEnd]);

  const totalRevenue = filteredRevenue.reduce(
    (sum, item) => sum + item.revenue,
    0
  );

  const totalOrders = filteredRevenue.reduce(
    (sum, item) => sum + item.orders,
    0
  );

  const averageOrder = totalOrders ? totalRevenue / totalOrders : 0;

  const totalPayments = paymentSummary.reduce(
    (sum, payment) => sum + payment.amount,
    0
  );

  const exportCSV = () => {
    const rows = [];

    rows.push(["HOTEL SALES STATISTICS REPORT"]);
    rows.push(["Generated on", new Date().toLocaleString()]);
    rows.push(["Selected period", period]);
    rows.push([]);
    rows.push(["REVENUE SUMMARY"]);
    rows.push(["Metric", "Value"]);
    rows.push(["Total Revenue (KES)", totalRevenue]);
    rows.push(["Total Orders", totalOrders]);
    rows.push(["Average Order Value (KES)", averageOrder.toFixed(2)]);
    rows.push([]);
    rows.push(["REVENUE BY DATE"]);
    rows.push(["Date", "Revenue (KES)", "Orders"]);

    filteredRevenue.forEach((item) => {
      rows.push([item.date, item.revenue, item.orders]);
    });

    if (reportType === "full") {
      rows.push([]);
      rows.push(["BEST-SELLING MENU ITEMS"]);
      rows.push(["Item", "Category", "Quantity Sold", "Revenue (KES)"]);

      menuItems.forEach((item) => {
        rows.push([
          item.name,
          item.category,
          item.quantity,
          item.revenue,
        ]);
      });

      rows.push([]);
      rows.push(["PAYMENT SUMMARY"]);
      rows.push(["Payment Method", "Amount (KES)", "Share (%)"]);

      paymentSummary.forEach((payment) => {
        rows.push([
          payment.name,
          payment.amount,
          ((payment.amount / totalPayments) * 100).toFixed(2),
        ]);
      });
    }

    const csv = rows
      .map((row) =>
        row
          .map((value) => {
            const safeValue = String(value ?? "");
            return `"${safeValue.replace(/"/g, '""')}"`;
          })
          .join(",")
      )
      .join("\r\n");

    const blob = new Blob(["\uFEFF" + csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = `sales-statistics-${new Date()
      .toISOString()
      .slice(0, 10)}.csv`;

    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);

    setReportMessage("Your CSV report has been generated.");
    window.setTimeout(() => setReportMessage(""), 3000);
  };

  const stats = [
    {
      title: "Total Revenue",
      value: currency(totalRevenue),
      description: "For the selected period",
      icon: Banknote,
      iconClass: "bg-blue-50 text-blue-600",
    },
    {
      title: "Total Orders",
      value: totalOrders.toLocaleString(),
      description: "Orders in this period",
      icon: ShoppingBag,
      iconClass: "bg-purple-50 text-purple-600",
    },
    {
      title: "Average Order Value",
      value: currency(averageOrder),
      description: "Revenue per order",
      icon: Receipt,
      iconClass: "bg-amber-50 text-amber-600",
    },
    {
      title: "Daily Average",
      value: currency(
        filteredRevenue.length
          ? totalRevenue / filteredRevenue.length
          : 0
      ),
      description: "Average per recorded day",
      icon: TrendingUp,
      iconClass: "bg-emerald-50 text-emerald-600",
    },
  ];

  const inputClass =
    "rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

  return (
    <div className="min-h-screen bg-gray-50 p-4 text-gray-800 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Heading */}
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              Sales Statistics
            </h1>
            <p className="mt-2 text-sm text-gray-500">
              Monitor revenue, menu performance and payment activity.
            </p>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row">
            <select
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              className={inputClass}
              aria-label="Report type"
            >
              <option value="summary">Summary Report</option>
              <option value="full">Full Report</option>
            </select>

            <button
              onClick={exportCSV}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
            >
              <Download size={17} />
              Generate Report
            </button>
          </div>
        </div>

        {reportMessage && (
          <div
            role="status"
            className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700"
          >
            {reportMessage}
          </div>
        )}

        {/* Statistics cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.title}
                className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      {stat.title}
                    </p>
                    <h2 className="mt-3 text-2xl font-bold text-gray-900">
                      {stat.value}
                    </h2>
                    <p className="mt-2 text-xs text-gray-500">
                      {stat.description}
                    </p>
                  </div>

                  <div className={`rounded-xl p-3 ${stat.iconClass}`}>
                    <Icon size={23} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Revenue graph */}
        <section className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm sm:p-6">
          <div className="mb-5 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-lg font-bold text-gray-900">
                Revenue Overview
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                Revenue generated across the selected period.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <CalendarDays size={17} className="text-gray-400" />

              <select
                value={period}
                onChange={(e) => setPeriod(e.target.value)}
                className={inputClass}
                aria-label="Revenue graph period"
              >
                <option value="today">Today</option>
                <option value="7days">Last 7 Days</option>
                <option value="30days">Last 30 Days</option>
                <option value="thisMonth">This Month</option>
                <option value="thisYear">This Year</option>
                <option value="all">All Available Data</option>
                <option value="custom">Custom Range</option>
              </select>
            </div>
          </div>

          {period === "custom" && (
            <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center">
              <label className="flex flex-col gap-1 text-xs text-gray-500">
                Start date
                <input
                  type="date"
                  value={customStart}
                  max={customEnd || undefined}
                  onChange={(e) => setCustomStart(e.target.value)}
                  className={inputClass}
                />
              </label>

              <label className="flex flex-col gap-1 text-xs text-gray-500">
                End date
                <input
                  type="date"
                  value={customEnd}
                  min={customStart || undefined}
                  onChange={(e) => setCustomEnd(e.target.value)}
                  className={inputClass}
                />
              </label>
            </div>
          )}

          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-sm text-gray-500">Revenue in period</p>
              <p className="mt-1 text-2xl font-bold text-gray-900">
                {currency(totalRevenue)}
              </p>
            </div>

            <div className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700">
              <ArrowUpRight size={15} />
              {totalOrders} orders
            </div>
          </div>

          {filteredRevenue.length > 0 ? (
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={filteredRevenue}
                  margin={{ top: 10, right: 8, left: 5, bottom: 0 }}
                >
                  <defs>
                    <linearGradient
                      id="revenueGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="0%"
                        stopColor="#2563eb"
                        stopOpacity={0.25}
                      />
                      <stop
                        offset="95%"
                        stopColor="#2563eb"
                        stopOpacity={0.01}
                      />
                    </linearGradient>
                  </defs>

                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="#e5e7eb"
                  />

                  <XAxis
                    dataKey="date"
                    tickFormatter={dateLabel}
                    tick={{ fontSize: 11, fill: "#6b7280" }}
                    axisLine={false}
                    tickLine={false}
                    minTickGap={20}
                  />

                  <YAxis
                    tickFormatter={(value) =>
                      value >= 1000
                        ? `${(value / 1000).toFixed(0)}k`
                        : value
                    }
                    tick={{ fontSize: 11, fill: "#6b7280" }}
                    axisLine={false}
                    tickLine={false}
                    width={45}
                  />

                  <Tooltip
                    labelFormatter={(label) =>
                      new Date(`${label}T00:00:00`).toLocaleDateString(
                        "en-KE",
                        {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        }
                      )
                    }
                    formatter={(value, name) => [
                      name === "revenue"
                        ? currency(value)
                        : value,
                      name === "revenue" ? "Revenue" : "Orders",
                    ]}
                    contentStyle={{
                      borderRadius: "12px",
                      border: "1px solid #e5e7eb",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
                    }}
                  />

                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="#2563eb"
                    strokeWidth={2.5}
                    fill="url(#revenueGradient)"
                    activeDot={{ r: 5, strokeWidth: 0 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="flex h-64 items-center justify-center text-sm text-gray-500">
              No revenue records for this period.
            </div>
          )}
        </section>

        {/* Menu items and payment summary */}
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
          {/* Best-selling items */}
          <section className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-gray-100 p-5">
              <div>
                <h2 className="font-bold text-gray-900">
                  Best-Selling Menu Items
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  Ranked by quantity sold
                </p>
              </div>

              <div className="rounded-xl bg-amber-50 p-3 text-amber-600">
                <Award size={22} />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[430px] text-left text-sm">
                <thead className="bg-gray-50 text-xs uppercase text-gray-500">
                  <tr>
                    <th className="px-5 py-3 font-semibold">Menu Item</th>
                    <th className="px-5 py-3 text-right font-semibold">
                      Sold
                    </th>
                    <th className="px-5 py-3 text-right font-semibold">
                      Revenue
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100">
                  {[...menuItems]
                    .sort((a, b) => b.quantity - a.quantity)
                    .map((item, index) => (
                      <tr key={item.name} className="hover:bg-gray-50">
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            <span
                              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-xs font-bold ${
                                index === 0
                                  ? "bg-amber-100 text-amber-700"
                                  : "bg-gray-100 text-gray-600"
                              }`}
                            >
                              {index + 1}
                            </span>
                            <div>
                              <p className="font-semibold text-gray-800">
                                {item.name}
                              </p>
                              <p className="mt-1 text-xs text-gray-400">
                                {item.category}
                              </p>
                            </div>
                          </div>
                        </td>

                        <td className="px-5 py-4 text-right font-medium text-gray-700">
                          {item.quantity}
                        </td>

                        <td className="whitespace-nowrap px-5 py-4 text-right font-semibold text-gray-900">
                          {currency(item.revenue)}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Payment summary */}
          <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-bold text-gray-900">
                  Payment Summary
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  Revenue by payment method
                </p>
              </div>

              <div className="rounded-xl bg-emerald-50 p-3 text-emerald-600">
                <CreditCard size={22} />
              </div>
            </div>

            <div className="mt-6 rounded-xl bg-gray-50 p-4">
              <p className="text-sm text-gray-500">
                Total payments recorded
              </p>
              <p className="mt-1 text-2xl font-bold text-gray-900">
                {currency(totalPayments)}
              </p>
            </div>

            <div className="mt-5 space-y-5">
              {paymentSummary.map((payment) => {
                const Icon = payment.icon;
                const percentage = totalPayments
                  ? (payment.amount / totalPayments) * 100
                  : 0;

                return (
                  <div key={payment.name}>
                    <div className="mb-2 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <div className="rounded-lg bg-gray-100 p-2 text-gray-600">
                          <Icon size={17} />
                        </div>
                        <span className="text-sm font-medium text-gray-700">
                          {payment.name}
                        </span>
                      </div>

                      <div className="text-right">
                        <p className="text-sm font-semibold text-gray-900">
                          {currency(payment.amount)}
                        </p>
                        <p className="text-xs text-gray-500">
                          {percentage.toFixed(1)}%
                        </p>
                      </div>
                    </div>

                    <div className="h-2 overflow-hidden rounded-full bg-gray-100">
                      <div
                        className="h-full rounded-full bg-blue-600 transition-all"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </div>

        <p className="pb-2 text-center text-xs text-gray-400">
          Sales statistics are based on the currently configured sample data.
        </p>
      </div>
    </div>
  );
}
