// import React, { useState, useMemo, useEffect } from "react";
// import {
//   Search,
//   Filter,
//   CalendarDays,
//   Banknote,
//   Receipt,
//   ChevronLeft,
//   ChevronRight,
//   ArrowUpDown,
//   RotateCcw,
//   X,
// } from "lucide-react";

// const salesData = [
//   {
//     id: 1,
//     salesId: "SAL-0001",
//     orderId: "ORD-001",
//     tableNo: "T01",
//     date: "2026-11-02",
//     time: "10:30",
//     amount: 2500,
//     receiptNo: "RCT-001",
//     paymentMode: "M-Pesa",
//   },
//   {
//     id: 2,
//     salesId: "SAL-0002",
//     orderId: "ORD-002",
//     tableNo: "T02",
//     date: "2026-11-02",
//     time: "11:15",
//     amount: 1800,
//     receiptNo: "RCT-002",
//     paymentMode: "Cash",
//   },
//   {
//     id: 3,
//     salesId: "SAL-0003",
//     orderId: "ORD-003",
//     tableNo: "T03",
//     date: "2026-11-01",
//     time: "14:20",
//     amount: 3200,
//     receiptNo: "RCT-003",
//     paymentMode: "Card",
//   },
//   {
//     id: 4,
//     salesId: "SAL-0004",
//     orderId: "ORD-004",
//     tableNo: "T04",
//     date: "2026-10-31",
//     time: "16:45",
//     amount: 4500,
//     receiptNo: "RCT-004",
//     paymentMode: "Bank Transfer",
//   },
//   {
//     id: 5,
//     salesId: "SAL-0005",
//     orderId: "ORD-005",
//     tableNo: "T05",
//     date: "2026-10-30",
//     time: "18:10",
//     amount: 1250,
//     receiptNo: "RCT-005",
//     paymentMode: "M-Pesa",
//   },
//   {
//     id: 6,
//     salesId: "SAL-0006",
//     orderId: "ORD-006",
//     tableNo: "T06",
//     date: "2026-10-28",
//     time: "12:40",
//     amount: 2750,
//     receiptNo: "RCT-006",
//     paymentMode: "Cash",
//   },
//   {
//     id: 7,
//     salesId: "SAL-0007",
//     orderId: "ORD-007",
//     tableNo: "T07",
//     date: "2026-10-20",
//     time: "09:50",
//     amount: 3900,
//     receiptNo: "RCT-007",
//     paymentMode: "Card",
//   },
//   {
//     id: 8,
//     salesId: "SAL-0008",
//     orderId: "ORD-008",
//     tableNo: "T08",
//     date: "2026-09-15",
//     time: "15:30",
//     amount: 2100,
//     receiptNo: "RCT-008",
//     paymentMode: "M-Pesa",
//   },
// ];

// const paymentMethods = [
//   "Cash",
//   "M-Pesa",
//   "Card",
//   "Bank Transfer",
// ];

// const periods = [
//   { label: "All Time", value: "all" },
//   { label: "Today", value: "today" },
//   { label: "Yesterday", value: "yesterday" },
//   { label: "Last 7 Days", value: "7days" },
//   { label: "Last 30 Days", value: "30days" },
//   { label: "This Month", value: "thisMonth" },
//   { label: "Last Month", value: "lastMonth" },
//   { label: "Custom Range", value: "custom" },
// ];

// const formatCurrency = (amount) =>
//   new Intl.NumberFormat("en-KE", {
//     style: "currency",
//     currency: "KES",
//     maximumFractionDigits: 2,
//   }).format(amount);

// const formatDate = (date) =>
//   new Date(`${date}T00:00:00`).toLocaleDateString("en-KE", {
//     day: "2-digit",
//     month: "short",
//     year: "numeric",
//   });

// const getDateOnly = (date) => {
//   const d = new Date(date);
//   d.setHours(0, 0, 0, 0);
//   return d;
// };

// const getPeriodDates = (period) => {
//   const today = getDateOnly(new Date());
//   const yesterday = new Date(today);
//   yesterday.setDate(today.getDate() - 1);

//   const startOfThisMonth = new Date(
//     today.getFullYear(),
//     today.getMonth(),
//     1
//   );

//   const startOfLastMonth = new Date(
//     today.getFullYear(),
//     today.getMonth() - 1,
//     1
//   );

//   const endOfLastMonth = new Date(
//     today.getFullYear(),
//     today.getMonth(),
//     0
//   );

//   switch (period) {
//     case "today":
//       return { start: today, end: today };

//     case "yesterday":
//       return { start: yesterday, end: yesterday };

//     case "7days": {
//       const start = new Date(today);
//       start.setDate(today.getDate() - 6);
//       return { start, end: today };
//     }

//     case "30days": {
//       const start = new Date(today);
//       start.setDate(today.getDate() - 29);
//       return { start, end: today };
//     }

//     case "thisMonth":
//       return { start: startOfThisMonth, end: today };

//     case "lastMonth":
//       return { start: startOfLastMonth, end: endOfLastMonth };

//     default:
//       return { start: null, end: null };
//   }
// };

// const initialFilters = {
//   search: "",
//   period: "all",
//   paymentMode: "All",
//   startDate: "",
//   endDate: "",
//   startTime: "",
//   endTime: "",
//   minAmount: "",
//   maxAmount: "",
//   orderId: "",
//   salesId: "",
//   tableNo: "",
// };

