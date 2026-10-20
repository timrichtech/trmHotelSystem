
import { useContext, useMemo, useState } from "react";
import {
  Search,
  Users,
  Clock,
  CheckCircle2,
  Utensils,
  X,
  Armchair,
  RefreshCw,
  ChevronDown,
} from "lucide-react";
import { Box, Button, Stack } from "@mui/material";
import { Add } from "@mui/icons-material";
import { useNavigate } from "react-router";
import { MenuContext } from "./menudata";

const initialTables = [
  { id: 1, seats: 2, status: "Available", shape: "circle", area: "Indoor" },
  { id: 2, seats: 2, status: "Occupied", shape: "circle", area: "Indoor" },
  { id: 3, seats: 4, status: "Reserved", shape: "square", area: "Indoor" },
  { id: 4, seats: 4, status: "Available", shape: "square", area: "Indoor" },
  { id: 5, seats: 6, status: "Cleaning", shape: "square", area: "Indoor" },
  { id: 6, seats: 4, status: "Occupied", shape: "square", area: "Indoor" },
  { id: 7, seats: 2, status: "Available", shape: "circle", area: "Terrace" },
  { id: 8, seats: 4, status: "Reserved", shape: "square", area: "Terrace" },
  { id: 9, seats: 6, status: "Available", shape: "square", area: "Terrace" },
  { id: 10, seats: 2, status: "Occupied", shape: "circle", area: "Terrace" },
  { id: 11, seats: 4, status: "Available", shape: "square", area: "Indoor" },
  { id: 12, seats: 6, status: "Cleaning", shape: "square", area: "Indoor" },
];

const statusStyles = {
  Available: {
    card: "border-emerald-400 bg-emerald-50 text-emerald-700",
    dot: "bg-emerald-500",
    badge: "bg-emerald-100 text-emerald-700",
  },
  Occupied: {
    card: "border-rose-400 bg-rose-50 text-rose-700",
    dot: "bg-rose-500",
    badge: "bg-rose-100 text-rose-700",
  },
  Reserved: {
    card: "border-amber-400 bg-amber-50 text-amber-700",
    dot: "bg-amber-500",
    badge: "bg-amber-100 text-amber-700",
  },
  Cleaning: {
    card: "border-slate-300 bg-slate-100 text-slate-600",
    dot: "bg-slate-400",
    badge: "bg-slate-200 text-slate-600",
  },
};

const filters = ["All", "Available", "Occupied", "Reserved", "Cleaning"];

