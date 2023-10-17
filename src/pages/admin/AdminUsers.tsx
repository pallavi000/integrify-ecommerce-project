import React, { useEffect, useState } from "react";
// redux
import { useSelector } from "react-redux";
import { AppState, useAppDispatch } from "../../redux/store";

// MUI
import {
  Button,
  Card,
  Checkbox,
  Container,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableFooter,
  TablePagination,
  Typography,
  TextField,
  InputAdornment,
  LinearProgress,
} from "@mui/material";

// icons
import { PersonAdd, Search } from "@mui/icons-material";

// reducers
import {
  deleteUser,
  fetchUsers,
} from "../../redux/reducers/admin/adminUserReducer";

// components
import TableOptionPopover from "../../components/TableOptionPopover";
import UserTableBody from "../../components/admin/users/UserTableBody";
import AdminUserEditModal from "../../components/admin/users/AdminUserEditModal";
import AdminUserAddModal from "../../components/admin/users/AdminUserAddModal";

// types
import { TUser } from "../../@types/user";

function AdminUsers() {
  // pagination states
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  // filter states
  const [selectedUsers, setSelectedUsers] = React.useState<number[]>([]);
  const [filterName, setFilterName] = React.useState("");

  // popover menu states
  const [popoverEle, setPopOverEle] = React.useState<
    (EventTarget & HTMLButtonElement) | null
  >(null);
  const [activeUser, setActiveUser] = useState<null | TUser>(null);

  // modal control states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // app dispatch
  const dispatch = useAppDispatch();

  // auth state
  const { users, isLoading } = useSelector((state: AppState) => ({
    users: state.adminUsers.data,
    isLoading: state.adminUsers.isLoading,
  }));

  // get/fetch users
  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  // handle checkbox all click
  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = users.map((u) => u.id);
      setSelectedUsers(newSelecteds);
      return;
    }
    setSelectedUsers([]);
  };

  // handle single checkbox click
  const handleSelectClick = (
    event: React.ChangeEvent<HTMLInputElement>,
    id: number
  ) => {
    if (selectedUsers.includes(id)) {
      const filterdSelectedUsers = selectedUsers.filter((s) => s !== id);
      setSelectedUsers(filterdSelectedUsers);
    } else {
      setSelectedUsers((prev) => [...prev, id]);
    }
  };

  // handle search by name
  const handleFilterByName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  // handle paginations
  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // popover open/close handler
  const handlePopoverOpen = (
    e: React.MouseEvent<HTMLButtonElement>,
    user: TUser
  ) => {
    setActiveUser(user);
    setPopOverEle(e.currentTarget);
  };

  const handlePopoverClose = () => {
    setPopOverEle(null);
    //setActiveUser(null);
  };

  // popover menu item click handler
  const handleUserEditClick = () => {
    handlePopoverClose();
    setIsEditModalOpen(true);
  };

  const handleUserDeleteClick = () => {
    if (activeUser) dispatch(deleteUser({ id: activeUser.id }));
    handlePopoverClose();
  };

  // search filter hanlder
  const filteredUsers = users.filter((u) =>
    u.name.toLocaleLowerCase().includes(filterName.toLocaleLowerCase())
  );
  const isNotFound = !filteredUsers.length && !!filterName;

  return (
    <>
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h6">Users</Typography>
          <Button
            size="small"
            variant="contained"
            startIcon={<PersonAdd />}
            onClick={() => setIsAddModalOpen(true)}
          >
            New User
          </Button>
        </Stack>

        <AdminUserAddModal
          isOpen={isAddModalOpen}
          setIsOpen={setIsAddModalOpen}
        />
        {users.length ? (
          <AdminUserEditModal
            isOpen={isEditModalOpen}
            setIsOpen={setIsEditModalOpen}
            user={activeUser || users[0]}
          />
        ) : null}

        <Card>
          <TextField
            size="small"
            sx={{ ml: 1, flex: 1, margin: "1rem" }}
            placeholder="Search Users"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
            onChange={handleFilterByName}
          />

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox">
                    <Checkbox
                      indeterminate={
                        selectedUsers.length > 0 &&
                        selectedUsers.length < users.length
                      }
                      checked={
                        users.length > 0 &&
                        selectedUsers.length === users.length
                      }
                      onChange={handleSelectAllClick}
                    />
                  </TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Role</TableCell>
                  <TableCell>Created At</TableCell>
                  <TableCell>&nbsp;</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredUsers
                  .slice(page * rowsPerPage, rowsPerPage + page * rowsPerPage)
                  .map((user: TUser) => {
                    return (
                      <UserTableBody
                        key={user.id}
                        user={user}
                        selectedUsers={selectedUsers}
                        handleSelectClick={handleSelectClick}
                        handlePopoverOpen={handlePopoverOpen}
                      />
                    );
                  })}
              </TableBody>
              {isLoading && !users.length && (
                <TableBody>
                  <TableRow>
                    <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                      <LinearProgress />
                    </TableCell>
                  </TableRow>
                </TableBody>
              )}
              {isNotFound && (
                <TableBody>
                  <TableRow>
                    <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                      <Typography variant="h6" paragraph>
                        Not found
                      </Typography>

                      <Typography variant="body2">
                        No results found for &nbsp;
                        <strong>&quot;{filterName}&quot;</strong>.
                        <br /> Try checking for typos or using complete words.
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableBody>
              )}

              <TableFooter>
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[10, 50]}
                    count={users.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                  />
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>

          <TableOptionPopover
            anchorEl={popoverEle}
            handleEdit={handleUserEditClick}
            handleDelete={handleUserDeleteClick}
            handleCloseMenu={handlePopoverClose}
          />
        </Card>
      </Container>
    </>
  );
}

export default AdminUsers;