// export default function Sales2() {
//   const [filters, setFilters] = useState(initialFilters);
//   const [showFilters, setShowFilters] = useState(false);
//   const [sortOrder, setSortOrder] = useState("newest");
//   const [page, setPage] = useState(1);
//   const [pageSize, setPageSize] = useState(5);

//   const updateFilter = (name, value) => {
//     setFilters((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//     setPage(1);
//   };

//   const resetFilters = () => {
//     setFilters(initialFilters);
//     setPage(1);
//   };

//   const filteredSales = useMemo(() => {
//     const periodDates = getPeriodDates(filters.period);

//     return salesData
//       .filter((sale) => {
//         const searchableText = [
//           sale.salesId,
//           sale.orderId,
//           sale.tableNo,
//           sale.receiptNo,
//           sale.paymentMode,
//           sale.amount.toString(),
//         ]
//           .join(" ")
//           .toLowerCase();

//         const matchesSearch = searchableText.includes(
//           filters.search.toLowerCase().trim()
//         );

//         const saleDate = getDateOnly(
//           new Date(`${sale.date}T00:00:00`)
//         );

//         const matchesPeriod =
//           filters.period === "all" ||
//           filters.period === "custom" ||
//           ((!periodDates.start ||
//             saleDate >= periodDates.start) &&
//             (!periodDates.end || saleDate <= periodDates.end));

//         const matchesCustomStart =
//           !filters.startDate || sale.date >= filters.startDate;

//         const matchesCustomEnd =
//           !filters.endDate || sale.date <= filters.endDate;

//         const matchesPayment =
//           filters.paymentMode === "All" ||
//           sale.paymentMode === filters.paymentMode;

//         const matchesStartTime =
//           !filters.startTime || sale.time >= filters.startTime;

//         const matchesEndTime =
//           !filters.endTime || sale.time <= filters.endTime;

//         const matchesMinAmount =
//           filters.minAmount === "" ||
//           sale.amount >= Number(filters.minAmount);

//         const matchesMaxAmount =
//           filters.maxAmount === "" ||
//           sale.amount <= Number(filters.maxAmount);

//         const matchesOrderId =
//           !filters.orderId ||
//           sale.orderId.toLowerCase().includes(
//             filters.orderId.toLowerCase().trim()
//           );

//         const matchesSalesId =
//           !filters.salesId ||
//           sale.salesId.toLowerCase().includes(
//             filters.salesId.toLowerCase().trim()
//           );

//         const matchesTable =
//           !filters.tableNo ||
//           sale.tableNo.toLowerCase().includes(
//             filters.tableNo.toLowerCase().trim()
//           );

//         return (
//           matchesSearch &&
//           matchesPeriod &&
//           matchesCustomStart &&
//           matchesCustomEnd &&
//           matchesPayment &&
//           matchesStartTime &&
//           matchesEndTime &&
//           matchesMinAmount &&
//           matchesMaxAmount &&
//           matchesOrderId &&
//           matchesSalesId &&
//           matchesTable
//         );
//       })
//       .sort((a, b) => {
//         const dateA = `${a.date}T${a.time}`;
//         const dateB = `${b.date}T${b.time}`;

//         return sortOrder === "newest"
//           ? dateB.localeCompare(dateA)
//           : dateA.localeCompare(dateB);
//       });
//   }, [filters, sortOrder]);

//   const totalSales = filteredSales.reduce(
//     (sum, sale) => sum + sale.amount,
//     0
//   );

//   const averageSale = filteredSales.length
//     ? totalSales / filteredSales.length
//     : 0;

//   const totalPages = Math.max(
//     1,
//     Math.ceil(filteredSales.length / pageSize)
//   );

//   useEffect(() => {
//     if (page > totalPages) setPage(totalPages);
//   }, [page, totalPages]);

//   const paginatedSales = filteredSales.slice(
//     (page - 1) * pageSize,
//     page * pageSize
//   );

//   const inputClass =
//     "w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

//   const hasActiveFilters =
//     Object.entries(filters).some(([key, value]) => {
//       if (key === "search") return value !== "";
//       if (key === "period") return value !== "all";
//       if (key === "paymentMode") return value !== "All";
//       return value !== "";
//     });

//   return (
//     <div className="min-h-screen bg-gray-50 p-4 text-gray-800 sm:p-6 lg:p-8">
//       <div className="mx-auto max-w-7xl space-y-6">
//         {/* Page heading */}
//         <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
//           <div>
//             <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
//               Sales Management
//             </h1>
//             <p className="mt-1 text-sm text-gray-500">
//               Track transactions, receipts and payment methods.
//             </p>
//           </div>

//           <button
//             onClick={resetFilters}
//             className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium hover:bg-gray-100"
//           >
//             <RotateCcw size={16} />
//             Reset Filters
//           </button>
//         </div>

//         {/* Summary cards */}
//         <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
//           <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm font-medium text-gray-500">
//                   Total Sales
//                 </p>
//                 <h2 className="mt-2 text-2xl font-bold text-gray-900">
//                   {formatCurrency(totalSales)}
//                 </h2>
//                 <p className="mt-2 text-xs text-gray-500">
//                   {filteredSales.length} transactions
//                 </p>
//               </div>
//               <div className="rounded-xl bg-blue-50 p-3 text-blue-600">
//                 <Banknote size={24} />
//               </div>
//             </div>
//           </div>

