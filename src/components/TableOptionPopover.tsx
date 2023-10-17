import React from "react";

// MUI
import { MenuItem, Popover, Typography } from "@mui/material";

// icons
import { Delete, Edit } from "@mui/icons-material";

// component props type
type TableOptionPopoverProps = {
  isLoading?: boolean;
  anchorEl: (EventTarget & HTMLButtonElement) | null;
  handleEdit: Function;
  handleDelete: Function;
  handleCloseMenu: Function;
};

function TableOptionPopover({
  isLoading = false,
  anchorEl,
  handleEdit,
  handleDelete,
  handleCloseMenu,
}: TableOptionPopoverProps) {
  return (
    <Popover
      open={Boolean(anchorEl)}
      anchorEl={anchorEl}
      onClose={() => handleCloseMenu()}
      anchorOrigin={{ vertical: "top", horizontal: "left" }}
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      PaperProps={{
        sx: {
          p: 1,
          width: 140,
          "& .MuiMenuItem-root": {
            px: 1,
            typography: "body2",
            borderRadius: 0.75,
          },
        },
      }}
    >
      <MenuItem disabled={isLoading} onClick={() => handleEdit()}>
        <Edit color="action" fontSize="small" />
        <Typography
          variant="caption"
          fontWeight={"normal"}
          color={"text.primary"}
          sx={{
            marginLeft: "1rem",
          }}
        >
          Edit
        </Typography>
      </MenuItem>

      <MenuItem
        disabled={isLoading}
        sx={{ color: "error.main" }}
        onClick={() => handleDelete()}
      >
        <Delete color="error" fontSize="small" />
        <Typography
          variant="caption"
          color={"error"}
          fontWeight={"normal"}
          sx={{
            marginLeft: "1rem",
          }}
        >
          Delete
        </Typography>
      </MenuItem>
    </Popover>
  );
}

export default TableOptionPopover;
