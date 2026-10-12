import { useContext, useState } from "react";
import { MenuContext } from "../mymenu/menudata";
import { Box, Button, Card, CardContent, Dialog, DialogTitle, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { Add, Close, Remove } from "@mui/icons-material";
import { Payment } from "../dashboard/adminSidebar";
import { useNavigate } from "react-router";

export default function MyCart() {
    const { cart, setCart, currentTable, addToOrders, getTotal, addToCart,
        removeFromCart } =
      useContext(MenuContext);
      
    const [openPay, setOpenPay] = useState(false);
    const nav = useNavigate();

    const getQuantity = (id)=>{
      let quantity = cart.filter(item=>{
        return item.id===id ? true :false;
      });
      if(quantity.length>0){
        return quantity[0].quantity!==undefined ? quantity[0].quantity : 0;
      }
      return 0;
    }

    const handleAdd = (item) => {
      if(getQuantity(item.id)+1 <= item.stock){
        addToCart(item);
      }else{
        alert('Cant exceed available!');
      }
          
    };

    return (
      <Card>
        <CardContent>
          {cart.length > 0 ?<>
          <Box display={"flex"} justifyContent={"end"}>
            <Typography variant="h6" color={"primary"}>
              Table : {currentTable ? currentTable.table_name : "None"}
            </Typography>
          </Box>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Typography fontWeight={"bold"}></Typography>
                  </TableCell>
                  <TableCell>
                    <Typography fontWeight={"bold"}>Food</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography fontWeight={"bold"}>Price</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography fontWeight={"bold"}>Quantity</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography fontWeight={"bold"}>Amount</Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cart.map((food, index) => {
                  return (
                    <TableRow key={food.id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{food.food_name}</TableCell>
                      <TableCell>{food.price}</TableCell>
                      <TableCell><Box><IconButton onClick={()=>removeFromCart(food)}><Remove/></IconButton>{food.quantity}<IconButton onClick={()=>handleAdd(food)}><Add/></IconButton></Box></TableCell>
                      <TableCell>{food.price * food.quantity}</TableCell>
                    </TableRow>
                  );
                })}
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell>
                    <Typography fontWeight={"bold"}>Total</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography fontWeight={"bold"}>{getTotal()}</Typography>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <Box display={"flex"} justifyContent={"space-evenly"} mt={2}>
            <Button variant="contained" onClick={() => setOpenPay(true)}>
              Pay
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                addToOrders({ pay_status: false });alert('Order placed successfully');
                nav('/menu', {replace:true})
                
              }}
            >
              Order
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={() => {
                setCart([]);
                nav('/menu', {replace:true});
              }}
            >
              Clear
            </Button>
          </Box> </> : <Typography color='primary' fontWeight= 'bold'>Cart is empty</Typography>
          }
        </CardContent>
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
            amount={getTotal()}
            addToOrders={addToOrders}
            orderTypeNew={true}
            open={setOpenPay}
          />
        </Dialog>
      </Card>
    );
  }