//           <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm font-medium text-gray-500">
//                   Average Transaction
//                 </p>
//                 <h2 className="mt-2 text-2xl font-bold text-gray-900">
//                   {formatCurrency(averageSale)}
//                 </h2>
//                 <p className="mt-2 text-xs text-gray-500">
//                   Per recorded transaction
//                 </p>
//               </div>
//               <div className="rounded-xl bg-purple-50 p-3 text-purple-600">
//                 <Receipt size={24} />
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Search and quick filters */}
//         <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm sm:p-5">
//           <div className="flex flex-col gap-3 lg:flex-row">
//             <div className="relative flex-1">
//               <Search
//                 size={18}
//                 className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
//               />
//               <input
//                 type="text"
//                 placeholder="Search sales ID, order, table, receipt or amount..."
//                 value={filters.search}
//                 onChange={(e) =>
//                   updateFilter("search", e.target.value)
//                 }
//                 className={`${inputClass} pl-10`}
//               />
//             </div>

//             <div className="flex flex-col gap-3 sm:flex-row">
//               <select
//                 value={filters.period}
//                 onChange={(e) =>
//                   updateFilter("period", e.target.value)
//                 }
//                 className={`${inputClass} sm:min-w-40`}
//               >
//                 {periods.map((period) => (
//                   <option key={period.value} value={period.value}>
//                     {period.label}
//                   </option>
//                 ))}
//               </select>

//               <select
//                 value={filters.paymentMode}
//                 onChange={(e) =>
//                   updateFilter("paymentMode", e.target.value)
//                 }
//                 className={`${inputClass} sm:min-w-44`}
//               >
//                 <option value="All">All Payment Methods</option>
//                 {paymentMethods.map((method) => (
//                   <option key={method} value={method}>
//                     {method}
//                   </option>
//                 ))}
//               </select>

//               <button
//                 onClick={() => setShowFilters(!showFilters)}
//                 className={`inline-flex items-center justify-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-medium ${
//                   showFilters
//                     ? "border-blue-200 bg-blue-50 text-blue-700"
//                     : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
//                 }`}
//               >
//                 {showFilters ? <X size={17} /> : <Filter size={17} />}
//                 Advanced Filters
//               </button>
//             </div>
//           </div>

//           {/* Advanced filters */}
//           {showFilters && (
//             <div className="mt-5 border-t border-gray-100 pt-5">
//               <div className="mb-4 flex items-center gap-2">
//                 <CalendarDays size={18} className="text-blue-600" />
//                 <h3 className="font-semibold text-gray-900">
//                   Advanced Filters
//                 </h3>
//               </div>

//               <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
//                 <div>
//                   <label className="mb-1.5 block text-sm font-medium text-gray-600">
//                     Start Date
//                   </label>
//                   <input
//                     type="date"
//                     value={filters.startDate}
//                     onChange={(e) =>
//                       updateFilter("startDate", e.target.value)
//                     }
//                     className={inputClass}
//                   />
//                 </div>

//                 <div>
//                   <label className="mb-1.5 block text-sm font-medium text-gray-600">
//                     End Date
//                   </label>
//                   <input
//                     type="date"
//                     value={filters.endDate}
//                     onChange={(e) =>
//                       updateFilter("endDate", e.target.value)
//                     }
//                     className={inputClass}
//                   />
//                 </div>

//                 <div>
//                   <label className="mb-1.5 block text-sm font-medium text-gray-600">
//                     Start Time
//                   </label>
//                   <input
//                     type="time"
//                     value={filters.startTime}
//                     onChange={(e) =>
//                       updateFilter("startTime", e.target.value)
//                     }
//                     className={inputClass}
//                   />
//                 </div>

//                 <div>
//                   <label className="mb-1.5 block text-sm font-medium text-gray-600">
//                     End Time
//                   </label>
//                   <input
//                     type="time"
//                     value={filters.endTime}
//                     onChange={(e) =>
//                       updateFilter("endTime", e.target.value)
//                     }
//                     className={inputClass}
//                   />
//                 </div>

//                 <div>
//                   <label className="mb-1.5 block text-sm font-medium text-gray-600">
//                     Sales ID
//                   </label>
//                   <input
//                     type="text"
//                     placeholder="e.g. SAL-0001"
//                     value={filters.salesId}
//                     onChange={(e) =>
//                       updateFilter("salesId", e.target.value)
//                     }
//                     className={inputClass}
//                   />
//                 </div>

//                 <div>
//                   <label className="mb-1.5 block text-sm font-medium text-gray-600">
//                     Order ID
//                   </label>
//                   <input
//                     type="text"
//                     placeholder="e.g. ORD-001"
//                     value={filters.orderId}
//                     onChange={(e) =>
//                       updateFilter("orderId", e.target.value)
//                     }
//                     className={inputClass}
//                   />
//                 </div>

//                 <div>
//                   <label className="mb-1.5 block text-sm font-medium text-gray-600">
//                     Table Number
//                   </label>
//                   <input
//                     type="text"
//                     placeholder="e.g. T01"
//                     value={filters.tableNo}
//                     onChange={(e) =>
//                       updateFilter("tableNo", e.target.value)
//                     }
//                     className={inputClass}
//                   />
//                 </div>

//                 <div>
//                   <label className="mb-1.5 block text-sm font-medium text-gray-600">
//                     Payment Method
//                   </label>
//                   <select
//                     value={filters.paymentMode}
//                     onChange={(e) =>
//                       updateFilter("paymentMode", e.target.value)
//                     }
//                     className={inputClass}
//                   >
//                     <option value="All">All Methods</option>
//                     {paymentMethods.map((method) => (
//                       <option key={method} value={method}>
//                         {method}
//                       </option>
//                     ))}
//                   </select>
//                 </div>

