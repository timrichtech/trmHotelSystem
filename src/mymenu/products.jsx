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
} from "@mui/material";
import Grid2 from "@mui/material/Grid2";
import { Add, Close, Edit } from "@mui/icons-material";
import profile_image from "../resources/default_profile.png";
import { MenuContext } from "./menudata";
import { useFormik } from "formik";
import { values } from "lodash";
import { Plus, X } from "lucide-react";

const Products = () => {
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
        <Tab label="Sale Rates" />
      </Tabs>
      <TabPanel value={value} index={0}>
        <Stack rowGap={1}>
          <Box display={"flex"} justifyContent={"space-between"}>
         
             <button
              
              onClick={() => setOpenNewProduct(true)}
              className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm shadow-blue-200 hover:bg-blue-700"
            >
              <Plus size={18} />
              Add product
            </button>
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
        className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4 backdrop-blur-sm"
      >
        <DialogTitle>
           <div className="mb-5 flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-bold text-slate-900">Add food product</h3>
                      <p className="mt-1 text-sm text-slate-500">Register a new item in your restaurant menu.</p>
                    </div>
                    <button
              // onClick={onClose}
              onClick={() => setOpenNewProduct(false)}
                      aria-label="Close dialog"
                      className="rounded-lg p-2 text-slate-400 hover:bg-slate-100"
                    >
                      <X size={19} />
                    </button>
                  </div>
        </DialogTitle>
        <DialogContent>
          <NewProduct setOpen={setOpenNewProduct} />
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export const NewProduct = (props) => {
  const { setOpen } = props;
  const { addProduct } = useContext(MenuContext);
  const newProductForm = useFormik({
    initialValues: {
      food_name: "",
      description: "",
      quantity: 0,
      stock: 0,
      price: "",
      image: "",
    },
    onSubmit: (values) => {
      alert("Product added successfully!");
      addProduct(values);
      setOpen(false);
    },
  });
  return (
    <Card>
      <CardContent>
        <Box display={"flex"} justifyContent={"center"}>
          <Badge
            overlap="circular"
            badgeContent={
              <IconButton >
                <Edit />
              </IconButton>
            }
          >
            <Avatar sx={{ width: 124, height: 124 }} ></Avatar>
          </Badge>
        </Box>
        <form onSubmit={newProductForm.handleSubmit} className="space-y-2">
        
               <label className="block text-sm font-medium text-slate-700">
              food name
              <input
                required
                name="food_name"
              id="food_name"
              onChange={newProductForm.handleChange}
              onBlur={newProductForm.handleBlur}
                placeholder="e.g. Grilled Chicken"
                className="mt-1.5 w-full rounded-xl border border-slate-200 px-3 py-2.5 outline-none focus:border-blue-500"
              />
            </label>
             <label className="block text-sm font-medium text-slate-700">
              Description
              <input
                required
                 name="description"
              id="description"
              onChange={newProductForm.handleChange}
              onBlur={newProductForm.handleBlur}
                placeholder="e.g. Grilled Chicken"
                className="mt-1.5 w-full rounded-xl border border-slate-200 px-3 py-2.5 outline-none focus:border-blue-500"
              />
            </label>
              <label className="block text-sm font-medium text-slate-700">
              Selling price (KSh)
              <input
                required
                min="1"
                type="number"
                 name="price"
              id="price"
              onChange={newProductForm.handleChange}
              onBlur={newProductForm.handleBlur}
                placeholder="850"
                className="mt-1.5 w-full rounded-xl border border-slate-200 px-3 py-2.5 outline-none focus:border-blue-500"
              />
            </label>
            <Box display={"flex"} justifyContent={"space-evenly"}>
              {/* <Button
                variant="contained"
                color="success"
                fullWidth
                type="submit"
              >
                Create
            </Button> */}
             <button type="submit" className="w-full rounded-xl bg-blue-600 py-3 text-sm font-semibold text-white hover:bg-blue-700">
              Add product
            </button>
            </Box>
          
        </form>
      </CardContent>
    </Card>
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

export default Products;

function Product(props) {
  const { food_name, description, price, image } = props.product;
  const [quantity, setQuantity] = useState(0);

  const handleEdit = () => {};
  const handleDelete = () => {};
  return (
    <>
      <CardMedia
        component="img"
        height={150}
        src={`http://127.0.0.1:8000/hot${image}`}
        alt={food_name}
        className="max-w-xs"
      />
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
          <Button variant="contained" onClick={handleDelete}>
            Delete
          </Button>
          <Button variant="contained" onClick={handleEdit}>
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
