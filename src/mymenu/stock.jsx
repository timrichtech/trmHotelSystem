import { useContext, useEffect, useState } from "react";
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
} from "@mui/material";
import Grid2 from "@mui/material/Grid2";
import { Add, Close, Edit, Remove } from "@mui/icons-material";
import profile_image from "../resources/default_profile.png";
import { MenuContext } from "./menudata";
import { NewProduct } from "./products";

const Stock = () => {
  const { products } = useContext(MenuContext);
  const [value, setValue] = useState(0);
  const [openNewProduct, setOpenNewProduct] = useState(false);
  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box>
      <Tabs value={value} onChange={handleTabChange}>
        <Tab label="List" />
        <Tab label="Stats" />
      </Tabs>
      <TabPanel value={value} index={0}>
        <Stack rowGap={1}>
          <Box display={"flex"} justifyContent={"space-between"}>
            <Button
              variant="contained"
              color="success"
              onClick={() => setOpenNewProduct(true)}
              startIcon={<Add />}
            >
              Add product
            </Button>
            <TextField label="search" sx={{ width: "30%" }} />
          </Box>
          <Stack maxHeight={"60vh"} overflow={"auto"}>
            <Grid2 container gap={2}>
              {products.map((product) => {
                return (
                  <Grid2 item key={product.id}>
                    <Card elevation={2}>
                      <Product product={product} />
                    </Card>
                  </Grid2>
                );
              })}
              <Grid2 item key={"special"}>
                <Card elevation={2} sx={{ bgcolor: "aliceblue" }}>
                  <CardActionArea
                    onClick={() => setOpenNewProduct(true)}
                    sx={{
                      width: 140,
                      height: 140,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Add fontSize="large" />
                  </CardActionArea>
                </Card>
              </Grid2>
            </Grid2>
          </Stack>
        </Stack>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <SalesRate />
      </TabPanel>
      <Dialog
        open={openNewProduct}
        onClose={() => setOpenNewProduct(false)}
        fullWidth
        maxWidth={"md"}
      >
        <DialogTitle>
          <Box display={"flex"} justifyContent={"space-between"}>
            <Typography variant="h6" color={"primary"}>
              Create Product
            </Typography>
            <IconButton onClick={() => setOpenNewProduct(false)}>
              <Close color="secondary" />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          <NewProduct setOpen={setOpenNewProduct} />
        </DialogContent>
      </Dialog>
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

export default Stock;

function Product(props) {
  const { changeStock } = useContext(MenuContext);
  const { food_name, description, price, image, stock } = props.product;
  const [quantity, setQuantity] = useState(stock);

  const handleAdd = () => {
    setQuantity(quantity + 1);
  };

  const handleRemove = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };
  // src={`http://127.0.0.1:8000/hot${image}`}
  useEffect(() => {
    changeStock(props.product, quantity);
  }, [quantity, props.product]);
  return (
    <>
      <CardMedia
        component="img"
        height={150}
        src={"../resources/andazi.jfif"}
        alt={food_name}
      />
      <CardContent>
       <CardMedia src={`http://127.0.0.1:8000/hot${image}`}
       alt={food_name}
       />
       

        <Typography fontWeight="bold" color={"secondary"}>
          {description}
        </Typography>
        <Typography variant="h6">Ksh.{price}</Typography>
        <Box
          
          className="flex justify-between align-center"
        >
          <IconButton onClick={handleRemove}>
            <Remove />
          </IconButton>
          <TextField
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="p-1 text-center"
          />
          <IconButton onClick={handleAdd}>
            <Add />
          </IconButton>
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
