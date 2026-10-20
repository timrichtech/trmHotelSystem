
import { useState } from "react";
import {
  Armchair,
  Users,
  Receipt,
  CreditCard,
  CheckCircle2,
  ChevronDown,
  Plus,
  Minus,
  X,
  Utensils,
  UserRound,
  Clock,
} from "lucide-react";

const initialTables = [
  {
    id: 1,
    capacity: 2,
    status: "Occupied",
    servedBy: "Brian",
    order: [
      { id: 1, name: "Chicken Burger", qty: 2, price: 650 },
      { id: 2, name: "Fresh Juice", qty: 2, price: 250 },
    ],
  },
  {
    id: 2,
    capacity: 4,
    status: "Occupied",
    servedBy: "Mary",
    order: [
      { id: 3, name: "Grilled Chicken", qty: 1, price: 950 },
      { id: 4, name: "Soda", qty: 2, price: 150 },
    ],
  },
  {
    id: 3,
    capacity: 6,
    status: "Available",
    servedBy: "",
    order: [],
  },
  {
    id: 4,
    capacity: 4,
    status: "Reserved",
    servedBy: "Kevin",
    order: [],
  },
  {
    id: 5,
    capacity: 2,
    status: "Occupied",
    servedBy: "Brian",
    order: [{ id: 5, name: "Beef Steak", qty: 1, price: 1200 }],
  },
  {
    id: 6,
    capacity: 6,
    status: "Cleaning",
    servedBy: "",
    order: [],
  },
];

const staffMembers = ["Brian", "Mary", "Kevin", "Sarah", "James"];

const money = (amount) =>
  new Intl.NumberFormat("en-KE", {
    style: "currency",
    currency: "KES",
    maximumFractionDigits: 0,
  }).format(amount);