//                 <div>
//                   <label className="mb-1.5 block text-sm font-medium text-gray-600">
//                     Minimum Amount (KES)
//                   </label>
//                   <input
//                     type="number"
//                     min="0"
//                     placeholder="0"
//                     value={filters.minAmount}
//                     onChange={(e) =>
//                       updateFilter("minAmount", e.target.value)
//                     }
//                     className={inputClass}
//                   />
//                 </div>

//                 <div>
//                   <label className="mb-1.5 block text-sm font-medium text-gray-600">
//                     Maximum Amount (KES)
//                   </label>
//                   <input
//                     type="number"
//                     min="0"
//                     placeholder="10000"
//                     value={filters.maxAmount}
//                     onChange={(e) =>
//                       updateFilter("maxAmount", e.target.value)
//                     }
//                     className={inputClass}
//                   />
//                 </div>
//               </div>

//               <div className="mt-4 flex justify-end">
//                 <button
//                   onClick={resetFilters}
//                   className="rounded-lg px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100"
//                 >
//                   Clear All Filters
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Sales table */}
//         <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
//           <div className="flex flex-col justify-between gap-3 border-b border-gray-100 p-4 sm:flex-row sm:items-center sm:p-5">
//             <div>
//               <h2 className="font-semibold text-gray-900">
//                 Sales Transactions
//               </h2>
//               <p className="mt-1 text-sm text-gray-500">
//                 Showing {filteredSales.length === 0 ? 0 : (page - 1) * pageSize + 1}
//                 {" - "}
//                 {Math.min(page * pageSize, filteredSales.length)} of{" "}
//                 {filteredSales.length} records
//               </p>
//             </div>

//             <button
//               onClick={() =>
//                 setSortOrder((prev) =>
//                   prev === "newest" ? "oldest" : "newest"
//                 )
//               }
//               className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50"
//             >
//               <ArrowUpDown size={16} />
//               {sortOrder === "newest" ? "Newest First" : "Oldest First"}
//             </button>
//           </div>

//           <div className="overflow-x-auto">
//             <table className="w-full min-w-[1150px] text-left text-sm">
//               <thead className="bg-gray-50 text-xs uppercase tracking-wider text-gray-500">
//                 <tr>
//                   <th className="px-4 py-4 font-semibold">Sales ID</th>
//                   <th className="px-4 py-4 font-semibold">Order ID</th>
//                   <th className="px-4 py-4 font-semibold">Table No.</th>
//                   <th className="px-4 py-4 font-semibold">Date</th>
//                   <th className="px-4 py-4 font-semibold">Time</th>
//                   <th className="px-4 py-4 font-semibold">Amount</th>
//                   <th className="px-4 py-4 font-semibold">Mode of Payment</th>
//                   <th className="px-4 py-4 font-semibold">Receipt No.</th>
//                 </tr>
//               </thead>

//               <tbody className="divide-y divide-gray-100">
//                 {paginatedSales.length > 0 ? (
//                   paginatedSales.map((sale) => (
//                     <tr
//                       key={sale.id}
//                       className="transition hover:bg-gray-50"
//                     >
//                       <td className="whitespace-nowrap px-4 py-4 font-semibold text-blue-700">
//                         {sale.salesId}
//                       </td>
//                       <td className="whitespace-nowrap px-4 py-4 font-medium text-gray-700">
//                         {sale.orderId}
//                       </td>
//                       <td className="whitespace-nowrap px-4 py-4">
//                         <span className="rounded-md bg-gray-100 px-2.5 py-1 font-medium text-gray-600">
//                           {sale.tableNo}
//                         </span>
//                       </td>
//                       <td className="whitespace-nowrap px-4 py-4 text-gray-600">
//                         {formatDate(sale.date)}
//                       </td>
//                       <td className="whitespace-nowrap px-4 py-4 text-gray-600">
//                         {sale.time}
//                       </td>
//                       <td className="whitespace-nowrap px-4 py-4 font-semibold text-gray-900">
//                         {formatCurrency(sale.amount)}
//                       </td>
//                       <td className="whitespace-nowrap px-4 py-4">
//                         <span
//                           className={`rounded-full px-3 py-1.5 text-xs font-medium ${
//                             sale.paymentMode === "M-Pesa"
//                               ? "bg-green-50 text-green-700"
//                               : sale.paymentMode === "Cash"
//                               ? "bg-amber-50 text-amber-700"
//                               : sale.paymentMode === "Card"
//                               ? "bg-purple-50 text-purple-700"
//                               : "bg-blue-50 text-blue-700"
//                           }`}
//                         >
//                           {sale.paymentMode}
//                         </span>
//                       </td>
//                       <td className="whitespace-nowrap px-4 py-4 text-gray-600">
//                         {sale.receiptNo}
//                       </td>
//                     </tr>
//                   ))
//                 ) : (
//                   <tr>
//                     <td
//                       colSpan={8}
//                       className="px-4 py-12 text-center"
//                     >
//                       <div className="flex flex-col items-center">
//                         <Search
//                           size={28}
//                           className="mb-3 text-gray-300"
//                         />
//                         <p className="font-medium text-gray-700">
//                           No sales found
//                         </p>
//                         <p className="mt-1 text-sm text-gray-500">
//                           Try changing your search or filter criteria.
//                         </p>
//                         {hasActiveFilters && (
//                           <button
//                             onClick={resetFilters}
//                             className="mt-3 font-medium text-blue-600 hover:underline"
//                           >
//                             Clear filters
//                           </button>
//                         )}
//                       </div>
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>

