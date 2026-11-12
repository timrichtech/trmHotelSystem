import { useContext, useState } from "react";
import {
  Tabs,
  Tab,
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Avatar,
  Stack,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  Badge,
  IconButton,
  CardMedia,
  CardActionArea,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  List,
  ListItemButton,
  ListItemText,
  Popover,
} from "@mui/material";
import Grid2 from "@mui/material/Grid2";
import { Add, Close, Edit, MoreVert } from "@mui/icons-material";
import profile_image from "../resources/default_profile.png";
import { MenuContext } from "./menudata";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Search } from "lucide-react";
import Sales2 from "./sale";
import SalesStatistics from "./salesstarts";


function Sales () {
  const { sales } = useContext(MenuContext);
  const [value, setValue] = useState(0);
  const [anchorEl, setanchorEl] = useState(null);
  const openPop = Boolean(anchorEl);
  const [currentSale, setCurrentSale] = useState(null);
  const [openNewProduct, setOpenNewProduct] = useState(false);
  const [search, setSearch] = useState("");
  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };


  const handleViewSale = ()=>{
    setanchorEl(null);
  }

  const handleDelete=()=>{
    setanchorEl(null);

  }
  return (
    <Box>
      <Tabs value={value} onChange={handleTabChange}>
        <Tab label="Sales" />
        <Tab label="Statistics" />
        {/* <Tab label="Reports" /> */}
      </Tabs>
      <TabPanel value={value} index={0}>
        <Sales2/>
        {/* <Stack rowGap={1}>
          <Box display={"flex"} justifyContent={"space-between"}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Choose date"
                disableFuture
                format="DD MMM YYYY"
              />
            </LocalizationProvider>
                 <div className="relative">
                <Search
                  size={17}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search food..."
                  className="w-full rounded-xl border border-slate-200 py-2.5 pl-9 pr-3 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 sm:w-56"
                />
              </div>
          </Box>
          <Stack maxHeight={"60vh"} overflow={"auto"}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <Typography fontWeight={"bold"}></Typography>
                    </TableCell>
                    <TableCell>
                      <Typography fontWeight={"bold"}>Sales ID</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography fontWeight={"bold"}>Date</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography fontWeight={"bold"}>Time</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography fontWeight={"bold"}>Order ID</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography fontWeight={"bold"}>Amount</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography fontWeight={"bold"}>Action</Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {sales.length > 0 ? (
                    sales.map((sale, index) => {
                      return (
                        <TableRow key={sale.id}>
                          <TableCell>{index + 1}</TableCell>
                          <TableCell>{sale.id}</TableCell>
                          <TableCell>{sale.date}</TableCell>
                          <TableCell>{sale.time}</TableCell>
                          <TableCell>{sale.order_id}</TableCell>
                          <TableCell>{sale.amount}</TableCell>
                          <TableCell>
                            <IconButton
                              onClick={(e) => {
                                setanchorEl(e.target);
                                setCurrentSale(sale);
                              }}
                            >
                              <MoreVert />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      );
                    })
                  ) : (
                    <TableRow>No sales</TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <Popover
              open={openPop}
              anchorEl={anchorEl}
              onClose={() => setanchorEl(null)}
              anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
              sx={{ width: "15%" }}
            >
              <Paper>
                <List>
                  <ListItemButton onClick={handleViewSale}>
                    <ListItemText primary="View" />
                  </ListItemButton>
                  <ListItemButton onClick={handleDelete}>
                    <ListItemText primary="Delete" />
                  </ListItemButton>
                </List>
              </Paper>
            </Popover>
          </Stack>
        </Stack> */}
      </TabPanel>
      <TabPanel value={value} index={1}>
        <SalesStatistics/>
        {/* Stats */}
      </TabPanel>
      <TabPanel value={value} index={2}>
        Reports
      </TabPanel>
      
    </Box>
  );
};

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
};

export default Sales;

function Product(props) {
  const { removeFromCart, addToCart } = useContext(MenuContext);
  const { food_name, description, price, image } = props.product;
  const [quantity, setQuantity] = useState(0);

  const handleAdd = () => {
    addToCart(props.food);
    setQuantity(quantity + 1);
  };

  const handleRemove = () => {
    if (quantity > 0) {
      removeFromCart(props.food);
      setQuantity(quantity - 1);
    }
  };
  return (
    <>
      <CardMedia component="img" height={150} image={image} alt={food_name} />
      <CardContent>
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Typography color={"primary"} variant="h6">
            {food_name}
          </Typography>
          {quantity > 0 ? <Avatar>{quantity}</Avatar> : null}
        </Box>

        <Typography fontWeight="bold" color={"secondary"}>
          {description}
        </Typography>
        <Typography variant="h6">Ksh.{price}</Typography>
        <Box display={"flex"} justifyContent={"space-between"}>
          <Button variant="contained" onClick={handleRemove}>
            Delete
          </Button>
          <Button variant="contained" onClick={handleAdd}>
            Edit
          </Button>
        </Box>
      </CardContent>
    </>
  );
}

