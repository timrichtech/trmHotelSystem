import { useMemo, useState } from "react";
import {
  DollarSign, ShoppingBag, Utensils, BedDouble, Users,
  TrendingUp, TrendingDown, Plus, Download, Search,
  CalendarDays, ChevronDown, ArrowUpRight, ArrowDownRight,
  Clock, CheckCircle2, AlertTriangle, Package, UserPlus,
  FileText, Settings, X, Coffee, CreditCard, Banknote,
  Menu as MenuIcon, RefreshCw, CircleDot, Eye,
  ClipboardList, ChefHat, Table2, BellRing
} from "lucide-react";

const initialOrders = [
  { id: "ORD-1048", customer: "James Mwangi", items: "Chicken & Chips", type: "Restaurant", table: "T04", amount: 1250, payment: "M-Pesa", status: "Preparing", time: "12:42 PM" },
  { id: "ORD-1047", customer: "Mary Wanjiku", items: "Beef Burger x2", type: "Restaurant", table: "T02", amount: 1600, payment: "Cash", status: "Pending", time: "12:35 PM" },
  { id: "ORD-1046", customer: "Peter Otieno", items: "Room 203 service", type: "Room Service", table: "Room 203", amount: 850, payment: "Unpaid", status: "Pending", time: "12:21 PM" },
  { id: "ORD-1045", customer: "Grace Njeri", items: "Pizza & Soda", type: "Restaurant", table: "T08", amount: 1800, payment: "Card", status: "Completed", time: "12:08 PM" },
  { id: "ORD-1044", customer: "David Kimani", items: "Fish & Ugali", type: "Restaurant", table: "T01", amount: 1100, payment: "M-Pesa", status: "Completed", time: "11:54 AM" },
  { id: "ORD-1043", customer: "Sarah Achieng", items: "Pasta & Juice", type: "Restaurant", table: "T06", amount: 950, payment: "Cash", status: "Completed", time: "11:40 AM" },
];

const initialTables = [
  { id: "T01", seats: 2, status: "Occupied", order: "ORD-1044" },
  { id: "T02", seats: 4, status: "Occupied", order: "ORD-1047" },
  { id: "T03", seats: 2, status: "Available", order: "" },
  { id: "T04", seats: 6, status: "Occupied", order: "ORD-1048" },
  { id: "T05", seats: 4, status: "Available", order: "" },
  { id: "T06", seats: 4, status: "Occupied", order: "ORD-1043" },
  { id: "T07", seats: 2, status: "Cleaning", order: "" },
  { id: "T08", seats: 6, status: "Occupied", order: "ORD-1045" },
];

const inventory = [
  { name: "Cooking oil", qty: "2 litres", level: 15, status: "Low stock" },
  { name: "Chicken", qty: "4 kg", level: 22, status: "Low stock" },
  { name: "Tomatoes", qty: "12 kg", level: 65, status: "In stock" },
];

const popularItems = [
  { name: "Chicken & Chips", sold: 84, revenue: 105000, width: "86%" },
  { name: "Beef Burger", sold: 67, revenue: 53600, width: "69%" },
  { name: "Pilau & Kachumbari", sold: 51, revenue: 40800, width: "53%" },
  { name: "Fresh Juice", sold: 43, revenue: 17200, width: "44%" },
];

const salesData = {
  Today: {
    labels: ["8 AM", "10 AM", "12 PM", "2 PM", "4 PM", "6 PM", "8 PM"],
    values: [8000, 14000, 26000, 18000, 35000, 42000, 31000],
    total: 174000,
    comparison: "+12.8%",
  },
  Week: {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    values: [24000, 32000, 28000, 44000, 36000, 58000, 49000],
    total: 271000,
    comparison: "+9.4%",
  },
  Month: {
    labels: ["1–5", "6–10", "11–15", "16–20", "21–25", "26–30"],
    values: [42000, 68000, 54000, 86000, 72000, 98000],
    total: 420000,
    comparison: "+16.2%",
  },
};

const money = (amount) =>
  `KSh ${Number(amount).toLocaleString("en-KE")}`;

