import { useContext, useState } from "react";
import { MenuContext } from "./menudata";
import {
  Card,
  CardContent,
  TableContainer,
  Table,
  TableCell,
  TableRow,
  TableHead,
  Typography,
  TableBody,
  Button,
  Dialog,
  DialogTitle,
  IconButton,
  Box,
  ListItemButton,
  Popover,
  Paper,
  List,
  ListItemText,
  DialogContent,
  Chip,
  Badge,
} from "@mui/material";
import { Close, MoreVert } from "@mui/icons-material";
import { Payment } from "../dashboard/adminSidebar";
import dayjs from "dayjs";

export default function Orders() {
  const { orders, orderedItems, updateOrder } = useContext(MenuContext);
  const [anchorEl, setanchorEl] = useState(null);
  //current order
  const [order, setOrder] = useState(null);
  const [openPay, setOpenPay] = useState(false);
  const openPop = Boolean(anchorEl);
  const [openItems, setOpenItems] = useState(false);
  const [currOrder, setItems] = useState(null);

  const handleServe = () => {
    const editedOrder = {...order, isServed : true};
    updateOrder(editedOrder);
    setanchorEl(null);

    
  };
  const handleBook = () => {
    const editedOrder = {...order, isBooked : true};
    updateOrder(editedOrder);
    setanchorEl(null);
  };

  const handleCancel = () => {
    const editedOrder = {...order, isCanceled : true};
    updateOrder(editedOrder);
    setanchorEl(null);
  };

  const handleViewOrder = () => {
    setanchorEl(null);
    setOpenItems(true);
  };

  const getOrderItems=()=>{
    if(order !== null){
      const items = orderedItems.filter(item=>{
        return item.order.id === order.id ? true : false;
      });
      return items;
    }
    console.log(orderedItems)
    return []
  }

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
                  <Typography fontWeight={"bold"} variant="body2">
                    Table
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography fontWeight={"bold"} variant="body2">
                    Order ID
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography fontWeight={"bold"} variant="body2">
                    Date
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography fontWeight={"bold"} variant="body2">
                    Time
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography fontWeight={"bold"} variant="body2">
                    Amount
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography fontWeight={"bold"} variant="body2">
                    Status
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography fontWeight={"bold"} variant="body2">
                    Booking
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography fontWeight={"bold"}>Action</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.length > 0 ? (
                orders.map((order, index) => {
                  return (
                    <TableRow key={order.id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{order.table.table_name}</TableCell>
                      <TableCell>{order.id}</TableCell>
                      <TableCell>{dayjs(order.date).format('DD MMM YYYY') }</TableCell>
                      <TableCell>{order.time.split('.')[0]}</TableCell>
                      <TableCell>{order.amount}</TableCell>
                      <TableCell>
                        {order.isPaid ? (
                          <Chip label="Paid" color="success" />
                        ) : (
                          <Button
                            color={order.isServed ? 'warning':"primary"}
                            variant="contained"
                            onClick={() => {
                              setItems(order);
                              setOpenPay(true);
                            }}
                          >
                            Pay
                          </Button>
                        )}
                      </TableCell>
                      <TableCell>
                      <Badge badgeContent='' variant="circular" color={order.isBooked? 'success' :'primary'}></Badge>
                      </TableCell>
                      <TableCell>
                        <IconButton
                          onClick={(e) => {
                            setanchorEl(e.target);
                            setOrder(order);
                          }}
                        >
                          <MoreVert />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell>No orders</TableCell></TableRow>
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
              <ListItemButton onClick={handleServe}>
                <ListItemText primary="Serve" />
              </ListItemButton>
              <ListItemButton onClick={handleBook}>
                <ListItemText primary="Book" />
              </ListItemButton>
              <ListItemButton onClick={handleViewOrder}>
                <ListItemText primary="View" />
              </ListItemButton>
              <ListItemButton onClick={handleCancel}>
                <ListItemText primary="Cancel" />
              </ListItemButton>
            </List>
          </Paper>
        </Popover>
        <Dialog
          open={openPay}
          onClose={() => setOpenPay(false)}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>
            <Box display={"flex"} justifyContent={"space-between"}>
              <Typography variant="h6" color={"primary"} fontWeight={"bold"}>
                Payment
              </Typography>
              <IconButton onClick={() => setOpenPay(false)}>
                <Close color="secondary" />
              </IconButton>
            </Box>
          </DialogTitle>
          <Payment
            amount={currOrder ? currOrder.amount : 0}
            payOrder={updateOrder}
            orderTypeNew={false}
            order={currOrder}
            open = {setOpenPay}
          />
        </Dialog>
        <Dialog
          open={openItems}
          onClose={() => setOpenItems(false)}
          fullWidth
          maxWidth={"md"}
        >
          <DialogTitle>
            <Box display={"flex"} justifyContent={"space-between"}>
              <Typography variant="h6" color={"primary"}>
                Order Items
              </Typography>
              <IconButton onClick={() => setOpenItems(false)}>
                <Close color="secondary" />
              </IconButton>
            </Box>
          </DialogTitle>
          <DialogContent>
            <Box display={"flex"} justifyContent={"end"}>
              Table : {order ? order.table.table_name : "Counter"}{" "}
            </Box>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <Typography fontWeight={"bold"}></Typography>
                    </TableCell>
                    <TableCell>
                      <Typography fontWeight={"bold"} variant="body2">
                        Food
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography fontWeight={"bold"} variant="body2">
                        Quantity
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {order ? (
                    getOrderItems().map((ord, index) => {
                      return (
                        <TableRow key={ord.product} sx={{}}>
                          <TableCell>{index + 1}</TableCell>
                          <TableCell>{ord.product.food_name}</TableCell>
                          <TableCell>{ord.quantity}</TableCell>
                        </TableRow>
                      );
                    })
                  ) : (
                    <TableRow>No items</TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}