function SalesRate(props) {
  const sales = useContext(MenuContext);
  return (
    <Card>
      <CardContent>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <Typography fontWeight={"bold"}></Typography>
                </TableCell>
                <TableCell>
                  <Typography fontWeight={"bold"}>Product</Typography>
                </TableCell>
                <TableCell>
                  <Typography fontWeight={"bold"}>Rate</Typography>
                </TableCell>
                <TableCell>
                  <Typography fontWeight={"bold"}>Rating</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sales.length > 0 ? (
                sales.map((order, index) => {
                  return (
                    <TableRow key={order.id}>
                      <TableCell>{order + 1}</TableCell>
                      <TableCell>{order.product}</TableCell>
                      <TableCell>{order.rate}</TableCell>
                      <TableCell>{order.rating}</TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>No sales</TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
}


// import React, { useMemo, useState } from "react";
// import {
//   Search,
//   SlidersHorizontal,
//   CalendarDays,
//   Clock3,
//   RotateCcw,
//   ChevronDown,
//   ArrowUpDown,
//   Receipt,
//   Banknote,
//   ShoppingBag,
//   X,
// } from "lucide-react";

// const salesData = [
//   {
//     tableNo: "T-01",
//     orderId: "ORD-1001",
//     date: "2026-11-02",
//     time: "09:15",
//     amount: 2450,
//     receiptNo: "RCT-5001",
//   },
//   {
//     tableNo: "T-04",
//     orderId: "ORD-1002",
//     date: "2026-11-02",
//     time: "10:30",
//     amount: 1800,
//     receiptNo: "RCT-5002",
//   },
//   {
//     tableNo: "T-02",
//     orderId: "ORD-1003",
//     date: "2026-11-01",
//     time: "13:45",
//     amount: 4200,
//     receiptNo: "RCT-5003",
//   },
//   {
//     tableNo: "T-06",
//     orderId: "ORD-1004",
//     date: "2026-11-01",
//     time: "15:20",
//     amount: 1250,
//     receiptNo: "RCT-5004",
//   },
//   {
//     tableNo: "T-03",
//     orderId: "ORD-1005",
//     date: "2026-10-31",
//     time: "18:10",
//     amount: 3650,
//     receiptNo: "RCT-5005",
//   },
//   {
//     tableNo: "T-08",
//     orderId: "ORD-1006",
//     date: "2026-10-30",
//     time: "20:05",
//     amount: 5800,
//     receiptNo: "RCT-5006",
//   },
// ];

// const initialFilters = {
//   dateFrom: "",
//   dateTo: "",
//   timeFrom: "",
//   timeTo: "",
//   minAmount: "",
//   maxAmount: "",
//   orderId: "",
//   tableId: "",
// };

// const currency = (amount) =>
//   new Intl.NumberFormat("en-KE", {
//     style: "currency",
//     currency: "KES",
//     maximumFractionDigits: 0,
//   }).format(amount);

// export default function Sales() {
//   const [search, setSearch] = useState("");
//   const [showFilters, setShowFilters] = useState(false);
//   const [filters, setFilters] = useState(initialFilters);
//   const [sortNewest, setSortNewest] = useState(true);

//   const updateFilter = (key, value) => {
//     setFilters((previous) => ({
//       ...previous,
//       [key]: value,
//     }));
//   };

//   const resetFilters = () => {
//     setFilters(initialFilters);
//     setSearch("");
//   };

//   const filteredSales = useMemo(() => {
//     const query = search.trim().toLowerCase();

//     return salesData
//       .filter((sale) => {
//         const matchesSearch =
//           !query ||
//           sale.orderId.toLowerCase().includes(query) ||
//           sale.tableNo.toLowerCase().includes(query) ||
//           sale.receiptNo.toLowerCase().includes(query) ||
//           String(sale.amount).includes(query);

//         const matchesOrder =
//           !filters.orderId ||
//           sale.orderId
//             .toLowerCase()
//             .includes(filters.orderId.toLowerCase());

//         const matchesTable =
//           !filters.tableId ||
//           sale.tableNo
//             .toLowerCase()
//             .includes(filters.tableId.toLowerCase());

//         const matchesDateFrom =
//           !filters.dateFrom || sale.date >= filters.dateFrom;

//         const matchesDateTo =
//           !filters.dateTo || sale.date <= filters.dateTo;

//         const matchesTimeFrom =
//           !filters.timeFrom || sale.time >= filters.timeFrom;

//         const matchesTimeTo =
//           !filters.timeTo || sale.time <= filters.timeTo;

//         const matchesMinAmount =
//           filters.minAmount === "" ||
//           sale.amount >= Number(filters.minAmount);

//         const matchesMaxAmount =
//           filters.maxAmount === "" ||
//           sale.amount <= Number(filters.maxAmount);

//         return (
//           matchesSearch &&
//           matchesOrder &&
//           matchesTable &&
//           matchesDateFrom &&
//           matchesDateTo &&
//           matchesTimeFrom &&
//           matchesTimeTo &&
//           matchesMinAmount &&
//           matchesMaxAmount
//         );
//       })
//       .sort((a, b) =>
//         sortNewest
//           ? `${b.date} ${b.time}`.localeCompare(`${a.date} ${a.time}`)
//           : `${a.date} ${a.time}`.localeCompare(`${b.date} ${b.time}`)
//       );
//   }, [search, filters, sortNewest]);

//   const totalSales = filteredSales.reduce(
//     (total, sale) => total + sale.amount,
//     0
//   );

//   const inputClass =
//     "w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100";

//   const labelClass =
//     "mb-1.5 block text-xs font-semibold text-gray-600";

//   return (
//     <div className="min-h-screen bg-gray-50 p-4 text-gray-800 sm:p-6 lg:p-8">
//       <div className="mx-auto max-w-7xl space-y-6">

//         {/* Page heading */}
//         <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
//           <div>
//             <p className="mb-1 text-sm text-gray-500">
//               Hotel Management / Transactions
//             </p>
//             <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
//               Sales
//             </h1>
//             <p className="mt-1 text-sm text-gray-500">
//               View and filter your restaurant sales transactions.
//             </p>
//           </div>

//           <div className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-3">
//             <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50">
//               <Receipt size={19} className="text-emerald-600" />
//             </span>
//             <div>
//               <p className="text-xs text-gray-500">Transactions found</p>
//               <p className="text-lg font-bold">
//                 {filteredSales.length}
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* Summary cards */}
//         <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
//           <div className="rounded-xl border border-gray-200 bg-white p-5">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm text-gray-500">
//                   Total sales displayed
//                 </p>
//                 <h2 className="mt-2 text-2xl font-bold">
//                   {currency(totalSales)}
//                 </h2>
//               </div>
//               <div className="rounded-xl bg-emerald-50 p-3">
//                 <Banknote className="text-emerald-600" size={24} />
//               </div>
//             </div>
//           </div>

//           <div className="rounded-xl border border-gray-200 bg-white p-5">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm text-gray-500">
//                   Average transaction
//                 </p>
//                 <h2 className="mt-2 text-2xl font-bold">
//                   {currency(
//                     filteredSales.length
//                       ? Math.round(totalSales / filteredSales.length)
//                       : 0
//                   )}
//                 </h2>
//               </div>
//               <div className="rounded-xl bg-blue-50 p-3">
//                 <ShoppingBag className="text-blue-600" size={24} />
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Search and filter controls */}
//         <div className="rounded-xl border border-gray-200 bg-white p-4 sm:p-5">
//           <div className="flex flex-col gap-3 md:flex-row">
//             <div className="relative flex-1">
//               <Search
//                 size={19}
//                 className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
//               />
//               <input
//                 type="search"
//                 value={search}
//                 onChange={(e) => setSearch(e.target.value)}
//                 placeholder="Search order ID, table, receipt or amount..."
//                 className={`${inputClass} pl-10`}
//                 aria-label="Search sales"
//               />
//             </div>

//             <button
//               type="button"
//               onClick={() => setShowFilters((open) => !open)}
//               className={`flex items-center justify-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-semibold transition ${
//                 showFilters
//                   ? "border-emerald-600 bg-emerald-50 text-emerald-700"
//                   : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
//               }`}
//             >
//               <SlidersHorizontal size={17} />
//               Filters
//               <ChevronDown
//                 size={16}
//                 className={`transition-transform ${
//                   showFilters ? "rotate-180" : ""
//                 }`}
//               />
//             </button>

//             <button
//               type="button"
//               onClick={resetFilters}
//               className="flex items-center justify-center gap-2 rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-semibold text-gray-600 hover:bg-gray-50"
//             >
//               <RotateCcw size={16} />
//               Reset
//             </button>
//           </div>

//           {/* Expandable filters */}
//           {showFilters && (
//             <div className="mt-5 border-t border-gray-100 pt-5">
//               <div className="mb-4 flex items-center justify-between">
//                 <h3 className="font-semibold">Filter sales</h3>
//                 <button
//                   type="button"
//                   onClick={() => setShowFilters(false)}
//                   aria-label="Close filters"
//                   className="rounded-lg p-2 text-gray-500 hover:bg-gray-100"
//                 >
//                   <X size={17} />
//                 </button>
//               </div>

//               <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
//                 <div>
//                   <label className={labelClass}>Date from</label>
//                   <div className="relative">
//                     <CalendarDays
//                       size={16}
//                       className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
//                     />
//                     <input
//                       type="date"
//                       value={filters.dateFrom}
//                       onChange={(e) =>
//                         updateFilter("dateFrom", e.target.value)
//                       }
//                       className={`${inputClass} pl-9`}
//                     />
//                   </div>
//                 </div>

//                 <div>
//                   <label className={labelClass}>Date to</label>
//                   <div className="relative">
//                     <CalendarDays
//                       size={16}
//                       className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
//                     />
//                     <input
//                       type="date"
//                       min={filters.dateFrom || undefined}
//                       value={filters.dateTo}
//                       onChange={(e) =>
//                         updateFilter("dateTo", e.target.value)
//                       }
//                       className={`${inputClass} pl-9`}
//                     />
//                   </div>
//                 </div>

//                 <div>
//                   <label className={labelClass}>Time from</label>
//                   <div className="relative">
//                     <Clock3
//                       size={16}
//                       className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
//                     />
//                     <input
//                       type="time"
//                       value={filters.timeFrom}
//                       onChange={(e) =>
//                         updateFilter("timeFrom", e.target.value)
//                       }
//                       className={`${inputClass} pl-9`}
//                     />
//                   </div>
//                 </div>

//                 <div>
//                   <label className={labelClass}>Time to</label>
//                   <div className="relative">
//                     <Clock3
//                       size={16}
//                       className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
//                     />
//                     <input
//                       type="time"
//                       value={filters.timeTo}
//                       onChange={(e) =>
//                         updateFilter("timeTo", e.target.value)
//                       }
//                       className={`${inputClass} pl-9`}
//                     />
//                   </div>
//                 </div>

//                 <div>
//                   <label className={labelClass}>Minimum amount (KES)</label>
//                   <input
//                     type="number"
//                     min="0"
//                     value={filters.minAmount}
//                     onChange={(e) =>
//                       updateFilter("minAmount", e.target.value)
//                     }
//                     placeholder="e.g. 1000"
//                     className={inputClass}
//                   />
//                 </div>

//                 <div>
//                   <label className={labelClass}>Maximum amount (KES)</label>
//                   <input
//                     type="number"
//                     min="0"
//                     value={filters.maxAmount}
//                     onChange={(e) =>
//                       updateFilter("maxAmount", e.target.value)
//                     }
//                     placeholder="e.g. 10000"
//                     className={inputClass}
//                   />
//                 </div>

//                 <div>
//                   <label className={labelClass}>Order ID</label>
//                   <input
//                     type="text"
//                     value={filters.orderId}
//                     onChange={(e) =>
//                       updateFilter("orderId", e.target.value)
//                     }
//                     placeholder="ORD-1001"
//                     className={inputClass}
//                   />
//                 </div>

//                 <div>
//                   <label className={labelClass}>Table ID / number</label>
//                   <input
//                     type="text"
//                     value={filters.tableId}
//                     onChange={(e) =>
//                       updateFilter("tableId", e.target.value)
//                     }
//                     placeholder="T-01"
//                     className={inputClass}
//                   />
//                 </div>
//               </div>

//               <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
//                 <p className="text-sm text-gray-500">
//                   Showing {filteredSales.length} matching transactions
//                 </p>
//                 <button
//                   type="button"
//                   onClick={() => setShowFilters(false)}
//                   className="rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700"
//                 >
//                   Done
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Sales table */}
//         <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
//           <div className="flex flex-col gap-3 border-b border-gray-100 p-5 sm:flex-row sm:items-center sm:justify-between">
//             <div>
//               <h2 className="font-bold">Sales transactions</h2>
//               <p className="mt-1 text-sm text-gray-500">
//                 A record of completed orders and receipts.
//               </p>
//             </div>

//             <button
//               type="button"
//               onClick={() => setSortNewest((value) => !value)}
//               className="flex items-center gap-2 self-start rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium hover:bg-gray-50 sm:self-auto"
//             >
//               <ArrowUpDown size={16} />
//               {sortNewest ? "Newest first" : "Oldest first"}
//             </button>
//           </div>

//           <div className="overflow-x-auto">
//             <table className="w-full min-w-[760px] text-left text-sm">
//               <thead className="bg-gray-50 text-xs uppercase tracking-wider text-gray-500">
//                 <tr>
//                   <th className="px-5 py-4 font-semibold">Table No.</th>
//                   <th className="px-5 py-4 font-semibold">Order ID</th>
//                   <th className="px-5 py-4 font-semibold">Date</th>
//                   <th className="px-5 py-4 font-semibold">Time</th>
//                   <th className="px-5 py-4 text-right font-semibold">
//                     Amount
//                   </th>
//                   <th className="px-5 py-4 font-semibold">Receipt No.</th>
//                 </tr>
//               </thead>

//               <tbody className="divide-y divide-gray-100">
//                 {filteredSales.map((sale) => (
//                   <tr
//                     key={sale.orderId}
//                     className="transition hover:bg-gray-50"
//                   >
//                     <td className="whitespace-nowrap px-5 py-4">
//                       <span className="rounded-md bg-gray-100 px-2.5 py-1 font-semibold text-gray-700">
//                         {sale.tableNo}
//                       </span>
//                     </td>

//                     <td className="whitespace-nowrap px-5 py-4 font-semibold text-emerald-700">
//                       {sale.orderId}
//                     </td>

//                     <td className="whitespace-nowrap px-5 py-4 text-gray-600">
//                       {new Date(`${sale.date}T00:00:00`).toLocaleDateString(
//                         "en-KE",
//                         {
//                           day: "2-digit",
//                           month: "short",
//                           year: "numeric",
//                         }
//                       )}
//                     </td>

//                     <td className="whitespace-nowrap px-5 py-4 text-gray-600">
//                       {sale.time}
//                     </td>

//                     <td className="whitespace-nowrap px-5 py-4 text-right font-semibold">
//                       {currency(sale.amount)}
//                     </td>

//                     <td className="whitespace-nowrap px-5 py-4 text-gray-600">
//                       <span className="flex items-center gap-2">
//                         <Receipt size={16} className="text-gray-400" />
//                         {sale.receiptNo}
//                       </span>
//                     </td>
//                   </tr>
//                 ))}

//                 {filteredSales.length === 0 && (
//                   <tr>
//                     <td colSpan="6" className="px-5 py-14 text-center">
//                       <div className="flex flex-col items-center">
//                         <Search
//                           size={30}
//                           className="mb-3 text-gray-300"
//                         />
//                         <p className="font-semibold text-gray-700">
//                           No sales found
//                         </p>
//                         <p className="mt-1 text-sm text-gray-500">
//                           Try changing your search or filters.
//                         </p>
//                         <button
//                           type="button"
//                           onClick={resetFilters}
//                           className="mt-3 font-semibold text-emerald-700 hover:underline"
//                         >
//                           Clear filters
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>

//           <div className="flex flex-col gap-2 border-t border-gray-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
//             <p className="text-sm text-gray-500">
//               {filteredSales.length} transactions
//             </p>
//             <p className="text-sm text-gray-600">
//               Total: <span className="font-bold text-gray-900">
//                 {currency(totalSales)}
//               </span>
//             </p>
//           </div>
//         </div>

//       </div>
//     </div>
//   );
// }


// import React, { useEffect, useMemo, useState } from "react";
// import {
//   Search,
//   SlidersHorizontal,
//   CalendarDays,
//   Clock3,
//   RotateCcw,
//   ChevronDown,
//   ArrowUpDown,
//   Receipt,
//   Banknote,
//   ShoppingBag,
//   X,
//   ChevronLeft,
//   ChevronRight,
// } from "lucide-react";

// // Sample data: replace this with your API data later.
// const salesData = [
//   { tableNo: "T-01", orderId: "ORD-1001", date: "2026-11-02", time: "09:15", amount: 2450, receiptNo: "RCT-5001" ,paymentMode:"M-pesa" },
//   { tableNo: "T-04", orderId: "ORD-1002", date: "2026-11-02", time: "10:30", amount: 1800, receiptNo: "RCT-5002" ,paymentMode: "Card"},
//   { tableNo: "T-02", orderId: "ORD-1003", date: "2026-11-01", time: "13:45", amount: 4200, receiptNo: "RCT-5003"  ,paymentMode:"Bank transfer"},
//   { tableNo: "T-06", orderId: "ORD-1004", date: "2026-11-01", time: "15:20", amount: 1250, receiptNo: "RCT-5004"  ,paymentMode:"cash"},
//   { tableNo: "T-03", orderId: "ORD-1005", date: "2026-10-31", time: "18:10", amount: 3650, receiptNo: "RCT-5005" ,paymentMode:"cash" },
//   { tableNo: "T-08", orderId: "ORD-1006", date: "2026-10-30", time: "20:05", amount: 5800, receiptNo: "RCT-5006"  ,paymentMode:"M-pesa"},
//   { tableNo: "T-05", orderId: "ORD-1007", date: "2026-10-29", time: "12:20", amount: 2100, receiptNo: "RCT-5007" ,paymentMode: "Card"},
//   { tableNo: "T-01", orderId: "ORD-1008", date: "2026-10-28", time: "14:40", amount: 3200, receiptNo: "RCT-5008" ,paymentMode:"Bank-transfer" },
//   { tableNo: "T-07", orderId: "ORD-1009", date: "2026-10-25", time: "19:00", amount: 1650, receiptNo: "RCT-5009"  ,paymentMode:"cash"},
//   { tableNo: "T-02", orderId: "ORD-1010", date: "2026-10-20", time: "08:45", amount: 4700, receiptNo: "RCT-5010"  ,paymentMode:"M-pesa"},
//   { tableNo: "T-09", orderId: "ORD-1011", date: "2026-10-15", time: "16:10", amount: 2800, receiptNo: "RCT-5011"  ,paymentMode:"M-pesa"},
//   { tableNo: "T-03", orderId: "ORD-1012", date: "2026-09-28", time: "20:15", amount: 3900, receiptNo: "RCT-5012" ,paymentMode: "Cash"},
// ];

// const initialFilters = {
//   dateFrom: "",
//   dateTo: "",
//   timeFrom: "",
//   timeTo: "",
//   minAmount: "",
//   maxAmount: "",
//   orderId: "",
//   tableId: "",
// };

// const currency = (amount) =>
//   new Intl.NumberFormat("en-KE", {
//     style: "currency",
//     currency: "KES",
//     maximumFractionDigits: 2,
//   }).format(amount);

// const formatDate = (date) => {
//   const year = date.getFullYear();
//   const month = String(date.getMonth() + 1).padStart(2, "0");
//   const day = String(date.getDate()).padStart(2, "0");
//   return `${year}-${month}-${day}`;
// };

// const getPeriodDates = (period, customFrom, customTo) => {
//   const today = new Date();
//   today.setHours(0, 0, 0, 0);

//   const todayString = formatDate(today);
//   const yesterday = new Date(today);
//   yesterday.setDate(yesterday.getDate() - 1);

//   const sevenDaysAgo = new Date(today);
//   sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6);

//   const thirtyDaysAgo = new Date(today);
//   thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 29);

//   const firstOfThisMonth = new Date(
//     today.getFullYear(),
//     today.getMonth(),
//     1
//   );

//   const firstOfLastMonth = new Date(
//     today.getFullYear(),
//     today.getMonth() - 1,
//     1
//   );

//   const lastOfLastMonth = new Date(
//     today.getFullYear(),
//     today.getMonth(),
//     0
//   );

//   switch (period) {
//     case "today":
//       return { from: todayString, to: todayString };

//     case "yesterday":
//       return {
//         from: formatDate(yesterday),
//         to: formatDate(yesterday),
//       };

//     case "7days":
//       return { from: formatDate(sevenDaysAgo), to: todayString };

//     case "30days":
//       return { from: formatDate(thirtyDaysAgo), to: todayString };

//     case "thisMonth":
//       return { from: formatDate(firstOfThisMonth), to: todayString };

//     case "lastMonth":
//       return {
//         from: formatDate(firstOfLastMonth),
//         to: formatDate(lastOfLastMonth),
//       };

//     case "custom":
//       return {
//         from: customFrom,
//         to: customTo || todayString,
//       };

//     default:
//       return { from: "", to: "" };
//   }
// };

// export default function Sales() {
//   const [search, setSearch] = useState("");
//   const [showFilters, setShowFilters] = useState(false);
//   const [filters, setFilters] = useState(initialFilters);
//   const [paymentFilter, setPaymentFilter] = useState("All");
//   const [period, setPeriod] = useState("all");
//   const [customFrom, setCustomFrom] = useState("");
//   const [customTo, setCustomTo] = useState("");
//   const [sortNewest, setSortNewest] = useState(true);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [rowsPerPage, setRowsPerPage] = useState(5);
  

//   const updateFilter = (key, value) => {
//     setFilters((previous) => ({
//       ...previous,
//       [key]: value,
//     }));
//   };

//   const resetFilters = () => {
//     setFilters({ ...initialFilters });
//     setSearch("");
//     setPeriod("all");
//     setCustomFrom("");
//     setCustomTo("");
//     setCurrentPage(1);
//   };

//   // Calculate the date range selected in the summary card.
//   const periodDates = useMemo(
//     () => getPeriodDates(period, customFrom, customTo),
//     [period, customFrom, customTo]
//   );

//   // Search and apply every active filter.
//   const filteredSales = useMemo(() => {
//     const query = search.trim().toLowerCase();
    
//     const { from: periodFrom, to: periodTo } = periodDates;

//     return salesData
//       .filter((sale) => {
//         const matchesSearch =
//           !query ||
//           sale.orderId.toLowerCase().includes(query) ||
//           sale.tableNo.toLowerCase().includes(query) ||
//           sale.receiptNo.toLowerCase().includes(query) ||
//           String(sale.amount).includes(query);

//         const matchesOrder =
//           !filters.orderId ||
//           sale.orderId.toLowerCase().includes(
//             filters.orderId.toLowerCase()
//           );

//         const matchesTable =
//           !filters.tableId ||
//           sale.tableNo.toLowerCase().includes(
//             filters.tableId.toLowerCase()
//           );

//         const matchesDateFrom =
//           !filters.dateFrom || sale.date >= filters.dateFrom;

//         const matchesDateTo =
//           !filters.dateTo || sale.date <= filters.dateTo;

//         const matchesTimeFrom =
//           !filters.timeFrom || sale.time >= filters.timeFrom;

//         const matchesTimeTo =
//           !filters.timeTo || sale.time <= filters.timeTo;

//         const matchesMinAmount =
//           filters.minAmount === "" ||
//           sale.amount >= Number(filters.minAmount);

//         const matchesMaxAmount =
//           filters.maxAmount === "" ||
//           sale.amount <= Number(filters.maxAmount);

//         const matchesPeriod =
//           (!periodFrom || sale.date >= periodFrom) &&
//           (!periodTo || sale.date <= periodTo);

//         return (
//           matchesSearch &&
//           matchesOrder &&
//           matchesTable &&
//           matchesDateFrom &&
//           matchesDateTo &&
//           matchesTimeFrom &&
//           matchesTimeTo &&
//           matchesMinAmount &&
//           matchesMaxAmount &&
//           matchesPeriod
//         );
//       })
//       .sort((a, b) => {
//         const dateA = `${a.date} ${a.time}`;
//         const dateB = `${b.date} ${b.time}`;

//         return sortNewest
//           ? dateB.localeCompare(dateA)
//           : dateA.localeCompare(dateB);
//       });
//   }, [search, filters, periodDates, sortNewest]);

//   // Summary values use all filtered transactions, not only this page.
//   const totalSales = filteredSales.reduce(
//     (total, sale) => total + sale.amount,
//     0
//   );

//   const averageSale = filteredSales.length
//     ? totalSales / filteredSales.length
//     : 0;

//   // Pagination.
//   const totalPages = Math.max(
//     1,
//     Math.ceil(filteredSales.length / rowsPerPage)
//   );

//   const paginatedSales = filteredSales.slice(
//     (currentPage - 1) * rowsPerPage,
//     currentPage * rowsPerPage
//   );

//   useEffect(() => {
//     setCurrentPage(1);
//   }, [
//     search,
//     filters,
//     period,
//     customFrom,
//     customTo,
//     rowsPerPage,
//   ]);

//   useEffect(() => {
//     if (currentPage > totalPages) {
//       setCurrentPage(totalPages);
//     }
//   }, [currentPage, totalPages]);

//   const inputClass =
//     "w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100";

//   const labelClass =
//     "mb-1.5 block text-xs font-semibold text-gray-600";

//   return (
//     <div className="min-h-screen bg-gray-50 p-4 text-gray-800 sm:p-6 lg:p-8">
//       <div className="mx-auto max-w-7xl space-y-6">

//         {/* Heading */}
//         <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
//           <div>
//             <p className="mb-1 text-sm text-gray-500">
//               Hotel Management / Transactions
//             </p>
//             <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
//               Sales
//             </h1>
//             <p className="mt-1 text-sm text-gray-500">
//               Monitor and filter restaurant sales transactions.
//             </p>
//           </div>

//           <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3">
//             <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50">
//               <Receipt size={20} className="text-emerald-600" />
//             </span>
//             <div>
//               <p className="text-xs text-gray-500">Transactions found</p>
//               <p className="text-lg font-bold">{filteredSales.length}</p>
//             </div>
//           </div>
//         </div>

//         {/* Summary cards */}
//         <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
//           <div className="rounded-xl border border-gray-200 bg-white p-5">
//             <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
//               <div>
//                 <p className="text-sm text-gray-500">
//                   Total sales displayed
//                 </p>
//                 <h2 className="mt-2 text-2xl font-bold">
//                   {currency(totalSales)}
//                 </h2>
//                 <p className="mt-1 text-xs text-gray-500">
//                   {filteredSales.length} matching transactions
//                 </p>
//               </div>

//               <div className="flex items-center gap-2">
//                 <CalendarDays
//                   size={17}
//                   className="text-emerald-600"
//                 />
//                 <select
//                   value={period}
//                   onChange={(e) => setPeriod(e.target.value)}
//                   className="max-w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:border-emerald-500"
//                   aria-label="Sales period"
//                 >
//                   <option value="all">All time</option>
//                   <option value="today">Today</option>
//                   <option value="yesterday">Yesterday</option>
//                   <option value="7days">Last 7 days</option>
//                   <option value="30days">Last 30 days</option>
//                   <option value="thisMonth">This month</option>
//                   <option value="lastMonth">Last month</option>
//                   <option value="custom">Custom range</option>
//                 </select>
//               </div>
//             </div>

//             {period === "custom" && (
//               <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
//                 <div>
//                   <label className={labelClass}>From date</label>
//                   <input
//                     type="date"
//                     value={customFrom}
//                     max={customTo || undefined}
//                     onChange={(e) => setCustomFrom(e.target.value)}
//                     className={inputClass}
//                   />
//                 </div>
//                 <div>
//                   <label className={labelClass}>To date</label>
//                   <input
//                     type="date"
//                     value={customTo}
//                     min={customFrom || undefined}
//                     onChange={(e) => setCustomTo(e.target.value)}
//                     className={inputClass}
//                   />
//                 </div>
//               </div>
//             )}
//           </div>

//           <div className="rounded-xl border border-gray-200 bg-white p-5">
//             <div className="flex items-center justify-between gap-3">
//               <div>
//                 <p className="text-sm text-gray-500">
//                   Average transaction
//                 </p>
//                 <h2 className="mt-2 text-2xl font-bold">
//                   {currency(averageSale)}
//                 </h2>
//                 <p className="mt-1 text-xs text-gray-500">
//                   Based on filtered sales
//                 </p>
//               </div>
//               <div className="rounded-xl bg-blue-50 p-3">
//                 <Banknote size={24} className="text-blue-600" />
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Search and filters */}
//         <div className="rounded-xl border border-gray-200 bg-white p-4 sm:p-5">
//           <div className="flex flex-col gap-3 md:flex-row">
//             <div className="relative flex-1">
//               <Search
//                 size={19}
//                 className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
//               />
//               <input
//                 type="search"
//                 value={search}
//                 onChange={(e) => setSearch(e.target.value)}
//                 placeholder="Search order ID, table, receipt or amount..."
//                 className={`${inputClass} pl-10`}
//                 aria-label="Search sales"
//               />
//             </div>

//             <button
//               type="button"
//               onClick={() => setShowFilters((open) => !open)}
//               aria-expanded={showFilters}
//               className={`flex items-center justify-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-semibold transition ${
//                 showFilters
//                   ? "border-emerald-600 bg-emerald-50 text-emerald-700"
//                   : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
//               }`}
//             >
//               <SlidersHorizontal size={17} />
//               Filters
//               <ChevronDown
//                 size={16}
//                 className={`transition-transform ${
//                   showFilters ? "rotate-180" : ""
//                 }`}
//               />
//             </button>

//             <button
//               type="button"
//               onClick={resetFilters}
//               className="flex items-center justify-center gap-2 rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-semibold text-gray-600 hover:bg-gray-50"
//             >
//               <RotateCcw size={16} />
//               Reset
//             </button>
//           </div>

//           {showFilters && (
//             <div className="mt-5 border-t border-gray-100 pt-5">
//               <div className="mb-4 flex items-center justify-between">
//                 <h3 className="font-semibold">Filter sales</h3>
//                 <button
//                   type="button"
//                   onClick={() => setShowFilters(false)}
//                   aria-label="Close filters"
//                   className="rounded-lg p-2 text-gray-500 hover:bg-gray-100"
//                 >
//                   <X size={17} />
//                 </button>
//               </div>

//               <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
//                 <div>
//                   <label className={labelClass}>Date from</label>
//                   <input
//                     type="date"
//                     value={filters.dateFrom}
//                     max={filters.dateTo || undefined}
//                     onChange={(e) =>
//                       updateFilter("dateFrom", e.target.value)
//                     }
//                     className={inputClass}
//                   />
//                 </div>

//                 <div>
//                   <label className={labelClass}>Date to</label>
//                   <input
//                     type="date"
//                     value={filters.dateTo}
//                     min={filters.dateFrom || undefined}
//                     onChange={(e) =>
//                       updateFilter("dateTo", e.target.value)
//                     }
//                     className={inputClass}
//                   />
//                 </div>

//                 <div>
//                   <label className={labelClass}>Time from</label>
//                   <div className="relative">
//                     <Clock3
//                       size={16}
//                       className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
//                     />
//                     <input
//                       type="time"
//                       value={filters.timeFrom}
//                       onChange={(e) =>
//                         updateFilter("timeFrom", e.target.value)
//                       }
//                       className={`${inputClass} pl-9`}
//                     />
//                   </div>
//                 </div>

//                 <div>
//                   <label className={labelClass}>Time to</label>
//                   <div className="relative">
//                     <Clock3
//                       size={16}
//                       className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
//                     />
//                     <input
//                       type="time"
//                       value={filters.timeTo}
//                       onChange={(e) =>
//                         updateFilter("timeTo", e.target.value)
//                       }
//                       className={`${inputClass} pl-9`}
//                     />
//                   </div>
//                 </div>

//                 <div>
//                   <label className={labelClass}>Minimum amount (KES)</label>
//                   <input
//                     type="number"
//                     min="0"
//                     value={filters.minAmount}
//                     onChange={(e) =>
//                       updateFilter("minAmount", e.target.value)
//                     }
//                     placeholder="e.g. 1000"
//                     className={inputClass}
//                   />
//                 </div>

//                 <div>
//                   <label className={labelClass}>Maximum amount (KES)</label>
//                   <input
//                     type="number"
//                     min="0"
//                     value={filters.maxAmount}
//                     onChange={(e) =>
//                       updateFilter("maxAmount", e.target.value)
//                     }
//                     placeholder="e.g. 10000"
//                     className={inputClass}
//                   />
//                 </div>
//                 <select
//   value={paymentFilter}
//   onChange={(e) => setPaymentFilter(e.target.value)}
//   className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-blue-500"
// >
//   <option value="All">All Payment Methods</option>
//   <option value="Cash">Cash</option>
//   <option value="M-Pesa">M-Pesa</option>
//   <option value="Card">Card</option>
//   <option value="Bank Transfer">Bank Transfer</option>
// </select>

//                 <div>
//                   <label className={labelClass}>Order ID</label>
//                   <input
//                     type="text"
//                     value={filters.orderId}
//                     onChange={(e) =>
//                       updateFilter("orderId", e.target.value)
//                     }
//                     placeholder="ORD-1001"
//                     className={inputClass}
//                   />
//                 </div>

//                 <div>
//                   <label className={labelClass}>Table ID / number</label>
//                   <input
//                     type="text"
//                     value={filters.tableId}
//                     onChange={(e) =>
//                       updateFilter("tableId", e.target.value)
//                     }
//                     placeholder="T-01"
//                     className={inputClass}
//                   />
//                 </div>
//               </div>

//               <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
//                 <p className="text-sm text-gray-500">
//                   {filteredSales.length} matching transactions
//                 </p>
//                 <button
//                   type="button"
//                   onClick={() => setShowFilters(false)}
//                   className="rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700"
//                 >
//                   Done
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Sales table */}
//         <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
//           <div className="flex flex-col gap-3 border-b border-gray-100 p-5 sm:flex-row sm:items-center sm:justify-between">
//             <div>
//               <h2 className="font-bold">Sales transactions</h2>
//               <p className="mt-1 text-sm text-gray-500">
//                 Completed orders and receipts.
//               </p>
//             </div>

