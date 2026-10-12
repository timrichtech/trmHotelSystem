
import { useState } from "react";
import {
  LayoutDashboard,
  Building2,
  Package,
  Utensils,
  ShoppingCart,
  Warehouse,
  ChartNoAxesCombined,
  Settings,
  Menu,
  X,
  Search,
  Bell,
  ChevronDown,
  BedDouble,
  Users,
  DollarSign,
  CalendarCheck,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  CheckCircle2,
  CircleAlert,
  Plus,
  MoreHorizontal,
  LogOut,
} from "lucide-react";

const navigation = [
  { label: "Dashboard", icon: LayoutDashboard },
  { label: "Organization", icon: Building2 },
  { label: "Products", icon: Package },
  { label: "Menu", icon: Utensils },
  { label: "Orders", icon: ShoppingCart },
  { label: "Inventory", icon: Warehouse },
  { label: "Sales", icon: ChartNoAxesCombined },
  { label: "Settings", icon: Settings },
];

const stats = [
  {
    label: "Total Revenue",
    value: "$24,680",
    change: "+12.8%",
    positive: true,
    icon: DollarSign,
    color: "bg-emerald-50 text-emerald-700",
  },
  {
    label: "Room Bookings",
    value: "186",
    change: "+8.2%",
    positive: true,
    icon: CalendarCheck,
    color: "bg-blue-50 text-blue-700",
  },
  {
    label: "Occupancy Rate",
    value: "78.4%",
    change: "+5.4%",
    positive: true,
    icon: BedDouble,
    color: "bg-violet-50 text-violet-700",
  },
  {
    label: "Total Guests",
    value: "342",
    change: "-2.1%",
    positive: false,
    icon: Users,
    color: "bg-amber-50 text-amber-700",
  },
];

const bookings = [
  {
    name: "James Anderson",
    room: "Deluxe Suite",
    date: "Oct 11, 2026",
    amount: "$320",
    status: "Checked In",
  },
  {
    name: "Sarah Mitchell",
    room: "Standard Room",
    date: "Oct 11, 2026",
    amount: "$180",
    status: "Confirmed",
  },
  {
    name: "Michael Brown",
    room: "Executive Suite",
    date: "Oct 12, 2026",
    amount: "$450",
    status: "Pending",
  },
  {
    name: "Emily Wilson",
    room: "Deluxe Room",
    date: "Oct 12, 2026",
    amount: "$260",
    status: "Confirmed",
  },
  {
    name: "Daniel Smith",
    room: "Standard Room",
    date: "Oct 13, 2026",
    amount: "$150",
    status: "Checked Out",
  },
];

const weeklyRevenue = [
  { day: "Mon", value: 48 },
  { day: "Tue", value: 72 },
  { day: "Wed", value: 56 },
  { day: "Thu", value: 88 },
  { day: "Fri", value: 65 },
  { day: "Sat", value: 96 },
  { day: "Sun", value: 78 },
];

function StatusBadge({ status }) {
  const styles = {
    "Checked In": "bg-emerald-50 text-emerald-700",
    Confirmed: "bg-blue-50 text-blue-700",
    Pending: "bg-amber-50 text-amber-700",
    "Checked Out": "bg-gray-100 text-gray-600",
  };

  return (
    <span
      className={`inline-flex whitespace-nowrap rounded-full px-3 py-1 text-xs font-medium ${
        styles[status] || "bg-gray-100 text-gray-600"
      }`}
    >
      {status}
    </span>
  );
}

