import React from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Divider,
  Box,
  Chip,
} from "@mui/material";

const UserCard = ({ content }) => (
  <Card>
    <CardContent >
      <Typography variant="h6" component="div">
        {content.title}
      </Typography>
      <Divider variant="middle" />
      <Grid container mt={1}>
        {content.data.map((datum) => {
          return (
            <Grid item sm={12} key={datum.key} my={1}>
              <Box display={"flex"} justifyContent={"space-between"} rowGap={10}>
                <Typography fontWeight={'bold'} >{datum.key}</Typography>
                <Chip label = {datum.value}/>
              </Box>
            </Grid>
          );
        })}
      </Grid>
    </CardContent>
  </Card>
);

const AdminDashboard = () => {
  const cards = [
    {
      title: "Users",
      data: [
        { key: "Teachers", value: 15 },
        { key: "Students", value: 915 },
        { key: "Staff", value: 25 },
        { key: "BOM", value: 13 },
        { key: "Sponsor", value: 0 },
      ],
    },
    {
        title: "Social",
        data: [
          { key: "Assignments", value: 15 },
          { key: "Current Exams", value: 0 },
          { key: "Attendance", value: "92%" },
          { key: "Timetable", value: 13 },
          { key: "Sponsor", value: 0 },
        ],
      },
      {
        title: "Inventory",
        data: [
          { key: "Teachers", value: 15 },
          { key: "Students", value: 915 },
          { key: "Staff", value: 25 },
          { key: "BOM", value: 13 },
          { key: "Sponsor", value: 0 },
        ],
      },
      {
        title: "Accounts",
        data: [
          { key: "Teachers", value: 15 },
          { key: "Students", value: 915 },
          { key: "Staff", value: 25 },
          { key: "BOM", value: 13 },
          { key: "Sponsor", value: 0 },
        ],
      },
      {
        title: "Boarding",
        data: [
          { key: "Teachers", value: 15 },
          { key: "Students", value: 915 },
          { key: "Staff", value: 25 },
          { key: "BOM", value: 13 },
          { key: "Sponsor", value: 0 },
        ],
      },
      {
        title: "Wall",
        data: [
          { key: "Teachers", value: 15 },
          { key: "Students", value: 915 },
          { key: "Staff", value: 25 },
          { key: "BOM", value: 13 },
          { key: "Sponsor", value: 0 },
        ],
      },
    // "Academics",
    // "Attendance",
    // "Social",
    // "Inventory",
    // "Accounts",
    // "Games and Sports",
    // "Boarding",
    // "Projects",
    // "Wall",
    // "Settings",
  ];

  return (
    <Grid container spacing={3}>
      {cards.map((card) => (
        <Grid item xs={12} sm={6} md={4} key={card.title}>
          <UserCard content={card} />
        </Grid>
      ))}
    </Grid>
  );
};

export default AdminDashboard;