//             <button
//               type="button"
//               onClick={() => setSortNewest((value) => !value)}
//               className="flex items-center gap-2 self-start rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium hover:bg-gray-50 sm:self-auto"
//             >
//               <ArrowUpDown size={16} />
//               {sortNewest ? "Newest first" : "Oldest first"}
//             </button>
//           </div>

//           <div className="overflow-x-auto">
//             <table className="w-full min-w-[760px] text-left text-sm">
//               <thead className="bg-gray-50 text-xs uppercase tracking-wider text-gray-500">
//                 <tr>
//                   <th className="px-5 py-4 font-semibold">Table No.</th>
//                   <th className="px-5 py-4 font-semibold">Order ID</th>
//                   <th className="px-5 py-4 font-semibold">Date</th>
//                   <th className="px-5 py-4 font-semibold">Time</th>
//                   <th className="px-5 py-4 text-right font-semibold">Amount</th>
//                   <th className="px-5 py-4 font-semibold">Receipt No.</th>
//                 </tr>
//               </thead>

//               <tbody className="divide-y divide-gray-100">
//                 {paginatedSales.map((sale) => (
//                   <tr key={sale.orderId} className="transition hover:bg-gray-50">
//                     <td className="whitespace-nowrap px-5 py-4">
//                       <span className="rounded-md bg-gray-100 px-2.5 py-1 font-semibold text-gray-700">
//                         {sale.tableNo}
//                       </span>
//                     </td>
//                     <td className="whitespace-nowrap px-5 py-4 font-semibold text-emerald-700">
//                       {sale.orderId}
//                     </td>
//                     <td className="whitespace-nowrap px-5 py-4 text-gray-600">
//                       {new Date(`${sale.date}T00:00:00`).toLocaleDateString(
//                         "en-KE",
//                         {
//                           day: "2-digit",
//                           month: "short",
//                           year: "numeric",
//                         }
//                       )}
//                     </td>
//                     <td className="whitespace-nowrap px-5 py-4 text-gray-600">
//                       {sale.time}
//                     </td>
//                     <td className="whitespace-nowrap px-5 py-4 text-right font-semibold">
//                       {currency(sale.amount)}
//                     </td>
//                     <td className="whitespace-nowrap px-5 py-4 text-gray-600">
//                       <span className="flex items-center gap-2">
//                         <Receipt size={16} className="text-gray-400" />
//                         {sale.receiptNo}
//                       </span>
//                     </td>
//                   </tr>
//                 ))}