//           {/* Pagination */}
//           <div className="flex flex-col justify-between gap-4 border-t border-gray-100 p-4 sm:flex-row sm:items-center">
//             <div className="flex items-center gap-2 text-sm text-gray-500">
//               <span>Rows per page:</span>
//               <select
//                 value={pageSize}
//                 onChange={(e) => {
//                   setPageSize(Number(e.target.value));
//                   setPage(1);
//                 }}
//                 className="rounded-lg border border-gray-200 bg-white px-2 py-1.5 outline-none focus:border-blue-500"
//               >
//                 <option value={5}>5</option>
//                 <option value={10}>10</option>
//                 <option value={20}>20</option>
//               </select>
//             </div>

//             <div className="flex items-center justify-between gap-3 sm:justify-end">
//               <span className="text-sm text-gray-500">
//                 Page {page} of {totalPages}
//               </span>

//               <div className="flex gap-2">
//                 <button
//                   disabled={page <= 1}
//                   onClick={() =>
//                     setPage((prev) => Math.max(1, prev - 1))
//                   }
//                   className="rounded-lg border border-gray-200 p-2 text-gray-600 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
//                   aria-label="Previous page"
//                 >
//                   <ChevronLeft size={18} />
//                 </button>

//                 <button
//                   disabled={page >= totalPages}
//                   onClick={() =>
//                     setPage((prev) =>
//                       Math.min(totalPages, prev + 1)
//                     )
//                   }
//                   className="rounded-lg border border-gray-200 p-2 text-gray-600 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
//                   aria-label="Next page"
//                 >
//                   <ChevronRight size={18} />
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


import { useEffect, useMemo, useState } from "react";
import {
  Search,
  Filter,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  CalendarDays,
  TrendingUp,
  ShoppingCart,
  Banknote,
  X,
} from "lucide-react";

const salesData = [
  {
    salesId: "SAL001",
    tableNo: "T01",
    orderId: "ORD001",
    date: "2026-11-02",
    time: "09:30",
    amount: 2500,
    paymentMode: "M-Pesa",
    receiptNo: "RCT001",
  },
  {
    salesId: "SAL002",
    tableNo: "T02",
    orderId: "ORD002",
    date: "2026-11-02",
    time: "10:15",
    amount: 1800,
    paymentMode: "Cash",
    receiptNo: "RCT002",
  },
  {
    salesId: "SAL003",
    tableNo: "T03",
    orderId: "ORD003",
    date: "2026-11-01",
    time: "12:45",
    amount: 4500,
    paymentMode: "Card",
    receiptNo: "RCT003",
  },
  {
    salesId: "SAL004",
    tableNo: "T04",
    orderId: "ORD004",
    date: "2026-11-01",
    time: "14:20",
    amount: 3200,
    paymentMode: "Bank Transfer",
    receiptNo: "RCT004",
  },
  {
    salesId: "SAL005",
    tableNo: "T05",
    orderId: "ORD005",
    date: "2026-10-31",
    time: "16:10",
    amount: 1500,
    paymentMode: "M-Pesa",
    receiptNo: "RCT005",
  },
  {
    salesId: "SAL006",
    tableNo: "T06",
    orderId: "ORD006",
    date: "2026-10-30",
    time: "11:00",
    amount: 2800,
    paymentMode: "Cash",
    receiptNo: "RCT006",
  },
  {
    salesId: "SAL007",
    tableNo: "T07",
    orderId: "ORD007",
    date: "2026-10-28",
    time: "13:30",
    amount: 5200,
    paymentMode: "Card",
    receiptNo: "RCT007",
  },
  {
    salesId: "SAL008",
    tableNo: "T08",
    orderId: "ORD008",
    date: "2026-10-25",
    time: "18:15",
    amount: 2100,
    paymentMode: "M-Pesa",
    receiptNo: "RCT008",
  },
  {
    salesId: "SAL009",
    tableNo: "T09",
    orderId: "ORD009",
    date: "2026-10-20",
    time: "19:45",
    amount: 3900,
    paymentMode: "Cash",
    receiptNo: "RCT009",
  },
  {
    salesId: "SAL010",
    tableNo: "T10",
    orderId: "ORD010",
    date: "2026-10-15",
    time: "20:30",
    amount: 6000,
    paymentMode: "Bank Transfer",
    receiptNo: "RCT010",
  },
];

const initialFilters = {
  dateFrom: "",
  dateTo: "",
  timeFrom: "",
  timeTo: "",
  minAmount: "",
  maxAmount: "",
  orderId: "",
  tableId: "",
  paymentMode: "",
};

const formatCurrency = (amount) =>
  new Intl.NumberFormat("en-KE", {
    style: "currency",
    currency: "KES",
    maximumFractionDigits: 0,
  }).format(amount);

const getStartOfDay = (date) => {
  const result = new Date(date);
  result.setHours(0, 0, 0, 0);
  return result;
};

const getEndOfDay = (date) => {
  const result = new Date(date);
  result.setHours(23, 59, 59, 999);
  return result;
};