export default function TableManagement() {
  const [tables, setTables] = useState(initialTables);
  // const { tables, alterTable, loadTables } = useContext(OrganizerContext);
  // const {currentTable } =
  //     useContext(MenuContext);
  const [selectedId, setSelectedId] = useState(1);
  const [activeFilter, setActiveFilter] = useState("All");
  const [activeArea, setActiveArea] = useState("All areas");
  const [search, setSearch] = useState("");
  const nav = useNavigate();
  const selectedTable = tables.find((table) => table.id === selectedId);

  const counts = useMemo(
    () =>
      tables.reduce(
        (acc, table) => {
          acc[table.status] = (acc[table.status] || 0) + 1;
          return acc;
        },
        { Available: 0, Occupied: 0, Reserved: 0, Cleaning: 0 }
      ),
    [tables]
  );

  const filteredTables = tables.filter((table) => {
    const matchesStatus =
      activeFilter === "All" || table.status === activeFilter;

    const matchesArea =
      activeArea === "All areas" || table.area === activeArea;

    const matchesSearch = String(table.id).includes(search.trim());

    return matchesStatus && matchesArea && matchesSearch;
  });

  function updateStatus(id, status) {
    setTables((current) =>
      current.map((table) =>
        table.id === id ? { ...table, status } : table
      )
    );
  }

  function resetTables() {
    setTables(initialTables);
    setSelectedId(1);
    setActiveFilter("All");
    setActiveArea("All areas");
    setSearch("");
  }
 const [openNewProduct, setOpenNewProduct] = useState(false);
 const [open, setOpen] = useState(false);
  return (
    <div className="min-h-screen bg-slate-50 p-4 text-slate-800 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Header */}
        <header className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className="mb-1 text-sm font-medium text-emerald-600">
              RESTAURANT OPERATIONS
            </p>
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Table Management
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Monitor table availability and manage seating.
            </p>
          </div>

          <button
            onClick={resetTables}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold shadow-sm transition hover:bg-slate-100"
          >
            <RefreshCw size={16} />
            Reset demo
          </button>
        </header>

        {/* Summary cards */}
        <section className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {[
            {
              label: "Total tables",
              value: tables.length,
              icon: Armchair,
              color: "bg-blue-50 text-blue-600",
            },
            {
              label: "Available",
              value: counts.Available,
              icon: CheckCircle2,
              color: "bg-emerald-50 text-emerald-600",
            },
            {
              label: "Occupied",
              value: counts.Occupied,
              icon: Users,
              color: "bg-rose-50 text-rose-600",
            },
            {
              label: "Reserved",
              value: counts.Reserved,
              icon: Clock,
              color: "bg-amber-50 text-amber-600",
            },
          ].map((item) => {
            const Icon = item.icon;
            

            return (
              <div
                key={item.label}
                className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5"
              >
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm text-slate-500">{item.label}</p>
                  <span
                    className={`rounded-xl p-2 ${item.color}`}
                  >
                    <Icon size={19} />
                  </span>
                </div>
                <p className="mt-3 text-3xl font-bold">{item.value}</p>
              </div>
            );
          })}
        </section>

        {/* Main layout */}
        <div className="grid items-start gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
          <section className="min-w-0 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h2 className="text-lg font-bold">Floor orientation</h2>
                <p className="mt-1 text-sm text-slate-500">
                  Select a numbered shape to manage a table.
                </p>
              </div>

              <div className="relative">
                <Search
                  size={17}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search table number..."
                  className="w-full rounded-xl border border-slate-200 py-2.5 pl-9 pr-3 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 sm:w-56"
                />
              </div>
            </div>

            {/* Status legend */}
            <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2">
              {filters.slice(1).map((status) => (
                <div
                  key={status}
                  className="flex items-center gap-2 text-xs text-slate-600"
                >
                  <span
                    className={`h-2.5 w-2.5 rounded-full ${statusStyles[status].dot}`}
                  />
                  {status}
                </div>
              ))}
            </div>

            {/* Filters */}
            <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-wrap gap-2">
                {filters.map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                    className={`rounded-lg px-3 py-2 text-xs font-semibold transition ${
                      activeFilter === filter
                        ? "bg-slate-900 text-white"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>

              <select
                value={activeArea}
                onChange={(event) => setActiveArea(event.target.value)}
                className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-emerald-500"
              >
                <option>All areas</option>
                <option>Indoor</option>
                <option>Terrace</option>
              </select>
            </div>
             

            {/* Numbered table shapes only */}
            <div className="mt-6 rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-3 sm:p-5">
              <Box className="flex pl-10 justify-end">  <Button
            //   variant="contained"
              onClick={() => setOpenNewProduct(true)}
              startIcon={<Add />}
            //   color="success"
              className="!bg-green-500 hover:bg-green-600 rounded-lg px-3 py-2 text-sm font-semibold !text-white transition"
            >
              Add Table
            </Button></Box>
              <div className="mb-5 flex items-center justify-center">
                
                <div className="rounded-lg border border-slate-300 bg-white px-5 py-2 text-xs font-bold tracking-[0.2em] text-slate-500">
                  ENTRANCE
                </div>
              </div>

              <div className="grid grid-cols-3 justify-items-center gap-x-2 gap-y-5 sm:grid-cols-4 sm:gap-x-4 sm:gap-y-7 md:grid-cols-4 lg:grid-cols-5">
                {filteredTables.map((table) => {
                  const selected = selectedId === table.id;
                  const styles = statusStyles[table.status];

                  return (
                    <button
                      key={table.id}
                      onClick={() => {setSelectedId(table.id);}}
                      title={`Table ${table.id}: ${table.status}`}
                      aria-label={`Select table ${table.id}, ${table.status}`}
                      className={`relative flex aspect-square w-full max-w-[100px] flex-col items-center justify-center border-2 transition duration-200 hover:-translate-y-1 hover:shadow-md ${
                        table.shape === "circle"
                          ? "rounded-full"
                          : "rounded-2xl"
                      } ${
                        selected
                          ? "border-slate-900 ring-4 ring-slate-200"
                          : styles.card
                      }`}
                    >
                      <span className="text-2xl font-bold sm:text-3xl">
                        {table.id}
                      </span>
                      <span className="mt-1 flex items-center gap-1 text-[10px] font-medium sm:text-xs">
                        <Users size={12} />
                        {table.seats}
                      </span>
                      <span
                        className={`absolute right-1 top-1 h-2.5 w-2.5 rounded-full ring-2 ring-white sm:right-2 sm:top-2 ${styles.dot}`}
                      />
                    </button>
                  );
                })}
              </div>

              {filteredTables.length === 0 && (
                <div className="py-12 text-center text-sm text-slate-500">
                  No tables match your filters.
                </div>
              )}

              <div className="mt-6 border-t border-slate-200 pt-4 text-center text-xs text-slate-400">
                NUMBERED TABLES · SHAPE-BASED ORIENTATION
              </div>
            </div>
          </section>

          {/* Selected table details */}
          <aside className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-slate-500">Selected table</p>
                <h2 className="mt-1 text-xl font-bold">
                  {selectedTable ? `Table ${selectedTable.id}` : "No table"}
                </h2>
              </div>
              <span className="rounded-xl bg-emerald-50 p-3 text-emerald-600">
                <Utensils size={22} />
              </span>
            </div>

            {selectedTable ? (
              <>
                <div className="my-5 flex justify-center rounded-2xl bg-slate-50 py-8">
                  <div
                    className={`flex h-28 w-28 flex-col items-center justify-center border-2 ${
                      selectedTable.shape === "circle"
                        ? "rounded-full"
                        : "rounded-2xl"
                    } ${statusStyles[selectedTable.status].card}`}
                  >
                    <span className="text-4xl font-bold">
                      {selectedTable.id}
                    </span>
                    <span className="mt-1 text-xs">
                      {selectedTable.seats} seats
                    </span>
                  </div>
                  <Box className="flex pl-10 justify-end">
                    <Button onClick={()=> nav("/menu")} className="!bg-green-500 hover:bg-green-600 rounded-lg px-3 py-2 text-sm font-semibold !text-white transition ml-4">
                        Food Menu
                    </Button>
                  </Box>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <span className="text-sm text-slate-500">Status</span>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[selectedTable.status].badge}`}
                    >
                      {selectedTable.status}
                    </span>
                  </div>

                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <span className="text-sm text-slate-500">Capacity</span>
                    <span className="text-sm font-semibold">
                      {selectedTable.seats} guests
                    </span>
                  </div>

                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <span className="text-sm text-slate-500">Area</span>
                    <span className="text-sm font-semibold">
                      {selectedTable.area}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-500">Shape</span>
                    <span className="text-sm font-semibold capitalize">
                      {selectedTable.shape}
                    </span>
                  </div>
                </div>

                <div className="mt-6">
                  <label
                    htmlFor="table-status"
                    className="mb-2 block text-sm font-semibold"
                  >
                    Update table status
                  </label>
                  <select
                    id="table-status"
                    value={selectedTable.status}
                    onChange={(event) =>
                      updateStatus(selectedTable.id, event.target.value)
                    }
                    className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                  >
                    {filters.slice(1).map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  onClick={() => setSelectedId(null)}
                  className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
                >
                  <X size={16} />
                  Clear selection
                </button>
              </>
            ) : (
              <div className="py-10 text-center">
                <Armchair
                  size={36}
                  className="mx-auto text-slate-300"
                />
                <p className="mt-3 text-sm text-slate-500">
                  Select a table shape to view its details.
                </p>
                <button
                  onClick={() => setSelectedId(1)}
                  className="mt-4 rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700"
                >
                  Select table 1
                </button>
              </div>
            )}
          </aside>
        </div>
      </div>
      {/* <Stack open={open} className="relative inline-block">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
      >
        Actions
        <ChevronDown size={18} />
      </button>

      {open && (
        <div className="absolute right-0 z-10 mt-2 w-48 rounded-lg border bg-white p-2 shadow-lg">
          <button
            onClick={() => {
              alert("Edit clicked");
              setOpen(false);
            }}
            className="block w-full rounded-md px-3 py-2 text-left text-gray-700 hover:bg-gray-100"
          >
            Edit
          </button>

          <button
            onClick={() => {
              alert("View clicked");
              setOpen(false);
            }}
            className="block w-full rounded-md px-3 py-2 text-left text-gray-700 hover:bg-gray-100"
          >
            View Details
          </button>

          <button
            onClick={() => {
              alert("Delete clicked");
              setOpen(false);
            }}
            className="block w-full rounded-md px-3 py-2 text-left text-red-600 hover:bg-red-50"
          >
            Delete
          </button>
        </div>
      )}
    </Stack> */}
    </div>
  );
}