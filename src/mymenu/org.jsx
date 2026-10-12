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
  IconButton,
  CardActionArea,
  Chip,
  Tooltip,
} from "@mui/material";
import Grid2 from "@mui/material/Grid2";
import { Add, Close, Edit, Remove } from "@mui/icons-material";
import MyMenu from "./menu";
import { OrganizerContext } from "../ORGANIZER/organizer";
import { useNavigate } from "react-router";
import { MenuContext } from "./menudata";
import { useFormik } from "formik";

const Orgs = (props) => {
  const { tables, alterTable, loadTables } = useContext(OrganizerContext);
  const [value, setValue] = useState(0);
  const [openNewProduct, setOpenNewProduct] = useState(false);
  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  const { setContent } = props;

  return (
    <Box>
      <Tabs value={value} onChange={handleTabChange}>
        <Tab label="Tables" />
        <Tab label="View" />
      </Tabs>
      <TabPanel value={value} index={0}>
        <Stack rowGap={1}>
          <Box display={"flex"} justifyContent={"space-between"}>
            <Button
              variant="contained"
              onClick={() => setOpenNewProduct(true)}
              startIcon={<Add />}
              color="success"
              className="bg-mint-500"
            >
              Add Table
            </Button>
            <TextField label="search" sx={{ width: "30%" }} />
          </Box>
          <Stack maxHeight={"60vh"} overflow={"auto"}>
            <Grid2 container gap={2} >
              {tables? tables.map((tabl) => {
                return (
                  <Grid2 item key={tabl.id} >
                    <Card elevation={2}>
                      <TTable
                        table={tabl}
                        setContent={setContent}
                        bookTable={alterTable}
                      />
                    </Card>
                  </Grid2>
                );
              }): null}
              {/* <Grid2 item key={"special"}>
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
              </Grid2> */}
            </Grid2>
          </Stack>
        </Stack>
      </TabPanel>
      <TabPanel value={value} index={1}></TabPanel>
      <Dialog
        open={openNewProduct}
        onClose={() => setOpenNewProduct(false)}
        fullWidth
        maxWidth={"md"}
      >
        <DialogTitle>
          <Box display={"flex"} justifyContent={"space-between"}>
            <Typography variant="h6" color={"primary"}>
              Add Table
            </Typography>
            <IconButton onClick={() => setOpenNewProduct(false)}>
              <Close color="secondary" />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          <NewTable setOpen={setOpenNewProduct} />
        </DialogContent>
      </Dialog>
    </Box>
  );
};

const NewTable = (props) => {
  const { setOpen } = props;
  const { addTable } = useContext(OrganizerContext);

  const tableForm = useFormik({
    initialValues: {
      table: "",
    },
    onSubmit: (values) => {
      setOpen(false);
      addTable(values.table);
    },
  });
  return (
    <Card>
      <CardContent>
        <Stack rowGap={1} mt={2}>
          <form onSubmit={tableForm.handleSubmit}>
            <TextField
              placeholder="Table name / number"
              name="table"
              id="table"
              onChange={tableForm.handleChange}
              onBlur={tableForm.handleBlur}
            />
            <Box display={"flex"} justifyContent={"space-evenly"}>
              <Button variant="contained" color="primary" type="submit">
                Create table
              </Button>
            </Box>
          </form>
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

export default Orgs;

function TTable(props) {
  const { table_name, isBooked } = props.table;
  const { bookTable } = props;
  const nav = useNavigate();
  const handleBook = () => {
    let thisTable = {...props.table, isBooked : !isBooked}
    bookTable(thisTable);
  };

  const handleEdit = () => {
    prompt('Enter Admin Password');
    alert('Wrong Password')
  };

  const handleRemove = () => {
    prompt('Enter Admin Password');
    alert('Wrong Password')
  };
  const handleTableClick = () => {
    nav("/menu", { state: { table: props.table } });
  };
  return (
    <Stack rowGap={1} p={1}>
      <CardActionArea onClick={handleTableClick} disabled={isBooked} >
        <Stack className="bg-blue-700 h-40 w-60" content-center justify-center place-content-center flex rounded-md>
          {/* <Stack className="flex content-center justify-center"  > */}
            <Typography variant="h5" fontWeight={"bold"}>
              {table_name}
            </Typography>
            {isBooked ? <Chip color="warning" label="Booked" /> : null}
         
        </Stack>
      </CardActionArea>
      <Box
        display={"flex"}
        justifyContent={"space-evenly"}
        alignItems={"center"}
      >
        <Tooltip title='edit' placement="top-start">
        <IconButton color="primary" onClick={handleEdit}>
          <Edit />
        </IconButton>
        </Tooltip>
        {isBooked ? (
          <Button color="primary" variant="contained" onClick={handleBook}>
            Unbook{" "}
          </Button>
        ) : (
          <Button color="primary" variant="contained" onClick={handleBook}>
            Book{" "}
          </Button>
        )}
        <Tooltip title='delete' placement={'top-end'}>
        <IconButton color="error" onClick={handleRemove}>
          <Remove />
        </IconButton>
        </Tooltip>
      </Box>
    </Stack>
  );
}
