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
import { ChartNoAxesCombined,  LucideMenu,  Package,  Settings,  Settings2,  ShoppingCartIcon, Utensils, Warehouse } from "lucide-react";

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
  const { content } = props;

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

  return (
    <Box sx={{ display: "flex" }}>
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
          <Typography variant="h6" noWrap component="div">
            {appBarTitle}
          </Typography>
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
            >
              <IconButton onClick={() => {}}>
                <Settings fontSize="medium" />
              </IconButton>
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
            <IconButton>
              <Notifications fontSize="medium" />
            </IconButton>
            <IconButton onClick={(e) => setAnchoeEl(e.currentTarget)}>
              <Avatar sx={{ width: 32, height: 32 }}>Pic</Avatar>
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
              <MenuItem onClick={() => {}}>
                <Avatar /> Profile
              </MenuItem>
              <Divider />
              <MenuItem onClick={() => setContext(null)}>
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Box>
      <Drawer variant="permanent" open={open} className="bg-blue-600">
        <DrawerHeader >
          <Box display={"flex"} alignItems={"center"}>
            <Avatar src="/TRM-logo-green-600.svg" className="size-5"/>
            <Typography className="text-h6 mr-auto font-bold">
              TRM Hot system
            </Typography>
            <IconButton onClick={handleDrawerClose} sx={{ ml: "auto" }}>
              {theme.direction === "rtl" ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
          </Box>
        </DrawerHeader>
        <Divider />
        <AdminDash
          setMainBody={setMainBody}
          setTitle={setAppBarTitle}
          handleClose={handleDrawerClose}
          className="bg-mint-500"
        
        />
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3 }}
        style={{ maxHeight: "100%", overflow: "auto" }}
        bgcolor={"#ebecf0"}
      >
        <DrawerHeader />
        {content}
      </Box>
    </Box>
  );
}