//                 {paginatedSales.length === 0 && (
//                   <tr>
//                     <td colSpan={6} className="px-5 py-14 text-center">
//                       <Search size={30} className="mx-auto mb-3 text-gray-300" />
//                       <p className="font-semibold text-gray-700">
//                         No sales found
//                       </p>
//                       <p className="mt-1 text-sm text-gray-500">
//                         Try changing your search or filters.
//                       </p>
//                       <button
//                         type="button"
//                         onClick={resetFilters}
//                         className="mt-3 font-semibold text-emerald-700 hover:underline"
//                       >
//                         Clear filters
//                       </button>
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>

//           {/* Pagination footer */}
//           <div className="flex flex-col gap-4 border-t border-gray-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
//             <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
//               <span>
//                 Showing{" "}
//                 {filteredSales.length === 0
//                   ? 0
//                   : (currentPage - 1) * rowsPerPage + 1}
//                 {" "}–{" "}
//                 {Math.min(currentPage * rowsPerPage, filteredSales.length)}
//                 {" "}of {filteredSales.length}
//               </span>

//               <select
//                 value={rowsPerPage}
//                 onChange={(e) => setRowsPerPage(Number(e.target.value))}
//                 className="rounded-lg border border-gray-200 bg-white px-2 py-1.5 text-sm"
//                 aria-label="Rows per page"
//               >
//                 <option value={5}>5 per page</option>
//                 <option value={10}>10 per page</option>
//                 <option value={20}>20 per page</option>
//               </select>
//             </div>

