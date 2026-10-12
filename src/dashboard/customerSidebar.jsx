// import * as React from "react";
// import { styled, useTheme } from "@mui/material/styles";
// import Box from "@mui/material/Box";
// import MuiDrawer from "@mui/material/Drawer";
// import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
// import Toolbar from "@mui/material/Toolbar";
// import List from "@mui/material/List";
// import CssBaseline from "@mui/material/CssBaseline";
// import Typography from "@mui/material/Typography";
// import Divider from "@mui/material/Divider";
// import Collapse from "@mui/material/Collapse";
// import IconButton from "@mui/material/IconButton";
// import MenuIcon from "@mui/icons-material/Menu";
// import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
// import ChevronRightIcon from "@mui/icons-material/ChevronRight";
// import ListItemButton from "@mui/material/ListItemButton";
// import ListItemIcon from "@mui/material/ListItemIcon";
// import ListItemText from "@mui/material/ListItemText";
// import {
//   ExpandLess,
//   ExpandMore,
//   Logout,
//   Notifications,
//   Settings,
// } from "@mui/icons-material";
// import { Avatar, Badge, Button, Menu, MenuItem } from "@mui/material";
// import { useLocation, useNavigate } from "react-router";
// import { grey } from "@mui/material/colors";
// import AdminDashboard from "./Dashboards";
// import TeacherDashboard from "../Users/Teacher";
// import StudentDashboard from "../Users/Student";
// import Departmenting from "../TeacherRelated/Departmenting";
// import TeacherProvider from "../TeacherRelated/Teacherdata";
// import StudentProvider from "../StudentRelated/StudentData";
// import ClassLists from "../StudentRelated/ClassLists";
// import Parent from "../Parent/Parent";
// import ParentProvider from "../Parent/ParentData";
// import SubstaffProvider from "../Subordinates/Substaffdata";
// import Substaff from "../Subordinates/Substaff";


// const drawerWidth = 240;

// const openedMixin = (theme) => ({
//   width: drawerWidth,
//   transition: theme.transitions.create("width", {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.enteringScreen,
//   }),
//   overflowX: "hidden",
// });

// const closedMixin = (theme) => ({
//   transition: theme.transitions.create("width", {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.leavingScreen,
//   }),
//   overflowX: "hidden",
//   width: 0,
//   [theme.breakpoints.up("sm")]: {
//     width: 0,
//   },
// });

// const DrawerHeader = styled("div")(({ theme }) => ({
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "flex-end",
//   padding: theme.spacing(0, 1),
//   // necessary for content to be below app bar
//   ...theme.mixins.toolbar,
// }));

// const AppBar = styled(MuiAppBar, {
//   shouldForwardProp: (prop) => prop !== "open",
// })(({ theme }) => ({
//   zIndex: theme.zIndex.drawer + 1,
//   transition: theme.transitions.create(["width", "margin"], {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.leavingScreen,
//   }),
//   variants: [
//     {
//       props: ({ open }) => open,
//       style: {
//         marginLeft: drawerWidth,
//         width: `calc(100% - ${drawerWidth}px)`,
//         transition: theme.transitions.create(["width", "margin"], {
//           easing: theme.transitions.easing.sharp,
//           duration: theme.transitions.duration.enteringScreen,
//         }),
//       },
//     },
//   ],
// }));

// const Drawer = styled(MuiDrawer, {
//   shouldForwardProp: (prop) => prop !== "open",
// })(({ theme }) => ({
//   width: drawerWidth,
//   flexShrink: 0,
//   whiteSpace: "nowrap",
//   boxSizing: "border-box",
//   variants: [
//     {
//       props: ({ open }) => open,
//       style: {
//         ...openedMixin(theme),
//         "& .MuiDrawer-paper": openedMixin(theme),
//       },
//     },
//     {
//       props: ({ open }) => !open,
//       style: {
//         ...closedMixin(theme),
//         "& .MuiDrawer-paper": closedMixin(theme),
//       },
//     },
//   ],
// }));

// export default function CustomerMiniDrawer() {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const theme = useTheme();
//   const [appBarTitle, setAppBarTitle] = React.useState("App");

//   //user account icon
//   const [anchorEl, setAnchoeEl] = React.useState(null);
//   const accountMenu = Boolean(anchorEl);
//   const [open, setOpen] = React.useState(false);
//   const [openButn, setOpenBtn] = React.useState(false);
//   const [openMessenger, setOpenMessenger] = React.useState(false);
//   const [mainBody, setMainBody] = React.useState(null);
//   const [context, setContext] = React.useState(null);

//   const user = location.state;
//   //logout
//   //   React.useEffect(() => {
//   //     if (context === null) {
//   //       navigate("/", { replace: true });
//   //     }
//   //   }, [context]);
//   const handleExpandHrm = () => {
//     setOpenBtn(!openButn);
//     setAppBarTitle("HRM");
//   };

//   const handleMessenger = () => {
//     setOpenMessenger(!openMessenger);
//     setAppBarTitle("Messenger");
//   };

//   const handleDrawerOpen = () => {
//     setOpen(true);
//   };

//   const handleDrawerClose = () => {
//     setOpen(false);
//   };

//   const handleUserAccount = () => {};
//   const handleLogout = () => {
//     context.resetUser();
//     navigate("/");
//   };

//   return (
//     <Box sx={{ display: "flex" }}>
//       <CssBaseline />
//       <AppBar position="fixed" open={open}>
//         <Toolbar>
//           <IconButton
//             color="inherit"
//             aria-label="open drawer"
//             onClick={handleDrawerOpen}
//             edge="start"
//             sx={[
//               {
//                 marginRight: 5,
//               },
//               open && { display: "none" },
//             ]}
//           >
//             <MenuIcon />
//           </IconButton>
//           <Typography variant="h6" noWrap component="div">
//             {appBarTitle}
//           </Typography>
          
