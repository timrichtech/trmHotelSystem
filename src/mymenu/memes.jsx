import { useContext, useState } from "react";
import {
  Tabs,
  Tab,
  Box,
  Typography,
  Button,
  Card,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  CardMedia,
  CardActionArea,
  Divider,
} from "@mui/material";
import Grid2 from "@mui/material/Grid2";
import { Add, Close, CloudCircleRounded, } from "@mui/icons-material";
import { MenuContext } from "./menudata";

const Memes = () => {
  const { memes } = useContext(MenuContext);
  const [value, setValue] = useState(0);
  const [openNewProduct, setOpenNewProduct] = useState(false);
  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box>
      <Tabs value={value} onChange={handleTabChange}>
        <Tab label="Trending" />
        <Tab label="Inspiration" />
      </Tabs>
      <Divider />
      <TabPanel value={value} index={0}>
        <Stack rowGap={1}>
          <Stack maxHeight={"60vh"} overflow={"auto"}>
            <Grid2 container gap={2}>
              {memes.map((meme) => {
                return (
                  <Grid2 item key={meme.id}>
                    <Card elevation={2}>
                      <CardMedia
                        src={meme.source}
                        component="img"
                        height={150}
                        image={meme.source}
                        alt={meme.title}
                      />
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
        Inspiration
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
              Upload Meme
            </Typography>
            <IconButton onClick={() => setOpenNewProduct(false)}>
              <Close color="secondary" />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Newmeme setOpen={setOpenNewProduct} />
        </DialogContent>
      </Dialog>
    </Box>
  );
};

const Newmeme = (props) => {
  return (
    <Box justifyContent={"center"} alignItems={"center"} p={5}>
      <Button startIcon={<CloudCircleRounded />}>Upload meme</Button>
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

export default Memes;
