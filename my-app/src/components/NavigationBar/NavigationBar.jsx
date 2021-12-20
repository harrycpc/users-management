import React from "react";
import { AppBar, Toolbar, Typography, Container } from "@mui/material";

const NavigationBar = () => {
  return (
    <AppBar sx={{ backgroundColor: "#1CB294" }}>
      <Container maxWidth="xl">
        <Toolbar>
          <Typography variant="h6">Users Management</Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default NavigationBar;