//           <Box
//             display={"flex"}
//             justifyContent={"end"}
//             alignItems={"center"}
//             columnGap={2}
//             mb={1}
//             ml={"auto"}
//           >
//             <Badge
//               size="sm"
//               badgeinset="50%"
//               badgeContent={2}
//               color="error"
//               variant="standard"
//             >
//               <IconButton onClick={() => {}}>
//                 <Settings fontSize="small" />
//               </IconButton>
//             </Badge>
//             <IconButton>
//               <Notifications fontSize="small" />
//             </IconButton>
//             <IconButton onClick={(e) => setAnchoeEl(e.currentTarget)}>
//               <Avatar sx={{ width: 32, height: 32 }}>Pic</Avatar>
//             </IconButton>
//             <Menu
//               anchorEl={anchorEl}
//               id="user-account-menu"
//               open={accountMenu}
//               onClose={() => setAnchoeEl(null)}
//               onClick={() => setAnchoeEl(null)}
//               slotProps={{
//                 paper: {
//                   elevation: 0,
//                   sx: {
//                     overflow: "visible",
//                     filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
//                     mt: 1.5,
//                     "& .MuiAvatar-root": {
//                       width: 32,
//                       height: 32,
//                       ml: -0.5,
//                       mr: 1,
//                     },
//                     "&::before": {
//                       content: '""',
//                       display: "block",
//                       position: "absolute",
//                       top: 0,
//                       right: 14,
//                       width: 10,
//                       height: 10,
//                       bgcolor: "background.paper",
//                       transform: "translateY(-50%) rotate(45deg)",
//                       zIndex: 0,
//                     },
//                   },
//                 },
//               }}
//               transformOrigin={{ horizontal: "right", vertical: "top" }}
//               anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
//             >
//               <MenuItem onClick={() => {}}>
//                 <Avatar /> Profile
//               </MenuItem>
//               <Divider />
//               <MenuItem onClick={() => setContext(null)}>
//                 <ListItemIcon>
//                   <Logout fontSize="small" />
//                 </ListItemIcon>
//                 Logout
//               </MenuItem>
//             </Menu>
//           </Box>
//         </Toolbar>
//       </AppBar>
//       <Drawer variant="permanent" open={open}>
//         <DrawerHeader>
//           <Box display={"flex"} alignItems={"center"}>
//             <Avatar />
//             <Typography variant="h6" mr={"auto"}>
//               Cal Max
//             </Typography>
//             <IconButton onClick={handleDrawerClose} sx={{ ml: "auto" }}>
//               {theme.direction === "rtl" ? (
//                 <ChevronRightIcon />
//               ) : (
//                 <ChevronLeftIcon />
//               )}
//             </IconButton>
//           </Box>
//         </DrawerHeader>
//         <Divider />
//         <CustomerDash/>
//       </Drawer>
//       <Box
//         component="main"
//         sx={{ flexGrow: 1, p: 3 }}
//         style={{ maxHeight: "100%", overflow: "auto" }}
//         bgcolor={"#ebecf0"}
//       >
//         <DrawerHeader />

//         {mainBody}
//       </Box>
//     </Box>
//   );
// }


// function CustomerDash(props) {
//   const { setMainBody, setTitle } = props;

//   const [openDashboard, setOpenDashboard] = React.useState(false);
//   const [openAcademics, setOpenAcademics] = React.useState(false);
//   const [openCommunication, setOpenCommunication] = React.useState(false);
//   const [openInventory, setOpenInventory] = React.useState(false);

//   React.useEffect(() => {
//     setMainBody(<TeacherDashboard />);
//   }, []);

//   return (
//     <List>
//       <ListItemButton
//         onClick={() => {
//           setOpenDashboard(!openDashboard);
//           setTitle("Menu");
//         }}
//       >
//         <ListItemText primary="Menu" />
//       </ListItemButton>
//       <ListItemButton
//         onClick={() => {
//           setOpenAcademics(!openAcademics);
//           setTitle("My Orders");
//         }}
//       >
//         <ListItemText primary="Orders" />
//       </ListItemButton>
//       <ListItemButton
//         onClick={() => {
//           setOpenCommunication(!openCommunication);
//         }}
//       >
//         <ListItemText primary="Trending" />
//         {openCommunication ? <ExpandLess /> : <ExpandMore />}
//       </ListItemButton>
//       <Collapse in={openCommunication} timeout="auto" unmountOnExit>
//         <List component="div" disablePadding>
//           <ListItemButton sx={{ pl: 4 }} onClick={() => {}}>
//             <ListItemIcon></ListItemIcon>
//             <ListItemText primary="Newspaper" />
//           </ListItemButton>
//           <ListItemButton sx={{ pl: 4 }} onClick={() => {}}>
//             <ListItemIcon></ListItemIcon>
//             <ListItemText primary="Videos" />
//           </ListItemButton>
//           <ListItemButton sx={{ pl: 4 }} onClick={() => {}}>
//             <ListItemIcon></ListItemIcon>
//             <ListItemText primary="Memes" />
//           </ListItemButton>
//           <ListItemButton sx={{ pl: 4 }} onClick={() => {}}>
//             <ListItemIcon></ListItemIcon>
//             <ListItemText primary="Football" />
//           </ListItemButton>
//         </List>
//       </Collapse>
//       <ListItemButton onClick={() => {}}>
//         <ListItemText primary="Profile" />
//       </ListItemButton>
      
//       <ListItemButton onClick={() => {}}>
//         <ListItemText primary="About Hotman" />
//       </ListItemButton>
//     </List>
//   );
// }

