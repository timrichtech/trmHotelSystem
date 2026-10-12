import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material";
import { indigo, pink } from "@mui/material/colors";
import CustomerMiniDrawer from "./dashboard/customerSidebar";
import EmployeeMiniDrawer from "./dashboard/employeeSidebar";
import AdminMiniDrawer from "./dashboard/adminSidebar";
import MenuProvider from "./mymenu/menudata";
import Authenticate from "./AUTH/auth";
import AuthProvider from "./AUTH/authenticator";
import Orgs from "./mymenu/org";
import OrganProvider from "./ORGANIZER/organizer";
import MyMenu from "./mymenu/menu";
import Cart from "./cart/cart";
import Orders from "./mymenu/orders";
import Products from "./mymenu/products";
import Stock from "./mymenu/stock";
import Sales from "./mymenu/sales";
import Employee from "./employees/employees";
import Dashboard from "./dashboard/Dashboard";

const myTheme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "1rem",
          height: "1.5rem",
          textTransform: "none",
          textWrap: "balance",
          // backgroundColor:"mint",
        },
      },
    },
    MuiStepConnector: {
      defaultProps: {},
    },
    MuiTextField: {
      styleOverrides: {
        root: {},
      },
      defaultProps: {},
    },
  },
  palette: {
    primary: indigo,
    secondary: pink,
  },
});

function App() {
  return (
    <ThemeProvider theme={myTheme}>
      <BrowserRouter>
        <Routes>

          <Route
            path="/login"
            element={<AuthProvider children={<Authenticate />}></AuthProvider>}
          />
          <Route path="/customerdashboard" element={<CustomerMiniDrawer />} />
          <Route
            path="/admindashboard"
            element={
              <MenuProvider children={<AdminMiniDrawer />}></MenuProvider>
            }
          />
          <Route path="/employeedashboard" element={<EmployeeMiniDrawer />} />
          <Route
            path="/menu"
            element={
              <MenuProvider
                children={<AdminMiniDrawer content={<MyMenu />} />}
              ></MenuProvider>
            }
          />
          <Route
            path="/cart"
            element={
              <MenuProvider
                children={<AdminMiniDrawer content={<Cart />} />}
              ></MenuProvider>
            }
          />
          <Route
            path="/stock"
            element={
              <MenuProvider
                children={<AdminMiniDrawer content={<Stock />} />}
              ></MenuProvider>
            }
          />
          <Route path="/users" element={null} />
          <Route
            path="/orders"
            element={
              <MenuProvider
                children={<AdminMiniDrawer content={<Orders />} />}
              />
            }
          />
          <Route
            path="/dashboard"
            element={
              <MenuProvider
                children={<AdminMiniDrawer content={<Dashboard/>} />}
              />
            }
          />

          <Route
            path="/products"
            element={
              <MenuProvider
                children={<AdminMiniDrawer content={<Products />} />}
              />
            }
          />
          <Route
            path="/sales"
            element={
              <MenuProvider
                children={<AdminMiniDrawer content={<Sales />} />}
              />
            }
          />
          <Route
            path="/organization"
            element={
              <MenuProvider
                children={
                  <MenuProvider
                    children={
                      <OrganProvider
                        children={<AdminMiniDrawer content={<Orgs />} />}
                      />
                    }
                  />
                }
              />
            }
          />
          <Route
            path="/employees"
            element={
              <MenuProvider
                children={<AdminMiniDrawer content={<Employee />} />}
              />
            }
          />
          <Route path="/entertainment" element={null} />
          <Route path="/assignments" element={null} />
          <Route path="/accounts" element={null} />
          <Route path="/attendance" element={null} />
          <Route path="/wall" element={null} />
          <Route path="/settings" element={null} />
          <Route path="/meet" element={null} />
          <Route path="/inventory" element={null} />

          {/* ==================================== */}
          {/* <Route path="/library" element={null} /> */}
          {/* <Route path="/dashboard" element={<Dashboard />}></Route>         */}
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
