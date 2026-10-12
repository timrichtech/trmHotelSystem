import { Avatar, Box, Button, Divider, List, ListItemButton, ListItemIcon, ListItemText, Stack, Typography } from "@mui/material";
import { useContext, useState } from "react";
import { MenuContext } from "../mymenu/menudata";
import image from '../resources/milk_tea.jfif'

export default function Employee(){

    const {employees} = useContext(MenuContext);
    const [employee, setEmployee] =useState(null)
    const handleClick=(emp)=>{ setEmployee(emp)

    }
    return (
        <Stack rowGap={1}>
            <Box display={'flex'} justifyContent={'end'}>
                <Button variant="outlined"  color="'primary">Register</Button>
            </Box>
            <Divider />
            <Box display={'flex'}>
                <Stack width={'40%'}>
                    <Box display={'flex'} justifyContent={'center'}>
                        <Typography variant="h6" color="'primary">Employees</Typography>
                    </Box>
                    <Divider variant="middle"/>
                    
                    <List>
                        {employees ? employees.map(employee=>{
                            return(
                                <ListItemButton onClick={()=>{handleClick(employee)}}>
                                    <ListItemIcon>{<Avatar src={image}/>}</ListItemIcon>
                                    <ListItemText primary={`${employee.first_name} ${employee.last_name}`} secondary={employee.department}></ListItemText>
                                </ListItemButton>
                            )
                        }):null}
                       
                    </List>
                </Stack>
                <Divider flexItem orientation="vertical" />
                <Stack width={'60%'}>
                {employee?<>
                    <Stack rowGap={1}>
                    <Box display={"flex"} justifyContent={"center"}><Avatar sx={{width:100,height:100}} src="image"/></Box>
                    <Stack display={"flex"} alignItems={"center"}>
                        <Typography variant="h5">{employee.first_name} {employee.last_name}</Typography>
                        <Typography variant="h5">{employee.department}</Typography>
                        <Typography>{employee.work_id}</Typography>
                        <Typography>{employee.national_id}</Typography>
                        
                    </Stack>


                </Stack>
                </>:null}
                </Stack>
            </Box>
        </Stack>
    )
}