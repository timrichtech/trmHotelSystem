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
import { ChevronsUpIcon, Search } from "lucide-react";


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
    <Stack rowGap={1}>
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
    <Card className="">
      <CardActionArea onClick={handleAdd}>
        <CardMedia
          component="img"
          className=" h-auto"
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
        <Typography variant="h6" className="font-TimesNewRoman">Ksh {price}</Typography>
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
    </Card>
  );
}
