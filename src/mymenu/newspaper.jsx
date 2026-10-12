import { useContext, useState } from "react";
import {
  Tabs,
  Tab,
  Box,
  Divider,
} from "@mui/material";



const News = () => {

  const [value, setValue] = useState(1);
  
  
  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };


 
  return (
    <Box>
      <Tabs value={value} onChange={handleTabChange}>
        <Tab label="Yesterday" />
        <Tab label="Today" />
      </Tabs>
      <Divider/>
      <TabPanel value={value} index={0}>
        Yesterdays
      </TabPanel>
      <TabPanel value={value} index={1}>
        Todays
      </TabPanel>
            
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

export default News;