function AdminDash(props) {
  const nav = useNavigate();
  const { setMainBody, setTitle, handleClose } = props;
  const [openAccounts, setOpenAccounts] = React.useState(false);
  const [openCommunication, setOpenCommunication] = React.useState(false);
  const [openInventory, setOpenInventory] = React.useState(false);
  const [openAnalytics, setOpenanalytics] = React.useState(false);

  return (
    <List className="bg-mint-500">
      <ListItemButton
        onClick={() => {
          setMainBody("Dashboard");
          setTitle("Dashboard");
          handleClose();
          // nav("/dashboard", { replace: false });
        }}
      >
        <IconButton>
          <Dashboard/>
        </IconButton>
        <ListItemText primary="Dashboard" />
      </ListItemButton>
      <ListItemButton
        onClick={() => {
          setTitle("Organization");
          nav("/organization", { replace: false });
        }}
      >
          <IconButton>
          <TableRestaurant/>
        </IconButton>
        <ListItemText primary="Organization" />
      </ListItemButton>

      <ListItemButton
        onClick={() => {
          setTitle("Products");

          nav("/products", { replace: false });
        }}
      >
          <IconButton>
          <Package/>
        </IconButton>
        <ListItemText primary="Products" />
      </ListItemButton>
      <ListItemButton
        onClick={() => {
          setTitle("Menu");
          nav("/menu", { replace: false });
        }}
      >
        <IconButton>
          <Utensils/>
        </IconButton>
        <ListItemText primary="Menu" />
      </ListItemButton>
      <ListItemButton
        onClick={() => {
          setTitle("Orders");
          nav("/orders", { replace: false });
        }}
      >
        <IconButton>
          <ShoppingCartIcon/>
        </IconButton>
        <ListItemText primary="Orders" />
      </ListItemButton>
      <ListItemButton
        onClick={() => {
          setTitle("Stock");
          nav("/stock", { replace: false });
        }}
      >
        <IconButton>
          <Warehouse/>
        </IconButton>
        <ListItemText primary="Inventory" />
      </ListItemButton>
      <ListItemButton
        onClick={() => {
          setTitle("Sales");
          nav("/sales", { replace: false });
        }}
      >
        <IconButton>
          <ChartNoAxesCombined/>
        </IconButton>
        <ListItemText primary="Sales" />
      </ListItemButton>
      {/* <ListItemButton
        onClick={() => {
          setTitle("Employees");
          handleClose();
        }}
      >
        <ListItemText primary="Employees" />
      </ListItemButton>

      <ListItemButton
        onClick={() => {
          setTitle("Customers");
        }}
      >
        <ListItemText primary="Customers" />
      </ListItemButton>
      <ListItemButton
        onClick={() => {
          setTitle("Social");
          setOpenCommunication(!openCommunication);
        }}
      >
        <ListItemText primary="Social" />
        {openCommunication ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={openCommunication} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton
            sx={{ pl: 4 }}
            onClick={() => {
              setMainBody(<News />);
            }}
          >
            <ListItemIcon></ListItemIcon>
            <ListItemText primary="Newspaper" />
          </ListItemButton>
          <ListItemButton
            sx={{ pl: 4 }}
            onClick={() => {
              setMainBody(<Videos />);
            }}
          >
            <ListItemIcon></ListItemIcon>
            <ListItemText primary="Videos" />
          </ListItemButton>
          <ListItemButton
            sx={{ pl: 4 }}
            onClick={() => {
              setMainBody(<Memes />);
            }}
          >
            <ListItemIcon></ListItemIcon>
            <ListItemText primary="Memes" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }} onClick={() => {}}>
            <ListItemIcon></ListItemIcon>
            <ListItemText primary="Football" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }} onClick={() => {}}>
            <ListItemIcon></ListItemIcon>
            <ListItemText primary="Wall" />
          </ListItemButton>
        </List>
      </Collapse>
      <ListItemButton
        onClick={() => {
          setOpenInventory(!openInventory);
          setTitle("Inventory");
        }}
      >
        <ListItemText primary="Inventory" />
        {openInventory ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={openInventory} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }} onClick={() => {}}>
            <ListItemIcon></ListItemIcon>
            <ListItemText primary="Fixed assets" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }} onClick={() => {}}>
            <ListItemIcon></ListItemIcon>
            <ListItemText primary="Consumables" />
          </ListItemButton>
        </List>
      </Collapse>
      <ListItemButton
        onClick={() => {
          setTitle("Analytics");
          setOpenanalytics(!openAnalytics);
        }}
      >
        <ListItemText primary="Analytics and AI" />
        {openAnalytics ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={openAnalytics} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }} onClick={() => {}}>
            <ListItemIcon></ListItemIcon>
            <ListItemText primary="Projections" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }} onClick={() => {}}>
            <ListItemIcon></ListItemIcon>
            <ListItemText primary="Reports" />
          </ListItemButton>
        </List>
      </Collapse>

      <ListItemButton
        onClick={() => {
          setTitle("Accounts");
          setOpenAccounts(!openAccounts);
        }}
      >
        <ListItemText primary="Accounts" />
        {openAccounts ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={openAccounts} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }} onClick={() => {}}>
            <ListItemText
              primary={<Typography variant="body2">Payroll</Typography>}
            />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }} onClick={() => {}}>
            <ListItemText
              primary={<Typography variant="body2">Disbursement</Typography>}
            />
          </ListItemButton>
        </List>
      </Collapse> */}

      <ListItemButton
        onClick={() => {
          setTitle("Settings");
          handleClose();
        }}
      >
        <IconButton>
          <Settings2/>
        </IconButton>
        <ListItemText primary="Settings" />
      </ListItemButton>
      <ListItemButton
        onClick={() => {
          setTitle("About Hotman");
          handleClose();
        }}
      >
        <ListItemText primary="About Hotman" />
      </ListItemButton>
    </List>
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
    <DialogContent elevation={2}>
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
