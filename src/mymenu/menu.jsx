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
import { ChevronsUpIcon, Minus, Search, ShoppingCartPlus } from "lucide-react";
import MenuCategories from "./menubutton";


function MyMenu(props) {
  const { state } = useLocation();
  const [search, setSearch] = useState("");
  const [foods] = useState(MenuContext);
  const [activeFilter, setActiveFilter] = useState("All");
    const [activeArea, setActiveArea] = useState("All food_names");
  const [timerChanged, setTimerchange] = useState(false);
  const { food, loadData, setCurrentTable, currentTable, setCart } =
    useContext(MenuContext);
  let myFood = food.filter((fd) => {
    return fd.stock > 0 ? true : false;
  });
 const filteredFoods = food.filter((food) => {
    const matchesStatus =
      activeFilter === "All" || food.food_name === activeFilter;

    const matchesArea =
      activeArea === "All areas" || food.description === activeArea;

    const matchesSearch = String(food.id).includes(search.trim());

    return matchesStatus && matchesArea && matchesSearch;
  });
  // setInterval(()=>{
  //   setTimerchange(!timerChanged);
  // },10000);
  setCurrentTable(state ? state.table : currentTable);
  return (
    <Stack className="gap-1 w-auto pr-auto">
       <Box class="fixed  w-full  text-white  shadow-lg z-50">{ <MenuCategories/>}</Box>
      <Box className="fixed w-screen h-10   p-5  flex justify-end gap-2 z-50">
       
      <div className="relative p-2 flex items-center">
       
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
      <Box  className="gap-2 justify-end flex mr-5">
        <Button
          color="error"
          variant="contained"
          onClick={() => {
            setCart([]);
          }}
        >
          Remove all
        </Button>
        </Box>
        </Box>
      {/* need to add categories of food on top menu  */}
      <div className="w-full mt-40 flex gap-y-2 gap-2 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5" >
        {myFood
          ? myFood.map((fd) => {
              return (
                // <Box item key={fd.id} >
                  <Card item key={fd.id}  className="aspect-auto max-h-fit"> 
                    <MenuCard food={fd} />
                  </Card>
                // </Box>
              );
            })
          : null}
      </div>
      <button className="fixed z-50 bottom-6 right-6 flex h-10 w-10 items-center justify-center rounded-full bg-green-600 text-white shaddow-lg transition-colours duration-200 hover:bg-green-700 focus:outline-none animate-bounce">
        <ChevronsUpIcon className="fixed"  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} />
        </button>
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
    <Card className="border border-gray-200 rounded-lg p-4
              hover:shadow-md transition-shadow">
      <CardActionArea onClick={handleAdd}>
        <CardMedia
          component="img"
          className=" aspect-auto object-contain md:max-h-[20rem] md:min-h-[20rem]"
          src={`http://127.0.0.1:8000/hot${image}`}
          alt={food_name}
        />
        {/* <iframe src={`http://127.0.0.1:8000/hot${image}`}  className="h-auto"> </iframe> */}
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
          <Typography className="font-semibold" variant="h6">
            {food_name}
          </Typography>
          {/* <Button
            variant="contained"
            color="error"
            onClick={handleRemove}
            disabled={getQuantity() > 0 ? false : true}
            
            className="hidden"
          >
            <Minus/>
          </Button> */}
          {getQuantity() > 0 ? <Avatar className="!bg-red-600">{getQuantity()}</Avatar> : null}
        </Box>

        <Typography fontWeight="bold" color={"secondary"}>
          {description}
        </Typography>
        {/* <Typography  className=" text-green-700 font-bold !text-xl">Ksh {price}</Typography> */}
         <span className="text-green-700 font-bold text-xl">
                KSh {price}
              </span>
        {/* large screen display */}
        <Box  className="hidden lg:flex justify-between gap-2">
          <Button
            variant="contained"
            onClick={handleRemove}
            disabled={getQuantity() > 0 ? false : true}
            
            
          >
            Remove
          </Button>
          <Button variant="contained" color="warning"  onClick={handleAdd}>
            {/* <ShoppingCartPlus/> */}
            Add to cart
          </Button>
        </Box>
        {/* small screen display */}
        <Box  className="flex justify-between gap-2 lg:hidden">
          {/* <Button
            variant="contained"
            color="error"
            onClick={handleRemove}
            disabled={getQuantity() > 0 ? false : true}
            
            className="hidden"
          >
            <Minus/>
          </Button> */}
          
          <Button className="w-full" variant="contained" color="warning"  onClick={handleAdd}>
            {/* <ShoppingCartPlus/> */}
            Add to cart
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}