//             <div className="flex flex-wrap items-center gap-1">
//               <button
//                 type="button"
//                 disabled={currentPage === 1}
//                 onClick={() =>
//                   setCurrentPage((page) => Math.max(1, page - 1))
//                 }
//                 className="flex items-center gap-1 rounded-lg border border-gray-200 px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-40 hover:bg-gray-50"
//               >
//                 <ChevronLeft size={16} />
//                 Previous
//               </button>

//               {Array.from({ length: totalPages }, (_, index) => index + 1)
//                 .filter(
//                   (page) =>
//                     page === 1 ||
//                     page === totalPages ||
//                     Math.abs(page - currentPage) <= 1
//                 )
//                 .map((page, index, pages) => (
//                   <React.Fragment key={page}>
//                     {index > 0 && pages[index - 1] !== page - 1 && (
//                       <span className="px-1 text-gray-400">…</span>
//                     )}

//                     <button
//                       type="button"
//                       onClick={() => setCurrentPage(page)}
//                       aria-current={currentPage === page ? "page" : undefined}
//                       className={`min-w-9 rounded-lg px-3 py-2 text-sm font-medium ${
//                         currentPage === page
//                           ? "bg-emerald-600 text-white"
//                           : "border border-gray-200 text-gray-600 hover:bg-gray-50"
//                       }`}
//                     >
//                       {page}
//                     </button>
//                   </React.Fragment>
//                 ))}

//               <button
//                 type="button"
//                 disabled={currentPage >= totalPages}
//                 onClick={() =>
//                   setCurrentPage((page) => Math.min(totalPages, page + 1))
//                 }
//                 className="flex items-center gap-1 rounded-lg border border-gray-200 px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-40 hover:bg-gray-50"
//               >
//                 Next
//                 <ChevronRight size={16} />
//               </button>
//             </div>
//           </div>

//           {/* Footer totals */}
//           <div className="flex flex-col gap-2 border-t border-gray-100 bg-gray-50 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
//             <p className="text-sm text-gray-500">
//               {filteredSales.length} matching transactions
//             </p>
//             <p className="text-sm text-gray-600">
//               Total sales:{" "}
//               <span className="font-bold text-gray-900">
//                 {currency(totalSales)}
//               </span>
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


