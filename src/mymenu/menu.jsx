import {
  Avatar,
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Stack,
  Typography,
} from "@mui/material";
import React, { useContext, useState } from "react";
import Grid2 from "@mui/material/Grid2";
import { MenuContext } from "./menudata";
import { useLocation } from "react-router";
import { yellow } from "@mui/material/colors";


function MyMenu(props) {
  const { state } = useLocation();
  const [timerChanged, setTimerchange] = useState(false);
  const { food, loadData, setCurrentTable, currentTable, setCart } =
    useContext(MenuContext);
  let myFood = food.filter((fd) => {
    return fd.stock > 0 ? true : false;
  });

  // setInterval(()=>{
  //   setTimerchange(!timerChanged);
  // },10000);
  setCurrentTable(state ? state.table : currentTable);
  return (
    <Stack rowGap={1}>
      <Box display={"flex"} justifyContent={"end"}>
        <Button
          color="warning"
          variant="contained"
          onClick={() => {
            setCart([]);
          }}
        >
          Remove all
        </Button>
      </Box>
      <Grid2 container gap={2} >
        {myFood
          ? myFood.map((fd) => {
              return (
                <Grid2 item key={fd.id} className=" aspect-auto columns-3xs">
                  <Card elevation={2} sx={{ width: 300 }} className="aspect-auto h-auto">
                    <MenuCard food={fd} />
                  </Card>
                </Grid2>
              );
            })
          : null}
      </Grid2>
    </Stack>
  );
}

export default MyMenu;

function MenuCard(props) {
  const { removeFromCart, addToCart, cart } = useContext(MenuContext);
  const { id, food_name, description, price, image, stock } = props.food;
  const [warning, setWarning] = useState(null);

  const handleAdd = () => {
    if (getQuantity() + 1 <= stock) {
      addToCart(props.food);
    } else {
      setWarning("Cant exceed available!");
    }
  };

  const handleRemove = () => {
    setWarning(null);
    if (getQuantity() > 0) {
      removeFromCart(props.food);
    }
  };

  const getQuantity = () => {
    let quantity = cart.filter((item) => {
      return item.id === id ? true : false;
    });
    if (quantity.length > 0) {
      return quantity[0].quantity !== undefined ? quantity[0].quantity : 0;
    }
    return 0;
  };
  return (
    <>
      <CardActionArea onClick={handleAdd}>
        <CardMedia
          component="img"
          className="max-h-21 h-auto"
          src={`http://127.0.0.1:8000/hot${image}`}
          alt={food_name}
        />
      </CardActionArea>
      <CardContent className="p-2">
        {warning ? (
          <Typography fontWeight={"bold"} color={yellow[800]}>
            {warning}
          </Typography>
        ) : null}
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Typography color={"primary"} variant="h6">
            {food_name}
          </Typography>
          {getQuantity() > 0 ? <Avatar>{getQuantity()}</Avatar> : null}
        </Box>

        <Typography fontWeight="bold" color={"secondary"}>
          {description}
        </Typography>
        <Typography variant="h6">${price}</Typography>
        <Box display={"flex"} justifyContent={"space-between"}>
          <Button
            variant="contained"
            onClick={handleRemove}
            disabled={getQuantity() > 0 ? false : true}
          >
            Remove
          </Button>
          <Button variant="contained" onClick={handleAdd}>
            Add
          </Button>
        </Box>
      </CardContent>
    </>
  );
}