export default function TableDetails() {
  const [tables, setTables] = useState(initialTables);
  const [selectedId, setSelectedId] = useState(1);
  const [showOrder, setShowOrder] = useState(true);
  const [showCheckout, setShowCheckout] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("M-Pesa");
  const [serviceCharge, setServiceCharge] = useState(0);

  const selectedTable = tables.find((table) => table.id === selectedId);

  const subtotal = selectedTable
    ? selectedTable.order.reduce(
        (total, item) => total + item.price * item.qty,
        0
      )
    : 0;

  const total = subtotal + serviceCharge;

  function updateTable(id, updates) {
    setTables((current) =>
      current.map((table) =>
        table.id === id ? { ...table, ...updates } : table
      )
    );
  }

  function updateQuantity(itemId, change) {
    if (!selectedTable) return;

    const updatedOrder = selectedTable.order
      .map((item) =>
        item.id === itemId
          ? { ...item, qty: item.qty + change }
          : item
      )
      .filter((item) => item.qty > 0);

    updateTable(selectedId, { order: updatedOrder });
  }

  function addDemoItem() {
    if (!selectedTable) return;

    if (selectedTable.status === "Available") {
      updateTable(selectedId, { status: "Occupied" });
    }

    const newItem = {
      id: Date.now(),
      name: "House Special",
      qty: 1,
      price: 500,
    };

    updateTable(selectedId, {
      status: "Occupied",
      order: [...selectedTable.order, newItem],
    });
  }

  function checkout() {
    if (!selectedTable || subtotal <= 0) return;

    updateTable(selectedId, {
      status: "Cleaning",
      order: [],
      servedBy: "",
    });

    setShowCheckout(false);
    setServiceCharge(0);
  }

  if (!selectedTable) return null;

  const statusColors = {
    Available: "bg-emerald-50 text-emerald-700",
    Occupied: "bg-rose-50 text-rose-700",
    Reserved: "bg-amber-50 text-amber-700",
    Cleaning: "bg-slate-100 text-slate-600",
  };

  return (
    <section className="w-full max-w-2xl rounded-2xl border border-slate-200 bg-white p-4 text-slate-800 shadow-sm sm:p-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm text-slate-500">Restaurant operations</p>
          <h2 className="mt-1 text-2xl font-bold">Table details</h2>
          <p className="mt-1 text-sm text-slate-500">
            Manage seating, orders and payments.
          </p>
        </div>

        <span className="rounded-xl bg-emerald-50 p-3 text-emerald-600">
          <Armchair size={23} />
        </span>
      </div>

      {/* Table selector */}
      <div className="mt-6">
        <div className="mb-3 flex items-center justify-between">
          <label className="text-sm font-semibold">Select table</label>
          <span className="text-xs text-slate-400">
            {tables.length} tables
          </span>
        </div>

        <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
          {tables.map((table) => (
            <button
              key={table.id}
              onClick={() => {
                setSelectedId(table.id);
                setShowCheckout(false);
              }}
              className={`flex min-w-0 flex-col items-center rounded-xl border-2 p-3 transition hover:-translate-y-0.5 ${
                selectedId === table.id
                  ? "border-emerald-500 bg-emerald-50 ring-2 ring-emerald-100"
                  : "border-slate-100 bg-slate-50 hover:border-slate-300"
              }`}
            >
              <span className="text-xl font-bold">{table.id}</span>
              <span className="mt-1 text-[10px] text-slate-500">
                {table.capacity} seats
              </span>
              <span
                className={`mt-2 h-2 w-2 rounded-full ${
                  table.status === "Available"
                    ? "bg-emerald-500"
                    : table.status === "Occupied"
                    ? "bg-rose-500"
                    : table.status === "Reserved"
                    ? "bg-amber-500"
                    : "bg-slate-400"
                }`}
              />
            </button>
          ))}
        </div>
      </div>

      {/* Selected table summary */}
      <div className="mt-6 rounded-2xl bg-slate-50 p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-xl font-bold shadow-sm">
              {selectedTable.id}
            </div>
            <div>
              <h3 className="font-bold">Table {selectedTable.id}</h3>
              <span
                className={`mt-1 inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${
                  statusColors[selectedTable.status]
                }`}
              >
                {selectedTable.status}
              </span>
            </div>
          </div>

          <div className="text-right">
            <p className="text-xs text-slate-500">Current bill</p>
            <p className="mt-1 text-xl font-bold">{money(total)}</p>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className="rounded-xl border border-slate-200 bg-white p-3">
            <div className="flex items-center gap-2 text-slate-500">
              <Users size={16} />
              <span className="text-xs">Capacity</span>
            </div>
            <p className="mt-2 font-semibold">
              {selectedTable.capacity} guests
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-3">
            <div className="flex items-center gap-2 text-slate-500">
              <UserRound size={16} />
              <span className="text-xs">Served by</span>
            </div>

            <select
              value={selectedTable.servedBy}
              onChange={(event) =>
                updateTable(selectedId, { servedBy: event.target.value })
              }
              className="mt-2 w-full bg-transparent text-sm font-semibold outline-none"
            >
              <option value="">Unassigned</option>
              {staffMembers.map((member) => (
                <option key={member} value={member}>
                  {member}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-3">
          <label className="mb-2 block text-xs font-semibold text-slate-500">
            Change table status
          </label>
          <select
            value={selectedTable.status}
            onChange={(event) =>
              updateTable(selectedId, { status: event.target.value })
            }
            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm outline-none focus:border-emerald-500"
          >
            {["Available", "Occupied", "Reserved", "Cleaning"].map(
              (status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              )
            )}
          </select>
        </div>
      </div>

      {/* Order heading */}
      <div className="mt-6 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Receipt size={19} className="text-emerald-600" />
          <h3 className="font-bold">Order & bill</h3>
          <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-600">
            {selectedTable.order.length} items
          </span>
        </div>

        <button
          onClick={() => setShowOrder((current) => !current)}
          className="flex items-center gap-1 text-sm font-medium text-slate-500 hover:text-slate-900"
        >
          {showOrder ? "Hide" : "View"}
          <ChevronDown
            size={16}
            className={`transition ${showOrder ? "rotate-180" : ""}`}
          />
        </button>
      </div>

      {showOrder && (
        <div className="mt-4">
          {selectedTable.order.length > 0 ? (
            <div className="space-y-3">
              {selectedTable.order.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between gap-3 rounded-xl border border-slate-100 p-3"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold">
                      {item.name}
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      {money(item.price)} each
                    </p>
                  </div>

                  <div className="flex shrink-0 items-center gap-2">
                    <button
                      onClick={() => updateQuantity(item.id, -1)}
                      aria-label={`Remove one ${item.name}`}
                      className="rounded-lg border border-slate-200 p-1.5 hover:bg-slate-100"
                    >
                      <Minus size={14} />
                    </button>

                    <span className="w-5 text-center text-sm font-semibold">
                      {item.qty}
                    </span>

                    <button
                      onClick={() => updateQuantity(item.id, 1)}
                      aria-label={`Add one ${item.name}`}
                      className="rounded-lg border border-slate-200 p-1.5 hover:bg-slate-100"
                    >
                      <Plus size={14} />
                    </button>

                    <span className="w-20 text-right text-sm font-bold">
                      {money(item.price * item.qty)}
                    </span>
                  </div>
                </div>
              ))}

              <button
                onClick={addDemoItem}
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-slate-300 py-3 text-sm font-semibold text-slate-600 transition hover:border-emerald-400 hover:bg-emerald-50 hover:text-emerald-700"
              >
                <Plus size={16} />
                Add demo item · KES 500
              </button>
            </div>
          ) : (
            <div className="rounded-xl border border-dashed border-slate-200 py-7 text-center">
              <Utensils size={25} className="mx-auto text-slate-300" />
              <p className="mt-2 text-sm font-medium">No active order</p>
              <p className="mt-1 text-xs text-slate-500">
                Add an item to start a bill.
              </p>
              <button
                onClick={addDemoItem}
                className="mt-4 inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-700"
              >
                <Plus size={16} />
                Add demo item
              </button>
            </div>
          )}

          {/* Bill totals */}
          <div className="mt-5 space-y-3 rounded-xl bg-slate-50 p-4">
            <div className="flex justify-between text-sm text-slate-500">
              <span>Subtotal</span>
              <span>{money(subtotal)}</span>
            </div>

            <div className="flex items-center justify-between gap-3 text-sm text-slate-500">
              <label htmlFor="service-charge">Service charge (KES)</label>
              <input
                id="service-charge"
                type="number"
                min="0"
                value={serviceCharge}
                onChange={(event) =>
                  setServiceCharge(
                    Math.max(0, Number(event.target.value) || 0)
                  )
                }
                className="w-24 rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-right text-sm text-slate-800 outline-none focus:border-emerald-500"
              />
            </div>

            <div className="border-t border-slate-200 pt-3">
              <div className="flex items-center justify-between">
                <span className="font-bold">Total bill</span>
                <span className="text-xl font-bold text-emerald-700">
                  {money(total)}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <button
          onClick={() => {
            setShowOrder(true);
            setShowCheckout(false);
          }}
          className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold transition hover:bg-slate-50"
        >
          <Receipt size={17} />
          View order / bill
        </button>

        <button
          disabled={subtotal <= 0}
          onClick={() => setShowCheckout(true)}
          className="flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-slate-300"
        >
          <CreditCard size={17} />
          Checkout
        </button>
      </div>

      {/* Checkout confirmation */}
      {showCheckout && (
        <div className="mt-5 rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-bold">Confirm checkout</h3>
              <p className="mt-1 text-sm text-slate-600">
                Table {selectedTable.id} · {money(total)}
              </p>
            </div>
            <button
              onClick={() => setShowCheckout(false)}
              aria-label="Close checkout"
              className="rounded-lg p-1 hover:bg-emerald-100"
            >
              <X size={18} />
            </button>
          </div>

          <label className="mb-2 mt-4 block text-sm font-semibold">
            Payment method
          </label>
          <select
            value={paymentMethod}
            onChange={(event) => setPaymentMethod(event.target.value)}
            className="w-full rounded-xl border border-emerald-200 bg-white px-3 py-3 text-sm outline-none"
          >
            <option>M-Pesa</option>
            <option>Cash</option>
            <option>Card</option>
            <option>Bank transfer</option>
          </select>

          <div className="mt-4 flex items-center justify-between rounded-xl bg-white p-3">
            <span className="text-sm text-slate-500">Amount to pay</span>
            <span className="text-lg font-bold">{money(total)}</span>
          </div>

          <button
            onClick={checkout}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-3 font-semibold text-white hover:bg-emerald-700"
          >
            <CheckCircle2 size={18} />
            Confirm demo payment
          </button>

          <p className="mt-3 text-xs text-slate-500">
            Demo only: no real payment is processed. The table moves to
            Cleaning after confirmation.
          </p>
        </div>
      )}
    </section>
  );
}
