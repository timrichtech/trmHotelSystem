import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import {
  Close,
  Dashboard,
  ExpandLess,
  ExpandMore,
  FoodBank,
  Logout,
  Notifications,
  
  ShoppingCart,
  Store,
  TableRestaurant,
} from "@mui/icons-material";
import {
  Avatar,
  Backdrop,
  Badge,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  Menu,
  MenuItem,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router";
import MyMenu from "../mymenu/menu";
import { useFormik } from "formik";
import Orders from "../mymenu/orders";
import Products from "../mymenu/products";
import Sales from "../mymenu/sales";
import News from "../mymenu/newspaper";
import Videos from "../mymenu/videos";
import Memes from "../mymenu/memes";
import { MenuContext } from "../mymenu/menudata";
import { blue } from "@mui/material/colors";
import { BedDouble, Bell, Building2, ChartNoAxesCombined,  ChevronDown,  ClosedCaption,  LayoutDashboard,  LogOut,  LucideMenu,  Package,  Settings,  Settings2,  ShoppingCartIcon, Table2, Table2Icon, Utensils, Warehouse } from "lucide-react";
import { useState } from "react";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: 0,
  [theme.breakpoints.up("sm")]: {
    width: 0,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  variants: [
    {
      props: ({ open }) => open,
      style: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(["width", "margin"], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    },
  ],
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  variants: [
    {
      props: ({ open }) => open,
      style: {
        ...openedMixin(theme),
        "& .MuiDrawer-paper": openedMixin(theme),
      },
    },
    {
      props: ({ open }) => !open,
      style: {
        ...closedMixin(theme),
        "& .MuiDrawer-paper": closedMixin(theme),
      },
    },
  ],
}));