function Sidebar({ active, setActive, open, setOpen }) {
  return (
    <>
      {open && (
        <button
          aria-label="Close navigation"
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-[270px] flex-col border-r border-gray-200 bg-white transition-transform duration-300 lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-[82px] shrink-0 items-center justify-between border-b border-gray-100 px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-600 text-2xl font-black text-white">
              R
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900">
                TRM Hot system
              </h1>
              <p className="text-xs text-gray-500">
                Hotel Management
              </p>
            </div>
          </div>

          <button
            onClick={() => setOpen(false)}
            className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 lg:hidden"
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>

        <div className="px-4 pt-7">
          <p className="mb-3 px-3 text-[11px] font-bold uppercase tracking-[0.16em] text-gray-400">
            Main menu
          </p>

          <nav className="space-y-1">
            {navigation.map(({ label, icon: Icon }) => {
              const selected = active === label;

              return (
                <button
                  key={label}
                  onClick={() => {
                    setActive(label);
                    setOpen(false);
                  }}
                  className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition ${
                    selected
                      ? "bg-green-600 text-white shadow-md shadow-green-600/20"
                      : "text-gray-600 hover:bg-green-50 hover:text-green-700"
                  }`}
                >
                  <Icon size={20} strokeWidth={1.9} />
                  <span>{label}</span>
                  {selected && (
                    <span className="ml-auto h-1.5 w-1.5 rounded-full bg-white" />
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="mt-auto p-4">
          <div className="rounded-2xl bg-green-50 p-4">
            <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-lg bg-white text-green-700">
              <BedDouble size={19} />
            </div>
            <p className="text-sm font-semibold text-gray-800">
              Need assistance?
            </p>
            <p className="mt-1 text-xs leading-5 text-gray-500">
              Manage your hotel operations with ease.
            </p>
            <button className="mt-3 text-xs font-semibold text-green-700 hover:underline">
              Help & support →
            </button>
          </div>

          <button className="mt-4 flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm text-gray-600 hover:bg-gray-100">
            <LogOut size={19} />
            Sign out
          </button>

          <p className="px-3 pb-1 pt-2 text-xs text-gray-400">
            TRM Hotel System · v1.0
          </p>
        </div>
      </aside>
    </>
  );
}

function StatCard({ stat }) {
  const Icon = stat.icon;
  const ChangeIcon = stat.positive ? ArrowUpRight : ArrowDownRight;

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <div
          className={`flex h-11 w-11 items-center justify-center rounded-xl ${stat.color}`}
        >
          <Icon size={21} />
        </div>
        <span
          className={`flex items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold ${
            stat.positive
              ? "bg-green-50 text-green-700"
              : "bg-red-50 text-red-600"
          }`}
        >
          <ChangeIcon size={14} />
          {stat.change}
        </span>
      </div>

      <p className="mt-5 text-sm text-gray-500">{stat.label}</p>
      <h3 className="mt-1 text-2xl font-bold tracking-tight text-gray-900">
        {stat.value}
      </h3>
      <p className="mt-2 text-xs text-gray-400">
        Compared with last month
      </p>
    </div>
  );
}

function RevenueChart() {
  return (
    <div className="mt-6">
      <div className="mb-4 flex items-center justify-between text-xs text-gray-400">
        <span>$10k</span>
        <span>$7.5k</span>
        <span>$5k</span>
        <span>$2.5k</span>
        <span>$0</span>
      </div>

      <div className="relative flex h-52 items-end justify-between gap-2 border-b border-gray-100 pb-0">
        <div className="pointer-events-none absolute inset-0 flex flex-col justify-between pb-1">
          {[0, 1, 2, 3].map((line) => (
            <div key={line} className="border-t border-dashed border-gray-100" />
          ))}
        </div>

        {weeklyRevenue.map((item) => (
          <div
            key={item.day}
            className="relative z-10 flex h-full flex-1 flex-col items-center justify-end"
          >
            <div
              title={`${item.day}: ${item.value}%`}
              className={`w-full max-w-10 rounded-t-lg transition hover:opacity-80 ${
                item.day === "Sat" ? "bg-green-700" : "bg-green-500"
              }`}
              style={{ height: `${item.value}%` }}
            />
          </div>
        ))}
      </div>

      <div className="mt-3 flex justify-between">
        {weeklyRevenue.map((item) => (
          <span
            key={item.day}
            className="flex-1 text-center text-xs text-gray-400"
          >
            {item.day}
          </span>
        ))}
      </div>
    </div>
  );
}

function DashboardContent() {
  const [query, setQuery] = useState("");
  const [period, setPeriod] = useState("This week");

  const filteredBookings = bookings.filter((booking) =>
    `${booking.name} ${booking.room} ${booking.status}`
      .toLowerCase()
      .includes(query.toLowerCase())
  );

  return (
    <>
      <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm text-gray-500">
            Welcome back, Administrator 👋
          </p>
          <h2 className="mt-1 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            Dashboard Overview
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            Here’s what’s happening at your hotel today.
          </p>
        </div>

        <button
          onClick={() => window.print()}
          className="inline-flex items-center justify-center gap-2 self-start rounded-xl bg-green-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-green-700"
        >
          <Plus size={18} />
          Export / Print
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <StatCard key={stat.label} stat={stat} />
        ))}
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-3">
        <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm xl:col-span-2 sm:p-6">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h3 className="font-bold text-gray-900">
                Revenue Overview
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Revenue performance across the week
              </p>
            </div>

            <select
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-600 outline-none focus:border-green-600"
            >
              <option>This week</option>
              <option>This month</option>
              <option>This year</option>
            </select>
          </div>

          <div className="mt-5">
            <p className="text-3xl font-bold text-gray-900">$8,420</p>
            <p className="mt-1 flex items-center gap-1 text-xs text-green-700">
              <ArrowUpRight size={15} />
              12.8% increase
              <span className="text-gray-400">in {period.toLowerCase()}</span>
            </p>
          </div>

          <RevenueChart />
        </section>

        <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-gray-900">
                Room Occupancy
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Current room status
              </p>
            </div>
            <button aria-label="More occupancy options" className="rounded-lg p-2 text-gray-400 hover:bg-gray-100">
              <MoreHorizontal size={20} />
            </button>
          </div>

          <div className="flex justify-center py-6">
            <div
              className="relative flex h-40 w-40 items-center justify-center rounded-full"
              style={{
                background:
                  "conic-gradient(#16a34a 0% 78.4%, #e5e7eb 78.4% 100%)",
              }}
            >
              <div className="flex h-28 w-28 flex-col items-center justify-center rounded-full bg-white">
                <span className="text-3xl font-bold text-gray-900">
                  78.4%
                </span>
                <span className="mt-1 text-xs text-gray-400">
                  Occupancy
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {[
              { label: "Occupied", count: 78, color: "bg-green-600" },
              { label: "Available", count: 22, color: "bg-gray-300" },
            ].map((item) => (
              <div key={item.label}>
                <div className="mb-2 flex justify-between text-sm">
                  <span className="text-gray-500">{item.label}</span>
                  <span className="font-semibold text-gray-800">
                    {item.count}%
                  </span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-gray-100">
                  <div
                    className={`h-full rounded-full ${item.color}`}
                    style={{ width: `${item.count}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-5 grid grid-cols-2 gap-3">
            <div className="rounded-xl bg-green-50 p-3">
              <p className="text-xs text-gray-500">Occupied rooms</p>
              <p className="mt-1 text-xl font-bold text-green-700">78</p>
            </div>
            <div className="rounded-xl bg-gray-50 p-3">
              <p className="text-xs text-gray-500">Available rooms</p>
              <p className="mt-1 text-xl font-bold text-gray-800">22</p>
            </div>
          </div>
        </section>
      </div>

      <section className="mt-6 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
        <div className="flex flex-col gap-4 border-b border-gray-100 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <div>
            <h3 className="font-bold text-gray-900">
              Recent Bookings
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Keep track of your latest guest reservations.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="relative">
              <Search
                size={17}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search bookings..."
                className="w-full rounded-xl border border-gray-200 py-2.5 pl-9 pr-3 text-sm outline-none focus:border-green-600 sm:w-56"
              />
            </div>

            <button className="rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50">
              View all bookings
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left">
            <thead className="bg-gray-50/80">
              <tr className="text-xs uppercase tracking-wider text-gray-400">
                <th className="px-6 py-4 font-semibold">Guest</th>
                <th className="px-6 py-4 font-semibold">Room type</th>
                <th className="px-6 py-4 font-semibold">Check-in</th>
                <th className="px-6 py-4 font-semibold">Amount</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {filteredBookings.map((booking) => (
                <tr key={booking.name} className="transition hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-50 text-sm font-bold text-green-700">
                        {booking.name
                          .split(" ")
                          .map((part) => part[0])
                          .join("")}
                      </div>
                      <span className="whitespace-nowrap text-sm font-semibold text-gray-800">
                        {booking.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {booking.room}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                    {booking.date}
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold text-gray-800">
                    {booking.amount}
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge status={booking.status} />
                  </td>
                  <td className="px-6 py-4">
                    <button
                      className="rounded-lg p-2 text-gray-400 hover:bg-green-50 hover:text-green-700"
                      aria-label={`View ${booking.name}`}
                    >
                      <MoreHorizontal size={19} />
                    </button>
                  </td>
                </tr>
              ))}

              {filteredBookings.length === 0 && (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center text-sm text-gray-500">
                    No bookings match your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="border-t border-gray-100 px-6 py-4 text-xs text-gray-400">
          Showing {filteredBookings.length} of {bookings.length} bookings
        </div>
      </section>

      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="flex items-start gap-3 rounded-2xl border border-gray-100 bg-white p-5">
          <div className="rounded-xl bg-blue-50 p-3 text-blue-700">
            <Clock size={21} />
          </div>
          <div>
            <p className="text-sm text-gray-500">Pending check-ins</p>
            <p className="mt-1 text-xl font-bold text-gray-900">12 guests</p>
            <p className="mt-1 text-xs text-gray-400">Scheduled for today</p>
          </div>
        </div>

        <div className="flex items-start gap-3 rounded-2xl border border-gray-100 bg-white p-5">
          <div className="rounded-xl bg-green-50 p-3 text-green-700">
            <CheckCircle2 size={21} />
          </div>
          <div>
            <p className="text-sm text-gray-500">Completed check-ins</p>
            <p className="mt-1 text-xl font-bold text-gray-900">24 guests</p>
            <p className="mt-1 text-xs text-gray-400">Today’s arrivals</p>
          </div>
        </div>

        <div className="flex items-start gap-3 rounded-2xl border border-gray-100 bg-white p-5">
          <div className="rounded-xl bg-amber-50 p-3 text-amber-700">
            <CircleAlert size={21} />
          </div>
          <div>
            <p className="text-sm text-gray-500">Pending orders</p>
            <p className="mt-1 text-xl font-bold text-gray-900">08 orders</p>
            <p className="mt-1 text-xs text-gray-400">Restaurant & room service</p>
          </div>
        </div>
      </div>

      <footer className="py-8 text-center text-xs text-gray-400">
        © 2026 TRM Hotel Management System. All rights reserved.
      </footer>
    </>
  );
}

export default function Dashboard() {
  const [active, setActive] = useState("Dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#f7f9f8] text-gray-800">
      <Sidebar
        active={active}
        setActive={setActive}
        open={sidebarOpen}
        setOpen={setSidebarOpen}
      />

      <div className="min-h-screen lg:pl-[270px]">
        <header className="sticky top-0 z-30 flex h-[76px] items-center justify-between border-b border-gray-200 bg-white/95 px-4 backdrop-blur sm:px-6 lg:px-8">
          <div className="flex min-w-0 items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="rounded-xl p-2 text-gray-600 hover:bg-gray-100 lg:hidden"
              aria-label="Open navigation"
            >
              <Menu size={23} />
            </button>

            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-gray-800">
                {active}
              </p>
              <p className="hidden text-xs text-gray-400 sm:block">
                Hotel management / {active}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <div className="relative">
              <button
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="relative rounded-xl border border-gray-100 p-2.5 text-gray-500 hover:bg-gray-50"
                aria-label="Notifications"
              >
                <Bell size={19} />
                <span className="absolute right-2 top-2 h-2 w-2 rounded-full border-2 border-white bg-red-500" />
              </button>

              {notificationsOpen && (
                <div className="absolute right-0 top-14 w-64 rounded-xl border border-gray-100 bg-white p-4 shadow-xl">
                  <p className="font-semibold text-gray-900">
                    Notifications
                  </p>
                  <p className="mt-3 text-sm text-gray-500">
                    You have 3 new booking updates.
                  </p>
                  <button
                    onClick={() => setNotificationsOpen(false)}
                    className="mt-3 text-sm font-medium text-green-700"
                  >
                    Close
                  </button>
                </div>
              )}
            </div>

            <div className="hidden h-9 w-px bg-gray-200 sm:block" />

            <button className="flex items-center gap-2 rounded-xl p-1.5 hover:bg-gray-50">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-green-600 text-sm font-bold text-white">
                A
              </div>
              <div className="hidden text-left sm:block">
                <p className="text-sm font-semibold text-gray-800">
                  Administrator
                </p>
                <p className="text-xs text-gray-400">Hotel Manager</p>
              </div>
              <ChevronDown size={16} className="hidden text-gray-400 sm:block" />
            </button>
          </div>
        </header>

        <main className="mx-auto max-w-[1600px] p-4 sm:p-6 lg:p-8">
          {active === "Dashboard" ? (
            <DashboardContent />
          ) : (
            <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm sm:p-12">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-50 text-green-700">
                {(() => {
                  const Item = navigation.find(
                    (item) => item.label === active
                  );
                  const Icon = Item?.icon || LayoutDashboard;
                  return <Icon size={28} />;
                })()}
              </div>

              <h2 className="mt-5 text-2xl font-bold text-gray-900">
                {active}
              </h2>
              <p className="mt-2 max-w-lg text-sm leading-6 text-gray-500">
                This section is ready for your {active.toLowerCase()} features.
                Connect it to your application data and workflows to manage
                hotel operations.
              </p>

              <button
                onClick={() => setActive("Dashboard")}
                className="mt-6 rounded-xl bg-green-600 px-5 py-3 text-sm font-semibold text-white hover:bg-green-700"
              >
                Back to Dashboard
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}