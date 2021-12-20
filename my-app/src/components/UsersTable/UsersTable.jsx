import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Tooltip,
  TextField,
  Toolbar,
  Typography,
  Button,
  Select,
  MenuItem,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

import UsersDrawer from "../UsersDrawer/UsersDrawer.jsx";
import {
  listUsers,
  addUser,
  updateUser,
  deleteUser,
} from "../../apis/users.js";
import { transformDate } from "../../utils/utils";

const UsersTable = () => {
  const headCells = [
    {
      id: "first_name",
      label: "First name",
    },
    {
      id: "last_name",
      label: "Last name",
    },
    {
      id: "email",
      label: "Email",
    },
    {
      id: "contacted",
      label: "Contacted",
    },
    { id: "notes", label: "Notes" },
    {
      id: "updatedTime",
      label: "Last updated",
    },
    {
      id: "createdTime",
      label: "Created Time",
    },
  ];

  const [usersList, setUsersList] = useState([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const getUsers = async () => {
    const data = await listUsers();
    setUsersList(data);
  };

  useEffect(() => {
    getUsers();
  }, []);

  const handleAddNewUser = async (
    firstName,
    lastName,
    email,
    notes,
    isContacted
  ) => {
    const data = await addUser({
      first_name: firstName,
      last_name: lastName,
      email,
      notes,
      is_contacted: isContacted,
    });
    const newList = [...usersList, data];
    setUsersList(newList);
  };

  const handleUpdateUser = async (userId, updatedUser) => {
    await updateUser(userId, updatedUser);
    const data = updatedUser;
    const map = {};
    usersList.forEach((user) => (map[user.id] = user));
    const updatedMap = { ...map, [userId]: data };
    const newList = Object.values(updatedMap);
    setUsersList(newList);
  };

  const handleDeleteUser = async (userId) => {
    const httpStatus = await deleteUser(userId);
    if (httpStatus === 204) {
      const newList = usersList.filter((user) => user.id !== userId);
      setUsersList(newList);
    }
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
  };

  return (
    <>
      <Paper sx={{ marginTop: 10 }}>
        <Toolbar sx={{ float: "right" }}>
          <Button
            data-testid="open-add-new-user-drawer-button"
            variant="outlined"
            startIcon={<AddIcon />}
            color="inherit"
            size="large"
            onClick={() => setIsDrawerOpen(true)}
          >
            <Typography>add a new user</Typography>
          </Button>
        </Toolbar>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                {headCells.map((headCell, index) => (
                  <TableCell key={index}>{headCell.label}</TableCell>
                ))}
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {usersList.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <TextField
                      variant="outlined"
                      value={row.first_name}
                      inputProps={{ maxLength: 20 }}
                      onChange={(e) =>
                        handleUpdateUser(row.id, {
                          ...row,
                          first_name: e.target.value,
                        })
                      }
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      variant="outlined"
                      value={row.last_name}
                      inputProps={{ maxLength: 20 }}
                      onChange={(e) =>
                        handleUpdateUser(row.id, {
                          ...row,
                          last_name: e.target.value,
                        })
                      }
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      variant="outlined"
                      value={row.email}
                      onChange={(e) =>
                        handleUpdateUser(row.id, {
                          ...row,
                          email: e.target.value,
                        })
                      }
                    />
                  </TableCell>
                  <TableCell>
                    <Select
                      value={row.is_contacted}
                      onChange={(e) =>
                        handleUpdateUser(row.id, {
                          ...row,
                          is_contacted: e.target.value,
                        })
                      }
                    >
                      <MenuItem value={true}>Yes</MenuItem>
                      <MenuItem value={false}>No</MenuItem>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <TextField
                      variant="outlined"
                      value={row.notes}
                      multiline
                      rows={2}
                      onChange={(e) =>
                        handleUpdateUser(row.id, {
                          ...row,
                          notes: e.target.value,
                        })
                      }
                    />
                  </TableCell>
                  <TableCell>{transformDate(row.updated_at)}</TableCell>
                  <TableCell>{transformDate(row.created_at)}</TableCell>
                  <TableCell>
                    <Tooltip title="Delete">
                      <IconButton
                        data-testid="delete-user-button"
                        onClick={() => handleDeleteUser(row.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <UsersDrawer
        isDrawerOpen={isDrawerOpen}
        onClose={handleCloseDrawer}
        onAddNewUser={handleAddNewUser}
      />
    </>
  );
};

export default UsersTable;
