import React, { useState } from "react";
import { Grid, List, ListItem, ListItemText, Typography } from "@material-ui/core";

const SidebarItem = ({ label, onClick }) => (
  <ListItem button onClick={onClick}>
    <ListItemText primary={label} />
  </ListItem>
);

const MainPage = () => {
  const [selectedPage, setSelectedPage] = useState("Page 1");

  const handlePageChange = (page) => {
    setSelectedPage(page);
  };

  return (
    <Grid container>
      <Grid item xs={3}>
        <List component="nav">
          <SidebarItem
            label="Page 1"
            onClick={() => handlePageChange("staker")}
          />
          <SidebarItem
            label="Page 2"
            onClick={() => handlePageChange("staker")}
          />
          <SidebarItem
            label="Page 3"
            onClick={() => handlePageChange("/staker")}
          />
        </List>
      </Grid>
      <Grid item xs={9}>
        <Typography variant="h4">{selectedPage}</Typography>
        {/* Add your page content here */}
      </Grid>
    </Grid>
  );
};

export default MainPage;
