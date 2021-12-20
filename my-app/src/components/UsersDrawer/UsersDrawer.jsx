import React, { useState } from "react";
import {
  Button,
  Checkbox,
  Drawer,
  Grid,
  TextField,
  Typography,
} from "@mui/material";

import { EMAIL } from "../../utils/utils";

const UsersDrawer = ({ isDrawerOpen, onClose, onAddNewUser }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [isContacted, setIsContacted] = useState(false);
  const [shouldErrorDisplay, setShouldErrorDisplay] = useState(false);
  const isValidateEmail = EMAIL.test(email);
  const isValueEmpty = !firstName || !lastName || !email || !isValidateEmail;

  const reinitializeState = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setShouldErrorDisplay(false);
  };

  const handleCreateUser = () => {
    if (isValueEmpty) {
      setShouldErrorDisplay(true);
    } else {
      onAddNewUser(firstName, lastName, email, notes, isContacted);
      reinitializeState();
      onClose();
    }
  };

  const handleCloseDrawer = () => {
    reinitializeState();
    onClose();
  };

  return (
    <Drawer open={isDrawerOpen} onClose={handleCloseDrawer} anchor="right">
      <Grid container sx={{ width: 300, padding: 4 }}>
        <Grid item sx={{ marginBottom: 4 }}>
          <Typography variant="h5">New User</Typography>
        </Grid>
        <Grid
          container
          item
          direction="column"
          spacing={2}
          sx={{ height: "80vh" }}
        >
          <Grid item>
            <Typography>First Name</Typography>
          </Grid>
          <Grid item>
            <TextField
              error={shouldErrorDisplay && !firstName}
              helperText={
                shouldErrorDisplay && !firstName ? "First name required" : ""
              }
              placeholder="Enter first name"
              onChange={(e) => setFirstName(e.target.value)}
              sx={{ width: "100%" }}
            ></TextField>
          </Grid>

          <Grid item>
            <Typography>Last Name</Typography>
          </Grid>
          <Grid item>
            <TextField
              error={shouldErrorDisplay && !lastName}
              helperText={
                shouldErrorDisplay && !lastName ? "Last name required" : ""
              }
              placeholder="Enter last name"
              onChange={(e) => setLastName(e.target.value)}
              sx={{ width: "100%" }}
            ></TextField>
          </Grid>
          <Grid item>
            <Typography>Email</Typography>
          </Grid>
          <Grid item>
            <TextField
              error={shouldErrorDisplay && (!email || !isValidateEmail)}
              helperText={
                shouldErrorDisplay && (!email || !isValidateEmail)
                  ? "Invalid email"
                  : ""
              }
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
              sx={{ width: "100%" }}
            ></TextField>
          </Grid>
          <Grid item>
            <Typography>Notes</Typography>
          </Grid>
          <Grid item>
            <TextField
              placeholder="Enter notes"
              multiline
              rows={4}
              onChange={(e) => setNotes(e.target.value)}
              sx={{ width: "100%" }}
            ></TextField>
          </Grid>

          <Grid container item direction="row" wrap="nowrap">
            <Grid item>
              <Typography>Check the box if this user is contacted</Typography>
            </Grid>
            <Grid item>
              <Checkbox
                onChange={(event) => setIsContacted(event.target.checked)}
              ></Checkbox>
            </Grid>
          </Grid>
        </Grid>
        <Grid container item columnSpacing={6}>
          <Grid item>
            <Button
              data-testid="close-drawer-button"
              variant="contained"
              size="large"
              color="inherit"
              onClick={handleCloseDrawer}
            >
              Cancel
            </Button>
          </Grid>
          <Grid item>
            <Button
              data-testid="add-new-user-button"
              variant="contained"
              size="large"
              color="inherit"
              onClick={() =>
                handleCreateUser(firstName, lastName, email, isContacted)
              }
            >
              Add
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Drawer>
  );
};

export default UsersDrawer;