function  Sales2()  {
  const [sales] = useState(salesData);
  const [searchTerm, setSearchTerm] = useState("");
    const [showFilters, setShowFilters] = useState(false);
     const [customTo, setCustomTo] = useState("");
const [customFrom, setCustomFrom] = useState("");
  const [period, setPeriod] = useState("all");
  const [sortOrder, setSortOrder] = useState("newest");

  const [filters, setFilters] = useState(initialFilters);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const today = new Date();
  const todayString = [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, "0"),
    String(today.getDate()).padStart(2, "0"),
  ].join("-");

  const updateFilter = (field, value) => {
    setFilters((previous) => ({
      ...previous,
      [field]: value,
    }));
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setFilters(initialFilters);
    setSearchTerm("");
    setPeriod("all");
    setCurrentPage(1);
    };
    const currency = (amount) =>
  new Intl.NumberFormat("en-KE", {
    style: "currency",
    currency: "KES",
    maximumFractionDigits: 2,
  }).format(amount);

  const getPeriodRange = () => {
    const now = new Date();
    const start = new Date(now);
    const end = new Date(now);

    start.setHours(0, 0, 0, 0);
    end.setHours(23, 59, 59, 999);

    switch (period) {
      case "today":
        return { start, end };

      case "yesterday":
        start.setDate(start.getDate() - 1);
        end.setDate(end.getDate() - 1);
        return { start, end };

      case "last7":
        start.setDate(start.getDate() - 6);
        return { start, end };

      case "last30":
        start.setDate(start.getDate() - 29);
        return { start, end };

      case "thisMonth":
        start.setDate(1);
        return { start, end };

      case "lastMonth":
        start.setDate(1);
        start.setMonth(start.getMonth() - 1);
        end.setDate(0);
        return { start, end };

      default:
        return null;
    }
  };

  const filteredSales = useMemo(() => {
    const range = getPeriodRange();

    return sales
      .filter((sale) => {
        const search = searchTerm.toLowerCase().trim();

        const matchesSearch =
          sale.salesId.toLowerCase().includes(search) ||
          sale.tableNo.toLowerCase().includes(search) ||
          sale.orderId.toLowerCase().includes(search) ||
          sale.receiptNo.toLowerCase().includes(search) ||
          sale.paymentMode.toLowerCase().includes(search) ||
          sale.date.includes(search) ||
          sale.time.includes(search) ||
          String(sale.amount).includes(search);

        const saleDate = new Date(`${sale.date}T${sale.time}:00`);

        const matchesPeriod =
          !range ||
          (saleDate >= range.start && saleDate <= range.end);

        const matchesDateFrom =
          !filters.dateFrom || sale.date >= filters.dateFrom;

        const matchesDateTo =
          !filters.dateTo || sale.date <= filters.dateTo;

        const matchesTimeFrom =
          !filters.timeFrom || sale.time >= filters.timeFrom;

        const matchesTimeTo =
          !filters.timeTo || sale.time <= filters.timeTo;

        const matchesMinAmount =
          filters.minAmount === "" ||
          sale.amount >= Number(filters.minAmount);

        const matchesMaxAmount =
          filters.maxAmount === "" ||
          sale.amount <= Number(filters.maxAmount);

        const matchesOrder =
          !filters.orderId ||
          sale.orderId
            .toLowerCase()
            .includes(filters.orderId.toLowerCase());

        const matchesTable =
          !filters.tableId ||
          sale.tableNo
            .toLowerCase()
            .includes(filters.tableId.toLowerCase());

        const matchesPayment =
          !filters.paymentMode ||
          sale.paymentMode === filters.paymentMode;

        return (
          matchesSearch &&
          matchesPeriod &&
          matchesDateFrom &&
          matchesDateTo &&
          matchesTimeFrom &&
          matchesTimeTo &&
          matchesMinAmount &&
          matchesMaxAmount &&
          matchesOrder &&
          matchesTable &&
          matchesPayment
        );
      })
      .sort((a, b) => {
        const dateA = new Date(`${a.date}T${a.time}:00`);
        const dateB = new Date(`${b.date}T${b.time}:00`);

        return sortOrder === "newest"
          ? dateB - dateA
          : dateA - dateB;
      });
  }, [sales, searchTerm, period, filters, sortOrder]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, period, filters, itemsPerPage]);

  const totalSales = filteredSales.reduce(
    (sum, sale) => sum + sale.amount,
    0
  );

  const totalOrders = filteredSales.length;

  const averageSale =
    totalOrders > 0 ? totalSales / totalOrders : 0;

  const totalPages = Math.max(
    1,
    Math.ceil(filteredSales.length / itemsPerPage)
  );

  const startIndex = (currentPage - 1) * itemsPerPage;

  const paginatedSales = filteredSales.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const paymentBadge = (paymentMode) => {
    const styles = {
      Cash: "bg-green-100 text-green-700",
      "M-Pesa": "bg-emerald-100 text-emerald-700",
      Card: "bg-blue-100 text-blue-700",
      "Bank Transfer": "bg-purple-100 text-purple-700",
      };
       const labelClass =
    "mb-1.5 block text-xs font-semibold text-gray-600";

    return (
      <span
        className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap`}
        //    ${
        //   styles[paymentMode] || "bg-gray-100 text-gray-700"
        // }
      >
        {paymentMode}
      </span>
    );
  };

  const hasActiveFilters =
    searchTerm !== "" ||
    period !== "all" ||
    Object.values(filters).some((value) => value !== "");

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Sales Management
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Track, filter and manage hotel sales transactions.
            </p>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2  gap-4">

          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm gap-2">
            <div className="flex flex-col justify-evenly gap-4 sm:flex-row sm:items-start">
                         <div>
                           <p className="text-sm text-gray-500">
                             Total sales displayed
                           </p>
                           <h2 className="mt-2 text-2xl font-bold">
                             {currency(totalSales)}
                           </h2>
                           <p className="mt-1 text-xs text-gray-500">
                             {filteredSales.length} matching transactions
                           </p>
                         </div>
           
                         <div className="flex items-center gap-2 sm:mt-0 ">
                           <CalendarDays
                             size={17}
                             className="text-emerald-600"
                           />
                           <select
                             value={period}
                             onChange={(e) => setPeriod(e.target.value)}
                             className="max-w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:border-emerald-500 mr-2 focus:ring-2 focus:ring-emerald-100"
                                  aria-label="Sales period"
                                  
                           >
                             <option value="all">All time</option>
                             <option value="today">Today</option>
                             <option value="yesterday">Yesterday</option>
                             <option value="7days">Last 7 days</option>
                             <option value="30days">Last 30 days</option>
                             <option value="thisMonth">This month</option>
                             <option value="lastMonth">Last month</option>
                             <option value="custom">Custom range</option>
                           </select>
                         </div>
                       </div>
           
                       {period === "custom" && (
                         <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                           <div>
                             <label className="mb-1.5 block text-xs font-semibold text-gray-600">From date</label>
                             <input
                               type="date"
                               value={customFrom}
                               max={customTo || undefined}
                               onChange={(e) => setCustomFrom(e.target.value)}
                               className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                             />
                           </div>
                           <div>
                             <label className="mb-1.5 block text-xs font-semibold text-gray-600">To date</label>
                             <input
                               type="date"
                               value={customTo}
                               min={customFrom || undefined}
                               onChange={(e) => setCustomTo(e.target.value)}
                               className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                             />
                           </div>
                         </div>
                       )}
                     </div>
          

          <div className="bg-white rounded-xl border border-gray-200 p-2 shadow-sm">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500">Average Sale</p>
                <h2 className="text-2xl font-bold text-gray-800 mt-2">
                  {formatCurrency(averageSale)}
                </h2>
              </div>
              
            </div>
          </div>

        </div>

        {/* Sales Table Container */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm">

          {/* Search and Controls */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex flex-col lg:flex-row gap-3 lg:items-center lg:justify-between">

              {/* Search */}
              <div className="relative flex-1 max-w-xl">
                <Search
                  size={19}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="text"
                  placeholder="Search sales ID, order ID, table, payment mode..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm"
                />
              </div>

              <div className="flex flex-wrap gap-2">

                {/* Period Filter */}
                <select
                  value={period}
                  onChange={(e) => setPeriod(e.target.value)}
                  className="px-3 py-2.5 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="all">All Time</option>
                  <option value="today">Today</option>
                  <option value="yesterday">Yesterday</option>
                  <option value="last7">Last 7 Days</option>
                  <option value="last30">Last 30 Days</option>
                  <option value="thisMonth">This Month</option>
                  <option value="lastMonth">Last Month</option>
                </select>

                {/* Sort */}
                <select
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                  className="px-3 py-2.5 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                </select>

                {/* Advanced Filter Button */}
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-lg border text-sm font-medium transition ${
                    showFilters
                      ? "bg-green-50 border-green-500 text-green-700"
                      : "border-gray-300 text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <Filter size={17} />
                  Filters
                  {showFilters ? (
                    <ChevronUp size={16} />
                  ) : (
                    <ChevronDown size={16} />
                  )}
                </button>

              </div>
            </div>

            {/* Advanced Filters */}
            {showFilters && (
              <div className="mt-5 p-4 bg-gray-50 rounded-lg border border-gray-200">

                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-semibold text-gray-700">
                    Advanced Filters
                  </h3>

                  <button
                    onClick={clearFilters}
                    className="text-sm text-red-600 hover:text-red-700 flex items-center gap-1"
                  >
                    <X size={15} />
                    Clear Filters
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

                  {/* Date From */}
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      Date From
                    </label>
                    <input
                      type="date"
                      value={filters.dateFrom}
                      onChange={(e) =>
                        updateFilter("dateFrom", e.target.value)
                      }
                      className="w-full border border-gray-300 rounded-lg p-2 text-sm outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>

                  {/* Date To */}
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      Date To
                    </label>
                    <input
                      type="date"
                      value={filters.dateTo}
                      onChange={(e) =>
                        updateFilter("dateTo", e.target.value)
                      }
                      className="w-full border border-gray-300 rounded-lg p-2 text-sm outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>

                  {/* Time From */}
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      Time From
                    </label>
                    <input
                      type="time"
                      value={filters.timeFrom}
                      onChange={(e) =>
                        updateFilter("timeFrom", e.target.value)
                      }
                      className="w-full border border-gray-300 rounded-lg p-2 text-sm outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>

                  {/* Time To */}
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      Time To
                    </label>
                    <input
                      type="time"
                      value={filters.timeTo}
                      onChange={(e) =>
                        updateFilter("timeTo", e.target.value)
                      }
                      className="w-full border border-gray-300 rounded-lg p-2 text-sm outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>

                  {/* Minimum Amount */}
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      Minimum Amount (KES)
                    </label>
                    <input
                      type="number"
                      min="0"
                      placeholder="Minimum amount"
                      value={filters.minAmount}
                      onChange={(e) =>
                        updateFilter("minAmount", e.target.value)
                      }
                      className="w-full border border-gray-300 rounded-lg p-2 text-sm outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>

                  {/* Maximum Amount */}
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      Maximum Amount (KES)
                    </label>
                    <input
                      type="number"
                      min="0"
                      placeholder="Maximum amount"
                      value={filters.maxAmount}
                      onChange={(e) =>
                        updateFilter("maxAmount", e.target.value)
                      }
                      className="w-full border border-gray-300 rounded-lg p-2 text-sm outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>

                  {/* Order ID */}
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      Order ID
                    </label>
                    <input
                      type="text"
                      placeholder="Enter order ID"
                      value={filters.orderId}
                      onChange={(e) =>
                        updateFilter("orderId", e.target.value)
                      }
                      className="w-full border border-gray-300 rounded-lg p-2 text-sm outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>

                  {/* Table ID */}
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      Table ID
                    </label>
                    <input
                      type="text"
                      placeholder="Enter table ID"
                      value={filters.tableId}
                      onChange={(e) =>
                        updateFilter("tableId", e.target.value)
                      }
                      className="w-full border border-gray-300 rounded-lg p-2 text-sm outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>

                  {/* Payment Mode */}
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      Payment Mode
                    </label>
                    <select
                      value={filters.paymentMode}
                      onChange={(e) =>
                        updateFilter("paymentMode", e.target.value)
                      }
                      className="w-full border border-gray-300 rounded-lg p-2 text-sm outline-none focus:ring-2 focus:ring-green-500"
                    >
                      <option value="">All Payment Modes</option>
                      <option value="Cash">Cash</option>
                      <option value="M-Pesa">M-Pesa</option>
                      <option value="Card">Card</option>
                      <option value="Bank Transfer">Bank Transfer</option>
                    </select>
                  </div>

                </div>
              </div>
            )}
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">

              <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
                <tr>
                  <th className="px-5 py-4 font-semibold">Sales ID</th>
                  <th className="px-5 py-4 font-semibold">Table No.</th>
                  <th className="px-5 py-4 font-semibold">Order ID</th>
                  <th className="px-5 py-4 font-semibold">Date</th>
                  <th className="px-5 py-4 font-semibold">Time</th>
                  <th className="px-5 py-4 font-semibold">Amount</th>
                  <th className="px-5 py-4 font-semibold">Payment Mode</th>
                  <th className="px-5 py-4 font-semibold">Receipt No.</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">

                {paginatedSales.length > 0 ? (
                  paginatedSales.map((sale) => (
                    <tr
                      key={sale.salesId}
                      className="hover:bg-gray-50 transition"
                    >
                      <td className="px-5 py-4 font-semibold text-green-700 whitespace-nowrap">
                        {sale.salesId}
                      </td>

                      <td className="px-5 py-4 text-gray-700">
                        {sale.tableNo}
                      </td>

                      <td className="px-5 py-4 text-gray-700">
                        {sale.orderId}
                      </td>

                      <td className="px-5 py-4 text-gray-600 whitespace-nowrap">
                        {sale.date}
                      </td>

                      <td className="px-5 py-4 text-gray-600">
                        {sale.time}
                      </td>

                      <td className="px-5 py-4 font-semibold text-gray-800 whitespace-nowrap">
                        {formatCurrency(sale.amount)}
                      </td>

                      <td className="px-5 py-4">
                        {paymentBadge(sale.paymentMode)}
                      </td>

                      <td className="px-5 py-4 text-gray-600">
                        {sale.receiptNo}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="8"
                      className="px-5 py-12 text-center text-gray-500"
                    >
                      <div className="flex flex-col items-center gap-2">
                        <Search size={30} className="text-gray-300" />
                        <p className="font-medium">No sales found</p>
                        <p className="text-xs">
                          Try changing your search or filter criteria.
                        </p>
                        {hasActiveFilters && (
                          <button
                            onClick={clearFilters}
                            className="mt-2 text-green-600 hover:underline"
                          >
                            Clear all filters
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                )}

              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-4 py-4 border-t border-gray-200">

            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span>Rows per page:</span>

              <select
                value={itemsPerPage}
                onChange={(e) => {
                  setItemsPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="border border-gray-300 rounded-lg px-2 py-1.5 outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
              </select>

              <span className="ml-2">
                {filteredSales.length === 0
                  ? "0 records"
                  : `${startIndex + 1}-${Math.min(
                      startIndex + itemsPerPage,
                      filteredSales.length
                    )} of ${filteredSales.length}`}
              </span>
            </div>

            <div className="flex items-center gap-2">

              <button
                onClick={() =>
                  setCurrentPage((previous) =>
                    Math.max(1, previous - 1)
                  )
                }
                disabled={currentPage === 1}
                className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
                aria-label="Previous page"
              >
                <ChevronLeft size={18} />
              </button>

              <span className="text-sm text-gray-600 px-2">
                Page {currentPage} of {totalPages}
              </span>

              <button
                onClick={() =>
                  setCurrentPage((previous) =>
                    Math.min(totalPages, previous + 1)
                  )
                }
                disabled={
                  currentPage === totalPages ||
                  filteredSales.length === 0
                }
                className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
                aria-label="Next page"
              >
                <ChevronRight size={18} />
              </button>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Sales2;
