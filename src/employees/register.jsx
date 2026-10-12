import { Avatar, Box, Stack, TextField } from "@mui/material"

const Register =()=>{
    return(
      <Stack rowGap={1}>
        <Box display={'flex'} justifyContent={'center'}>
          <Avatar/>
        </Box>
        <TextField placeholder="First name"/>
        <TextField placeholder="Last name"/>
        <TextField placeholder="ID number"/>
        <TextField placeholder="Department"/>
      </Stack>
    )
  }