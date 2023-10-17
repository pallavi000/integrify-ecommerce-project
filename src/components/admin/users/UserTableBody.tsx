// MUI
import {
  Avatar,
  Checkbox,
  IconButton,
  Stack,
  TableCell,
  TableRow,
  Typography,
  Chip,
} from "@mui/material";

// icons
import { MoreVert } from "@mui/icons-material";

// types
import { TUser } from "../../../@types/user";

// component props type
type UserTableBodyProps = {
  user: TUser;
  selectedUsers: number[];
  handleSelectClick: Function;
  handlePopoverOpen: Function;
};

function UserTableBody({
  user,
  selectedUsers,
  handleSelectClick,
  handlePopoverOpen,
}: UserTableBodyProps) {
  // is this row selected?
  const selectedUser = selectedUsers.indexOf(user.id) !== -1;
  return (
    <>
      <TableRow
        hover
        key={user.id}
        tabIndex={-1}
        role="checkbox"
        selected={selectedUser}
      >
        <TableCell padding="checkbox">
          <Checkbox
            checked={selectedUser}
            onChange={(event) => handleSelectClick(event, user.id)}
          />
        </TableCell>
        <TableCell component="th" scope="row" padding="none">
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar alt={user.name} src={user.avatar} />
            <Typography variant="body1" noWrap>
              {user.name}
            </Typography>
          </Stack>
        </TableCell>
        <TableCell component={"td"} align="left">
          <Typography
            variant="caption"
            fontWeight={"400"}
            color={"text.primary"}
          >
            {user.email}
          </Typography>
        </TableCell>
        <TableCell align="left">
          <Typography
            variant="caption"
            fontWeight={"400"}
            color={"text.primary"}
          >
            {user.role}
          </Typography>
        </TableCell>
        <TableCell align="left">
          <Chip size="small" label={user.creationAt} />
        </TableCell>
        <TableCell align="right">
          <IconButton
            size="large"
            color="inherit"
            onClick={(e) => handlePopoverOpen(e, user)}
          >
            <MoreVert />
          </IconButton>
        </TableCell>
      </TableRow>
    </>
  );
}

export default UserTableBody;