function StatusBadge({ status }) {
  const styles = {
    Completed: "bg-emerald-50 text-emerald-700",
    Preparing: "bg-blue-50 text-blue-700",
    Pending: "bg-amber-50 text-amber-700",
    Cancelled: "bg-red-50 text-red-700",
    Available: "bg-emerald-50 text-emerald-700",
    Occupied: "bg-blue-50 text-blue-700",
    Cleaning: "bg-amber-50 text-amber-700",
    "Low stock": "bg-red-50 text-red-600",
    "In stock": "bg-emerald-50 text-emerald-700",
  };

  return (
    <span
      className={`inline-flex whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-semibold ${
        styles[status] || "bg-slate-100 text-slate-600"
      }`}
    >
      {status}
    </span>
  );
}

function SectionTitle({ title, description, action }) {
  return (
    <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
      <div>
        <h2 className="text-base font-bold text-slate-900">{title}</h2>
        {description && (
          <p className="mt-1 text-sm text-slate-500">{description}</p>
        )}
      </div>
      {action}
    </div>
  );
}

function SalesChart({ period }) {
  const { labels, values } = salesData[period];
  const width = 680;
  const height = 230;
  const left = 43;
  const right = 15;
  const top = 14;
  const bottom = 30;
  const max = Math.max(...values) * 1.15;

  const points = values.map((value, index) => ({
    x: left + (index * (width - left - right)) / (values.length - 1),
    y: top + (1 - value / max) * (height - top - bottom),
  }));

  const line = points.map((p) => `${p.x},${p.y}`).join(" ");
  const area = `${left},${height - bottom} ${line} ${
    points[points.length - 1].x
  },${height - bottom}`;

  return (
    <div className="w-full">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full"
        role="img"
        aria-label={`Revenue trend for ${period}`}
      >
        {[0, 1, 2, 3].map((i) => {
          const y = top + (i * (height - top - bottom)) / 3;

          return (
            <g key={i}>
              <line
                x1={left}
                y1={y}
                x2={width - right}
                y2={y}
                stroke="#e2e8f0"
                strokeDasharray="4 5"
              />
              <text
                x={left - 8}
                y={y + 4}
                textAnchor="end"
                fontSize="10"
                fill="#94a3b8"
              >
                {Math.round((max * (3 - i)) / 3 / 1000)}k
              </text>
            </g>
          );
        })}

        <defs>
          <linearGradient id="salesFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2563eb" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#2563eb" stopOpacity="0.01" />
          </linearGradient>
        </defs>

        <polygon points={area} fill="url(#salesFill)" />
        <polyline
          points={line}
          fill="none"
          stroke="#2563eb"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {points.map((p, i) => (
          <g key={i}>
            <circle cx={p.x} cy={p.y} r="4" fill="white" stroke="#2563eb" strokeWidth="2.5" />
            <text
              x={p.x}
              y={height - 7}
              textAnchor="middle"
              fontSize="10"
              fill="#94a3b8"
            >
              {labels[i]}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}

function Modal({ title, description, onClose, children }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold text-slate-900">{title}</h3>
            <p className="mt-1 text-sm text-slate-500">{description}</p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close dialog"
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-100"
          >
            <X size={19} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

export default function HotelDashboard() {
  const [period, setPeriod] = useState("Today");
  const [orders, setOrders] = useState(initialOrders);
  const [tables, setTables] = useState(initialTables);
  const [orderFilter, setOrderFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [showAllOrders, setShowAllOrders] = useState(false);
  const [selectedTable, setSelectedTable] = useState(null);
  const [modal, setModal] = useState("");
  const [productCount, setProductCount] = useState(156);
  const [employeeCount, setEmployeeCount] = useState(24);
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [employeeName, setEmployeeName] = useState("");
  const [employeeRole, setEmployeeRole] = useState("Waiter / Waitress");
  const [notice, setNotice] = useState("");

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const matchesSearch = `${order.id} ${order.customer} ${order.items}`
        .toLowerCase()
        .includes(search.toLowerCase());

      return (
        matchesSearch &&
        (orderFilter === "All" || order.status === orderFilter)
      );
    });
  }, [orders, search, orderFilter]);

  const pendingOrders = orders.filter(
    (order) => order.status === "Pending" || order.status === "Preparing"
  ).length;

  const occupiedTables = tables.filter(
    (table) => table.status === "Occupied"
  ).length;

  const closeModal = () => setModal("");

  function notify(message) {
    setNotice(message);
    window.setTimeout(() => setNotice(""), 3000);
  }

  function changeOrderStatus(orderId, newStatus) {
    setOrders((current) =>
      current.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );

    if (newStatus === "Completed") {
      const order = orders.find((item) => item.id === orderId);

      if (order?.table.startsWith("T")) {
        setTables((current) =>
          current.map((table) =>
            table.id === order.table
              ? { ...table, status: "Cleaning", order: "" }
              : table
          )
        );
      }
    }

    notify(`${orderId} marked as ${newStatus.toLowerCase()}.`);
  }

  function downloadReport() {
    const rows = [
      ["Order ID", "Customer", "Items", "Type", "Amount KSh", "Payment", "Status", "Time"],
      ...orders.map((o) => [
        o.id, o.customer, o.items, o.type, o.amount, o.payment, o.status, o.time,
      ]),
    ];

    const csv = rows
      .map((row) =>
        row.map((value) => `"${String(value).replace(/"/g, '""')}"`).join(",")
      )
      .join("\n");

    const url = URL.createObjectURL(
      new Blob([csv], { type: "text/csv;charset=utf-8;" })
    );

    const link = document.createElement("a");
    link.href = url;
    link.download = "hotel-restaurant-orders.csv";
    link.click();
    URL.revokeObjectURL(url);

    notify("Sample order report downloaded.");
    closeModal();
  }

  function addProduct(e) {
    e.preventDefault();
    setProductCount((count) => count + 1);
    notify(`${productName} added to the demo inventory.`);
    setProductName("");
    setProductPrice("");
    closeModal();
  }

  function addEmployee(e) {
    e.preventDefault();
    setEmployeeCount((count) => count + 1);
    notify(`${employeeName} added as ${employeeRole}.`);
    setEmployeeName("");
    closeModal();
  }

  return (
    <div className="min-h-screen w-full bg-[#f6f8fc] text-slate-800">
      {/* {notice && (
        <div className="fixed right-4 top-4 z-[70] flex max-w-sm items-center gap-2 rounded-xl bg-slate-900 px-4 py-3 text-sm text-white shadow-xl">
          <CheckCircle2 size={18} className="shrink-0 text-emerald-400" />
          <span>{notice}</span>
          <button onClick={() => setNotice("")} aria-label="Dismiss">
            <X size={16} />
          </button>
        </div>
      )} */}

      {/* Full-width dashboard: no navbar and no sidebar */}
      <main className=" space-y-7 p-2 sm:p-6 lg:p-8">
        {/* Dashboard heading */}
        <section className="flex flex-col justify-between gap-4 md:flex-row lg:items-center">
          <div>
            <p className="text-sm font-medium text-blue-600">
              HOTEL MANAGEMENT SYSTEM
            </p>
            <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Admin Dashboard 
            </h1>
            <p className="mt-2 text-sm text-slate-500">
              Here's your hotel's performance and daily operations at a glance.
            </p>
          </div>

          <div className="flex flex-wrap  items-center gap-3">
            <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-600">
              <CalendarDays size={17} className="text-slate-400" />
              {new Date().toLocaleDateString("en-KE", {
                weekday: "short",
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </div>

            <button
              onClick={() => setModal("report")}
              className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              <Download size={17} />
              Export
            </button>

            <button
              onClick={() => setModal("product")}
              className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm shadow-blue-200 hover:bg-blue-700"
            >
              <Plus size={18} />
              Add product
            </button>
          </div>
        </section>

        {/* Key indicators */}
        <section className="grid gap-2 grid-cols-1 md:grid-cols-3 sm:grid-cols-2">
          {[
            {
              title: "Total Revenue",
              value: "KSh 845,200",
              note: "+12.8% this month",
              icon: DollarSign,
              color: "bg-blue-50 text-blue-600",
              trend: true,
            },
            {
              title: "Total Orders",
              value: "1,284",
              note: "+8.2% this month",
              icon: ShoppingBag,
              color: "bg-violet-50 text-violet-600",
              trend: true,
            },
            {
              title: "Food Products",
              value: productCount,
              note: "Menu and inventory items",
              icon: Utensils,
              color: "bg-orange-50 text-orange-600",
            },
            // {
            //   title: "Room Occupancy",
            //   value: "78%",
            //   note: "39 of 50 rooms occupied",
            //   icon: BedDouble,
            //   color: "bg-emerald-50 text-emerald-600",
            //   trend: true,
            // },
          ].map((stat) => (
            <article
              key={stat.title}
              className=" rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="flex items-start justify-between gap-3">
                <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${stat.color}`}>
                  <stat.icon size={21} />
                </div>

                {stat.trend && (
                  <span className="flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-1 text-xs font-semibold text-emerald-700">
                    <TrendingUp size={13} />
                    {stat.title === "Room Occupancy" ? "Good" : "Up"}
                  </span>
                )}
              </div>
              <p className="mt-5 text-sm font-medium text-slate-500">
                {stat.title}
              </p>
              <p className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
                {stat.value}
              </p>
              <p className="mt-2 text-xs text-slate-400">{stat.note}</p>
            </article>
          ))}
        </section>

        {/* Sales and quick actions */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 xl:grid-cols-3">
          <article className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm sm:p-6 xl:col-span-2">
            <SectionTitle
              title="Sales Overview"
              description="Monitor revenue performance for your selected period."
              action={
                <label className="flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-600">
                  <CalendarDays size={16} className="text-slate-400" />
                  <select
                    value={period}
                    onChange={(e) => setPeriod(e.target.value)}
                    className="cursor-pointer bg-transparent outline-none"
                  >
                    {Object.keys(salesData).map((item) => (
                      <option key={item}>{item}</option>
                    ))}
                  </select>
                </label>
              }
            />

            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-sm text-slate-400">Gross sales</p>
                <h3 className="mt-1 text-3xl font-bold tracking-tight text-slate-900">
                  {money(salesData[period].total)}
                </h3>
              </div>
              <span className="flex items-center gap-1 rounded-lg bg-emerald-50 px-2.5 py-1.5 text-xs font-semibold text-emerald-700">
                <TrendingUp size={14} />
                {salesData[period].comparison} vs previous period
              </span>
            </div>

            <div className="mt-6">
              <SalesChart period={period} />
            </div>
            <div className="mt-1 flex items-center gap-2 text-xs text-slate-400">
              <span className="h-2.5 w-2.5 rounded-full bg-blue-600" />
              Revenue
              <span className="ml-auto">Currency: KSh</span>
            </div>
          </article>

          <article className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm sm:p-6">
            <SectionTitle
              title="Quick Actions"
              description="Common tasks for your team."
            />

            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-2 gap-3">
              {[
                { label: "Add Product", detail: "Update menu", icon: PackagePlusIcon, color: "bg-orange-50 text-orange-600", action: "product" },
                { label: "New Employee", detail: "Manage staff", icon: UserPlus, color: "bg-emerald-50 text-emerald-600", action: "employee" },
                { label: "Sales Report", detail: "Export orders", icon: FileText, color: "bg-violet-50 text-violet-600", action: "report" },
                { label: "Settings", detail: "System options", icon: Settings, color: "bg-slate-100 text-slate-600", action: "settings" },
              ].map((item) => (
                <button
                  key={item.label}
                  onClick={() => setModal(item.action)}
                  className="rounded-xl border border-slate-100 p-4 text-left transition hover:border-blue-200 hover:bg-blue-50/40"
                >
                  <span className={`mb-3 flex h-10 w-10 items-center justify-center rounded-xl ${item.color}`}>
                    <item.icon size={20} />
                  </span>
                  <p className="text-sm font-semibold text-slate-800">
                    {item.label}
                  </p>
                  <p className="mt-1 text-xs text-slate-400">{item.detail}</p>
                </button>
              ))}
            </div>

            <div className="mt-4 rounded-xl bg-blue-50 p-4">
              <div className="flex items-center gap-2 text-sm font-semibold text-blue-800">
                <ClipboardList size={17} />
                Kitchen work queue
              </div>
              <p className="mt-1 text-sm text-blue-700">
                {pendingOrders} orders need attention.
              </p>
              <button
                onClick={() => {
                  setOrderFilter("Pending");
                  document.getElementById("recent-orders")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="mt-3 text-xs font-bold text-blue-700 hover:underline"
              >
                Review pending orders →
              </button>
            </div>
          </article>
        </section>

        {/* Table management and alerts */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 xl:grid-cols-3">
          <article className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm sm:p-6 xl:col-span-2">
            <SectionTitle
              title="Restaurant Table Status"
              description={`${occupiedTables} of ${tables.length} tables currently occupied.`}
              action={
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" /> Available
                  <span className="h-2 w-2 rounded-full bg-blue-500" /> Occupied
                </div>
              }
            />

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {tables.map((table) => {
                const tone =
                  table.status === "Available"
                    ? "border-emerald-200 bg-emerald-50/60"
                    : table.status === "Occupied"
                    ? "border-blue-200 bg-blue-50/60"
                    : "border-amber-200 bg-amber-50/70";

                return (
                  <button
                    key={table.id}
                    onClick={() => {
                      setSelectedTable(table);
                      setModal("table");
                    }}
                    className={`rounded-xl border p-4 text-left transition hover:-translate-y-0.5 hover:shadow-sm ${tone}`}
                  >
                    <div className="flex items-center justify-between">
                      <Table2 size={20} className="text-slate-600" />
                      <CircleDot
                        size={12}
                        className={
                          table.status === "Available"
                            ? "fill-emerald-500 text-emerald-500"
                            : table.status === "Occupied"
                            ? "fill-blue-500 text-blue-500"
                            : "fill-amber-500 text-amber-500"
                        }
                      />
                    </div>
                    <p className="mt-4 font-bold text-slate-900">{table.id}</p>
                    <p className="mt-1 text-xs text-slate-500">{table.seats} seats</p>
                    <p className="mt-2 text-xs font-semibold">{table.status}</p>
                  </button>
                );
              })}
            </div>
            <p className="mt-4 text-xs text-slate-400">
              Select a table to view its status or change it.
            </p>
          </article>

          <article className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm sm:p-6">
            <SectionTitle
              title="Kitchen Inventory Alerts"
              description="Items that may need restocking."
              action={<AlertTriangle size={19} className="text-amber-500" />}
            />

            <div className="space-y-4">
              {inventory.map((item) => (
                <div key={item.name}>
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-sm font-semibold text-slate-800">{item.name}</p>
                      <p className="mt-1 text-xs text-slate-400">{item.qty} remaining</p>
                    </div>
                    <StatusBadge status={item.status} />
                  </div>
                  <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100">
                    <div
                      className={`h-full rounded-full ${item.level < 25 ? "bg-red-500" : "bg-emerald-500"}`}
                      style={{ width: `${item.level}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => notify("Inventory management requires a connected stock module.")}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              <Package size={16} />
              Manage inventory
            </button>
          </article>
        </section>

        {/* Orders table */}
        <section
          id="recent-orders"
          className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm"
        >
          <div className="flex flex-col justify-between gap-4 border-b border-slate-100 p-5 sm:flex-row sm:items-center sm:p-6">
            <div>
              <h2 className="font-bold text-slate-900">Recent Orders</h2>
              <p className="mt-1 text-sm text-slate-500">
                Track orders from the restaurant and room service.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <label className="flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2.5">
                <Search size={16} className="text-slate-400" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search orders..."
                  className="w-32 bg-transparent text-sm outline-none sm:w-40"
                />
              </label>
              <select
                value={orderFilter}
                onChange={(e) => setOrderFilter(e.target.value)}
                className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-blue-500"
              >
                {["All", "Pending", "Preparing", "Completed", "Cancelled"].map((status) => (
                  <option key={status}>{status}</option>
                ))}
              </select>
              <button
                onClick={() => setShowAllOrders((value) => !value)}
                className="rounded-xl px-3 py-2.5 text-sm font-semibold text-blue-600 hover:bg-blue-50"
              >
                {showAllOrders ? "Show less" : "View all"} <ArrowUpRight className="ml-1 inline" size={15} />
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[960px] text-left">
              <thead>
                <tr className="bg-slate-50 text-[11px] uppercase tracking-wider text-slate-400">
                  <th className="px-6 py-4 font-semibold">Order</th>
                  <th className="px-6 py-4 font-semibold">Customer</th>
                  <th className="px-6 py-4 font-semibold">Order details</th>
                  <th className="px-6 py-4 font-semibold">Type / Table</th>
                  <th className="px-6 py-4 font-semibold">Amount</th>
                  <th className="px-6 py-4 font-semibold">Payment</th>
                  <th className="px-6 py-4 font-semibold">Status</th>
                  <th className="px-6 py-4 font-semibold">Action</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {(showAllOrders ? filteredOrders : filteredOrders.slice(0, 4)).map((order) => (
                  <tr key={order.id} className="transition hover:bg-slate-50/70">
                    <td className="px-6 py-4">
                      <span className="text-sm font-bold text-blue-600">{order.id}</span>
                      <p className="mt-1 text-xs text-slate-400">{order.time}</p>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-slate-800">
                      {order.customer}
                    </td>
                    <td className="max-w-48 px-6 py-4 text-sm text-slate-500">
                      {order.items}
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-slate-700">{order.type}</p>
                      <p className="mt-1 text-xs text-slate-400">{order.table}</p>
                    </td>
                    <td className="px-6 py-4 text-sm font-semibold text-slate-900">
                      {money(order.amount)}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-500">{order.payment}</td>
                    <td className="px-6 py-4"><StatusBadge status={order.status} /></td>
                    <td className="px-6 py-4">
                      {order.status === "Pending" || order.status === "Preparing" ? (
                        <button
                          onClick={() => changeOrderStatus(order.id, "Completed")}
                          className="whitespace-nowrap rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700"
                        >
                          Mark complete
                        </button>
                      ) : (
                        <span className="text-xs text-slate-400">—</span>
                      )}
                    </td>
                  </tr>
                ))}

                {filteredOrders.length === 0 && (
                  <tr>
                    <td colSpan={8} className="px-6 py-12 text-center text-sm text-slate-400">
                      No orders match your search.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 px-6 py-4">
            <p className="text-xs text-slate-400">
              Showing {Math.min(showAllOrders ? filteredOrders.length : 4, filteredOrders.length)} of {filteredOrders.length} orders
            </p>
            <button
              onClick={downloadReport}
              className="flex items-center gap-2 text-xs font-semibold text-blue-600 hover:text-blue-800"
            >
              <Download size={14} /> Export orders
            </button>
          </div>
        </section>

        {/* Popular menu and payments */}
        <section className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <article className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm sm:p-6">
            <SectionTitle
              title="Best-Selling Menu Items"
              description="Popular products for the current reporting period."
              action={<TrendingUp size={19} className="text-emerald-600" />}
            />

            <div className="space-y-5">
              {popularItems.map((item, index) => (
                <div key={item.name}>
                  <div className="mb-2 flex items-center justify-between gap-3">
                    <div className="flex min-w-0 items-center gap-3">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-xs font-bold text-slate-500">
                        {index + 1}
                      </span>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-slate-800">{item.name}</p>
                        <p className="mt-0.5 text-xs text-slate-400">{item.sold} sold</p>
                      </div>
                    </div>
                    <p className="shrink-0 text-sm font-semibold text-slate-800">{money(item.revenue)}</p>
                  </div>
                  <div className="ml-11 h-2 rounded-full bg-slate-100">
                    <div className="h-2 rounded-full bg-blue-500" style={{ width: item.width }} />
                  </div>
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm sm:p-6">
            <SectionTitle
              title="Payment Summary"
              description="Illustrative breakdown by payment method."
              action={<CreditCard size={19} className="text-blue-600" />}
            />

            <div className="space-y-5">
              {[
                { name: "M-Pesa", value: 52, amount: 438200, icon: SmartphoneIcon, color: "bg-emerald-500" },
                { name: "Cash", value: 28, amount: 236656, icon: Banknote, color: "bg-blue-500" },
                { name: "Card", value: 20, amount: 170344, icon: CreditCard, color: "bg-violet-500" },
              ].map((payment) => (
                <div key={payment.name}>
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="rounded-lg bg-slate-50 p-2 text-slate-600">
                        <payment.icon size={19} />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-800">{payment.name}</p>
                        <p className="mt-0.5 text-xs text-slate-400">{payment.value}% of recorded revenue</p>
                      </div>
                    </div>
                    <p className="text-sm font-semibold text-slate-900">{money(payment.amount)}</p>
                  </div>
                  <div className="mt-3 h-2 rounded-full bg-slate-100">
                    <div className={`h-2 rounded-full ${payment.color}`} style={{ width: `${payment.value}%` }} />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-xl border border-slate-100 bg-slate-50 p-4">
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-800">
                <BellRing size={17} className="text-blue-600" />
                Daily operations reminder
              </div>
              <p className="mt-1 text-sm leading-6 text-slate-500">
                Review pending payments, replenish low-stock ingredients, and confirm room cleaning before new guest check-ins.
              </p>
            </div>
          </article>
        </section>

        <footer className="flex flex-col justify-between gap-2 pb-3 text-xs text-slate-400 sm:flex-row">
          <p>Hotel & Restaurant Management System</p>
          <p>Dashboard prototype · Amounts shown in Kenyan Shillings</p>
        </footer>
      </main>

      {/* Add product */}
      {modal === "product" && (
        <Modal
          title="Add food product"
          description="Register a new item in your restaurant menu."
          onClose={closeModal}
        >
          <form onSubmit={addProduct} className="space-y-4">
            <label className="block text-sm font-medium text-slate-700">
              Product name
              <input
                required
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                placeholder="e.g. Grilled Chicken"
                className="mt-1.5 w-full rounded-xl border border-slate-200 px-3 py-2.5 outline-none focus:border-blue-500"
              />
            </label>
            <label className="block text-sm font-medium text-slate-700">
              Selling price (KSh)
              <input
                required
                min="1"
                type="number"
                value={productPrice}
                onChange={(e) => setProductPrice(e.target.value)}
                placeholder="850"
                className="mt-1.5 w-full rounded-xl border border-slate-200 px-3 py-2.5 outline-none focus:border-blue-500"
              />
            </label>
            <button className="w-full rounded-xl bg-blue-600 py-3 text-sm font-semibold text-white hover:bg-blue-700">
              Add product
            </button>
          </form>
        </Modal>
      )}

      {/* Add employee */}
      {modal === "employee" && (
        <Modal
          title="Create new employee"
          description="Register a staff member in the demo."
          onClose={closeModal}
        >
          <form onSubmit={addEmployee} className="space-y-4">
            <label className="block text-sm font-medium text-slate-700">
              Full name
              <input
                required
                value={employeeName}
                onChange={(e) => setEmployeeName(e.target.value)}
                placeholder="Enter employee name"
                className="mt-1.5 w-full rounded-xl border border-slate-200 px-3 py-2.5 outline-none focus:border-blue-500"
              />
            </label>
            <label className="block text-sm font-medium text-slate-700">
              Job role
              <select
                value={employeeRole}
                onChange={(e) => setEmployeeRole(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 outline-none focus:border-blue-500"
              >
                <option>Waiter / Waitress</option>
                <option>Chef</option>
                <option>Receptionist</option>
                <option>Housekeeping</option>
                <option>Cashier</option>
                <option>Supervisor</option>
                <option>Manager</option>
              </select>
            </label>
            <button className="w-full rounded-xl bg-blue-600 py-3 text-sm font-semibold text-white hover:bg-blue-700">
              Create employee
            </button>
          </form>
        </Modal>
      )}

      {/* Reports */}
      {modal === "report" && (
        <Modal
          title="Generate sales report"
          description="Export the current sample order records."
          onClose={closeModal}
        >
          <div className="mb-5 rounded-xl bg-blue-50 p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-white p-2 text-blue-600">
                <FileText size={22} />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-800">Orders report</p>
                <p className="mt-1 text-xs text-slate-500">
                  CSV file · Order details and payment statuses
                </p>
              </div>
            </div>
          </div>
          <button
            onClick={downloadReport}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 text-sm font-semibold text-white hover:bg-blue-700"
          >
            <Download size={17} /> Download CSV
          </button>
        </Modal>
      )}

      {/* Settings */}
      {modal === "settings" && (
        <Modal
          title="Dashboard settings"
          description="Example hotel configuration options."
          onClose={closeModal}
        >
          <form
            onSubmit={(e) => {
              e.preventDefault();
              notify("Demo settings saved.");
              closeModal();
            }}
            className="space-y-4"
          >
            <label className="block text-sm font-medium text-slate-700">
              Hotel name
              <input
                defaultValue="StayServe Hotel"
                className="mt-1.5 w-full rounded-xl border border-slate-200 px-3 py-2.5 outline-none focus:border-blue-500"
              />
            </label>
            <label className="block text-sm font-medium text-slate-700">
              Currency
              <select
                defaultValue="KSh"
                className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 outline-none focus:border-blue-500"
              >
                <option>KSh</option>
                <option>USD</option>
                <option>EUR</option>
              </select>
            </label>
            <button className="w-full rounded-xl bg-blue-600 py-3 text-sm font-semibold text-white hover:bg-blue-700">
              Save settings
            </button>
          </form>
        </Modal>
      )}

      {/* Table details */}
      {modal === "table" && selectedTable && (
        <Modal
          title={`Table ${selectedTable.id}`}
          description={`${selectedTable.seats} seats · Restaurant floor`}
          onClose={() => {
            closeModal();
            setSelectedTable(null);
          }}
        >
          <div className="mb-5 rounded-xl bg-slate-50 p-4">
            <p className="text-sm text-slate-500">Current status</p>
            <div className="mt-2">
              <StatusBadge status={selectedTable.status} />
            </div>
            <p className="mt-4 text-sm text-slate-600">
              Current order: {selectedTable.order || "No active order"}
            </p>
          </div>

          <label className="block text-sm font-medium text-slate-700">
            Change table status
            <select
              value={selectedTable.status}
              onChange={(e) => {
                const newStatus = e.target.value;
                setTables((current) =>
                  current.map((table) =>
                    table.id === selectedTable.id
                      ? {
                          ...table,
                          status: newStatus,
                          order: newStatus === "Available" || newStatus === "Cleaning"
                            ? ""
                            : table.order,
                        }
                      : table
                  )
                );
                setSelectedTable((current) => ({
                  ...current,
                  status: newStatus,
                  order: newStatus === "Available" || newStatus === "Cleaning"
                    ? ""
                    : current.order,
                }));
              }}
              className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 outline-none focus:border-blue-500"
            >
              <option>Available</option>
              <option>Occupied</option>
              <option>Cleaning</option>
            </select>
          </label>

          <button
            onClick={() => {
              notify(`${selectedTable.id} status updated.`);
              closeModal();
              setSelectedTable(null);
            }}
            className="mt-5 w-full rounded-xl bg-blue-600 py-3 text-sm font-semibold text-white hover:bg-blue-700"
          >
            Done
          </button>
        </Modal>
      )}
    </div>
  );
}

function PackagePlusIcon(props) {
  return <Package {...props} />;
}

function SmartphoneIcon(props) {
  return <CreditCard {...props} />;
}