export default function AdminMiniDrawer(props) {
  const navigate = useNavigate();
  const theme = useTheme();
  const [appBarTitle, setAppBarTitle] = React.useState("App");
  const { content,navigation} = props;

  const { cart } = React.useContext(MenuContext);

  //user account icon
  const [anchorEl, setAnchoeEl] = React.useState(null);
  const accountMenu = Boolean(anchorEl);
  const [open, setOpen] = React.useState(false);
  const [mainBody, setMainBody] = React.useState("Dashboard under dev");
  const [context, setContext] = React.useState(null);

  //logout
  //   React.useEffect(() => {
  //     if (context === null) {
  //       navigate("/", { replace: true });
  //     }
  //   }, [context]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleUserAccount = () => {};
  const handleLogout = () => {
    context.resetUser();
    navigate("/");
  };

  const handleViewCart = () => {
    navigate("/cart", { replace: false });
  };
  
const [active, setActive] = useState("Dashboard");
const [notificationsOpen, setNotificationsOpen] = useState(false);
  return (
    <Box  className="flex bg-white">
      {/* <CssBaseline />My app bar */}
      <Box position="fixed" open={open} className="bg-green-600 w-full z-50">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={[
              {
                marginRight: 5,
              },
              open && { display: "none" },
            ]}
          >
            <MenuIcon />
          </IconButton>
         <Stack className="min-w-0">
              <Typography className="truncate text-sm font-semibold text-gray-800">
                {active}
              </Typography>
            </Stack>
          <Box
            display={"flex"}
            justifyContent={"end"}
            alignItems={"center"}
            columnGap={2}
            mb={1}
            ml={"auto"}
          >
            <Badge
              size="sm"
              badgeinset="50%"
              badgeContent={2}
              color="error"
              variant="standard"
              className="hidden md:flex"
            >
              <Button  className="relative rounded-xl  border-gray-100 p-2.5 text-yellow hover:bg-gray-50">
                <Settings size={19} />
              </Button>
            </Badge>
            <Badge
              size="sm"
              badgeinset="50%"
              badgeContent={cart ? cart.length : 0}
              color="error"
              variant="standard"
            >
              <IconButton onClick={handleViewCart}>
                <ShoppingCart fontSize="medium" className="text-[#CB5A0A]"/>
              </IconButton>
            </Badge>
            <div className="relative">
              {/* notification button */}
               <Badge
              size="sm"
              badgeinset="50%"
              badgeContent={2}
              color="error"
              variant="standard"
            >
              <button
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="relative rounded-xl  border-gray-100 p-2.5 text-yellow hover:bg-gray-50"
                aria-label="Notifications"
              >
                <Bell size={19} />
                {/* <span className="absolute right-2 top-2 h-2 w-2 rounded-full border-2 border-white bg-red-500" /> */}
              </button>
              </Badge>

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
            <IconButton onClick={(e) => setAnchoeEl(e.currentTarget)}>
              <Avatar sx={{ width: 32, height: 32 }} className="text-green-600 font-bold">
                A
              </Avatar>
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              id="user-account-menu"
              open={accountMenu}
              onClose={() => setAnchoeEl(null)}
              onClick={() => setAnchoeEl(null)}
              slotProps={{
                paper: {
                  elevation: 0,
                  sx: {
                    overflow: "visible",
                    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                    mt: 1.5,
                    "& .MuiAvatar-root": {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                    "&::before": {
                      content: '""',
                      display: "block",
                      position: "absolute",
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: "background.paper",
                      transform: "translateY(-50%) rotate(45deg)",
                      zIndex: 0,
                    },
                  },
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
                <button className="flex items-center gap-2 rounded-xl p-1.5 hover:bg-gray-50">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-green-600 text-sm font-bold text-white">
                A
              </div>
              <div className=" text-left sm:block">
                <p className="text-sm font-semibold text-gray-800">
                  Administrator
                </p>
                <p className="text-xs text-gray-400">Hotel Manager</p>
              </div>
              <ChevronDown size={16} className="hidden text-gray-400 sm:block" />
            </button>
              {/* <MenuItem onClick={() => {}}>
                <Avatar /> Profile
              </MenuItem>
              <Divider />
              <MenuItem onClick={() => setContext(null)}>
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                Logout
              </MenuItem> */}
            </Menu>
          </Box>
        </Toolbar>
      </Box>
      <Drawer variant="permanent" open={open} className="p-1 z-50">
        <DrawerHeader className="pt-2">
        {/* <Stack className="flex  shrink-0 items-center justify-between border-b border-gray-100 px-2"> */}
          <Box className="flex items-center gap-1">
            <div className="flex ml-2  p-3 h-11 w-11 items-center justify-center rounded-xl bg-green-600 text-2xl font-black text-white">
                TRM
              {/* <img src="../resources/images/CR" alt="TRM Logo" width="500" height="300"></img> */}
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900">
                TRM Hot system
              </h1>
              <p className="text-xs text-gray-500">
                Hotel Management
              </p>
            </div>
            <IconButton onClick={()=> handleDrawerClose()}>
              <Close className=""/>
            </IconButton>
            </Box>
          {/* </Stack> */}
        </DrawerHeader>
        <Divider />
        <AdminDash
          setMainBody={setMainBody}
          setTitle={setAppBarTitle}
          handleClose={handleDrawerClose}
           active={active}
        setActive={setActive}
          className="bg-mint-500"

        
        />
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3 }}
        style={{ maxHeight: "100%", overflow: "auto" }}
        // bgcolor={"#ebecf0"}
        className="bg-white"

      >
        <DrawerHeader />
        <div className="">
          {content}
          </div>
      </Box>
    </Box>
  );
}
const navigation = [
  { label: "Dashboard", icon: LayoutDashboard ,navpath: "/dashboard"},
  { label: "Tables", icon: Table2 ,navpath: "/table"},
  { label: "Organization", icon: TableRestaurant ,navpath: "/organization"},
  { label: "Products", icon: Package,navpath: "/products" },
  { label: "Menu", icon: Utensils,navpath: "/menu" },
  { label: "Orders", icon: ShoppingCart ,navpath: "/orders"},
  { label: "Food Inventory", icon: Warehouse ,navpath: "/stock"},
  { label: "Kitchen Inventory", icon: Warehouse ,navpath: "/Kitchen"},
  { label: "Sales", icon: ChartNoAxesCombined ,navpath: "/sales"},
  { label: "Settings", icon: Settings ,},
];
 
function AdminDash( { active, setActive,setMainBody,setTitle,handleClose }) {
  const nav = useNavigate();
  
  // const { setMainBody, setTitle, handleClose } = props;
  

  return (
    <Stack className="">
      <Typography className="mb-3 px-3 text-[11px] font-bold uppercase tracking-[0.16em] text-gray-400">
            Main menu
          </Typography>
           <nav className="space-y-1  gap-y-2">
            {navigation.map(({ label, icon: Icon, navpath }) => {
              const selected = active === label;

              return (
                <button
                  key={label}
                  onClick={() => {
                    setActive(label);
                    setMainBody(navpath);
                    nav(navpath);
                    handleClose()

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
        <div className="mt-auto p-4">
          <div className="rounded-2xl bg-green-50 p-4">
            {/* <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-lg bg-white text-green-700">
              <BedDouble size={19} />
            </div> */}
            <p className="text-sm font-semibold text-gray-800">
              Need assistance?
            </p>
            <p className="mt-1 text-xs leading-5 text-gray-500 text-wrap">
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
      </nav>
       
    </Stack>
  );
}

export function Payment(props) {
  const { amount, addToOrders, orderTypeNew, open } = props;
  const { payOrder, order } = props;
  const [error, setError] = React.useState(null);
  const [openBackdrop, setOpenbackdrop] = React.useState(false);

  const myForm = useFormik({
    initialValues: {
      cash: amount,
      mpesa: "",
      phone_number: "",
    },
    onSubmit: (values) => {
      if (values.cash + values.mpesa < amount) {
        setError("Pay all amount");
      } else if (values.cash + values.mpesa > amount) {
        setError("You have exceeded the required amount");
      } else {
        setError(null);
      }
      if (values.mpesa > 0 && values.phone_number.length < 10) {
        setError("Provide a valid phone number");
      }
      setOpenbackdrop(true);

      if (orderTypeNew && Number(values.cash + values.mpesa) === amount) {
        addToOrders({ pay_status: true, newOrder: orderTypeNew });
      } else if (parseInt(values.cash + values.mpesa, 10) === amount) {
        payOrder({ ...order, isPaid: true });
        open(false);
      }
      setOpenbackdrop(false);
    },
  });
  return (
    <DialogContent className="z-10">
      <Stack rowGap={2}>
        <Box display={"flex"} justifyContent={"end"} px={3}>
          <Typography fontWeight={"bold"}>Amount : {amount}</Typography>
        </Box>
        {error ? <Typography color={"error"}>{error}</Typography> : null}
        <form onSubmit={myForm.handleSubmit}>
          <Stack rowGap={2}>
            <TextField
              autoFocus
              label="Cash"
              name="cash"
              id="cash"
              type="number"
              value={myForm.values.cash}
              onChange={myForm.handleChange}
              onBlur={myForm.handleBlur}
            />
            <TextField
              label="Mpesa"
              name="mpesa"
              type="number"
              id="mpesa"
              value={myForm.values.mpesa}
              onChange={myForm.handleChange}
              onBlur={myForm.handleBlur}
            />
            <TextField
              label="Phone number"
              name="phone_number"
              id="phone_number"
              type="number"
              value={myForm.values.phone_number}
              onChange={myForm.handleChange}
              onBlur={myForm.handleBlur}
            />
            <Button variant="contained" type="submit">
              pay
            </Button>
          </Stack>
        </form>
      </Stack>
      <Backdrop open={openBackdrop} onClose={() => setOpenbackdrop(false)}>
        <CircularProgress />
      </Backdrop>
    </DialogContent>
  );
}
