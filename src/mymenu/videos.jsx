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
  Divider,
} from "@mui/material";
import Grid2 from "@mui/material/Grid2";
import { Add, Close, Edit } from "@mui/icons-material";
import profile_image from "../resources/default_profile.png";
import { MenuContext } from "./menudata";

const Videos = () => {
  const { products } = useContext(MenuContext);
  const [value, setValue] = useState(0);
  const [openNewProduct, setOpenNewProduct] = useState(false);
  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box>
      <Tabs value={value} onChange={handleTabChange}>
        <Tab label="Trending" />
        <Tab label="Hot videos" />
      </Tabs>
      <Divider/>
      <TabPanel value={value} index={0}>
        <Stack rowGap={1}>
          <Stack maxHeight={"60vh"} overflow={"auto"}>
            <Grid2 container gap={2}>
              {products.map((product) => {
                return (
                  <Grid2 item key={product.id}>
                    <Card elevation={2}>
                        <Video product={product} />
                    </Card>
                    
                  </Grid2>
                );
              })}
              <Grid2 item key={'special'}>
                    <Card elevation={2} sx={{bgcolor:'aliceblue'}} >
                        <CardActionArea onClick={() => setOpenNewProduct(true)} sx={{width:140, height:140, display:'flex', justifyContent:'center', alignItems:'center'}}>
                            <Add fontSize="large"/>
                        </CardActionArea>
                    </Card>
                    
                  </Grid2>
            </Grid2>
          </Stack>
        </Stack>
      </TabPanel>
      <TabPanel value={value} index={1}>
        Hot News
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
              Upload Video
            </Typography>
            <IconButton onClick={() => setOpenNewProduct(false)}>
              <Close color="secondary" />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          <NewVideo setOpen={setOpenNewProduct} />
        </DialogContent>
      </Dialog>
    </Box>
  );
};

const NewVideo = (props) => {
  return (
    <Card>
      <CardContent>
        <Box display={"flex"} justifyContent={"center"}>
          <Badge
            overlap="circular"
            badgeContent={
              <IconButton>
                <Edit />
              </IconButton>
            }
          >
            <Avatar sx={{width:124, height:124, borderRadius:1}}></Avatar>
          </Badge>
        </Box>
        <Stack rowGap={1} mt={2}>
          <TextField label="Title" />
          <Button>File Upload</Button>
          <Box display={'flex'} justifyContent={'space-evenly'} >
            <Button variant="outlined" color="success" fullWidth>Create</Button>
        </Box>
        </Stack>
        
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

export default Videos;

function Video(props) {
  const { removeFromCart, addToCart } = useContext(MenuContext);
  const { title, image,file } = props.product;
  
 
    const handleRemove = ()=>{

    }
 
  
  return (
    <>
      <CardMedia component="img" height={150} image={image} alt={image} />
      <CardContent>
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Typography color={"primary"} variant="h6">
            {title}
          </Typography>
        </Box>
        <Box display={"flex"} justifyContent={"space-between"}>
          <Button
            variant="contained"
            onClick={handleRemove}
            color="error"
            fullWidth
          >
            Delete
          </Button>
        </Box>
      </CardContent>
    </>
  );
}

