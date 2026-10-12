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


const Sales = () => {
  const { sales } = useContext(MenuContext);
  const [value, setValue] = useState(0);
  const [anchorEl, setanchorEl] = useState(null);
  const openPop = Boolean(anchorEl);
  const [currentSale, setCurrentSale] = useState(null);
  const [openNewProduct, setOpenNewProduct] = useState(false);
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
        <Tab label="Reports" />
      </Tabs>
      <TabPanel value={value} index={0}>
        <Stack rowGap={1}>
          <Box display={"flex"} justifyContent={"space-between"}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Choose date"
                disableFuture
                format="DD MMM YYYY"
              />
            </LocalizationProvider>
            <TextField label="search" sx={{ width: "30%" }} />
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
        </Stack>
      </TabPanel>
      <TabPanel value={value} index={1}>
        Stats
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
