import React from "react";

// MUI
import {
  AppBar,
  Box,
  Divider,
  IconButton,
  InputBase,
  Stack,
  Toolbar,
} from "@mui/material";

// icons
import { Search, Menu as MenuIcon } from "@mui/icons-material";

// components
import ThemeModeSwitch from "../../ThemeModeSwitch";
import NotificationsPopover from "./NotificationPopover";
import AccountPopover from "./AccountPopover";

// context
import { useThemeContext } from "../../../context/ThemeContext";

// utils
import { ADMIN_SIDEBAR_WIDTH } from "../../../utils/constants";

// component props type
type TopBarProps = {
  handleSideBarOpen: Function;
};

function TopBar({ handleSideBarOpen }: TopBarProps) {
  const { theme } = useThemeContext();
  return (
    <AppBar
      sx={{
        boxShadow: "none",
        backgroundColor: "background.default",
        color: "text.primary",
        [theme.breakpoints.up("lg")]: {
          width: `calc(100% - ${ADMIN_SIDEBAR_WIDTH + 1}px)`,
        },
      }}
    >
      <Toolbar>
        <IconButton
          onClick={() => handleSideBarOpen()}
          sx={{
            mr: 1,
            color: "text.primary",
            display: { lg: "none" },
          }}
        >
          <MenuIcon />
        </IconButton>

        {/* <InputBase sx={{ ml: 1, flex: 1 }} placeholder="Search" />
        <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
          <Search />
        </IconButton> */}

        <Box sx={{ flexGrow: 1 }} />
        <Stack
          direction="row"
          alignItems="center"
          spacing={{
            xs: 0.5,
            sm: 1,
          }}
        >
          <ThemeModeSwitch />

          <IconButton
            disabled
            sx={{
              padding: 0,
              width: 44,
              height: 44,
            }}
          >
            <img
              width={24}
              src={"https://tailwindui.com/img/flags/flag-united-states.svg"}
              alt={"flag"}
            />
          </IconButton>

          <NotificationsPopover />

          <AccountPopover />
        </Stack>
      </Toolbar>
      <Divider light />
    </AppBar>
  );
}

export default TopBar;
