import React, { useState } from "react";
// redux
import { useSelector } from "react-redux";
import { AppState } from "../../../redux/store";

// MUI
import {
  Avatar,
  Box,
  Drawer,
  IconButton,
  Link,
  List,
  Typography,
  useMediaQuery,
} from "@mui/material";

// icons
import {
  AccountCircle,
  Category,
  Dashboard,
  Money,
  ShoppingBag,
  Store,
} from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";

// components
import SideBarItem from "./SideBarItem";

// types
import { SidebarItem } from "../../../@types/sidebar";

// context
import { useThemeContext } from "../../../context/ThemeContext";

// utils
import { ADMIN_SIDEBAR_WIDTH } from "../../../utils/constants";

// sidebar menus
const sidebarItems: SidebarItem[] = [
  {
    title: "Dashboard",
    path: "/admin/dashboard",
    icon: <Dashboard />,
  },
  {
    title: "Users",
    path: "/admin/users",
    icon: <AccountCircle />,
  },
  {
    title: "Categories",
    path: "/admin/categories",
    icon: <Category />,
  },
  {
    title: "Products",
    path: "/admin/products",
    icon: <ShoppingBag />,
  },
  {
    title: "Orders",
    path: "/admin/orders",
    icon: <Money />,
  },
];

// component props type
type SideBarProps = {
  isOpen: boolean;
  handleClose: Function;
};

function SideBar({ isOpen, handleClose }: SideBarProps) {
  const { theme } = useThemeContext();

  // auth user state
  const user = useSelector((state: AppState) => state.auth.user);

  // sidebar content
  const renderContent = (
    <Box
      sx={{
        height: 1,
        "& .simplebar-content": {
          height: 1,
          display: "flex",
          flexDirection: "column",
        },
      }}
    >
      <Box
        sx={{
          px: 2.5,
          py: 3,
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
        }}
      >
        <Store fontSize={"large"} color="primary" />
        <Typography variant="h6" color={"primary"}>
          Logo
        </Typography>
      </Box>

      <Box sx={{ mb: 3, mx: 2.5 }}>
        <Link underline="none">
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              padding: "0.8rem 2rem",
              borderRadius: 1.5,
              backgroundColor: "action.selected",
            }}
          >
            <Avatar src={user?.avatar} alt="photoURL" />

            <Box sx={{ ml: 2 }}>
              <Typography variant="subtitle2" sx={{ color: "text.primary" }}>
                {user?.name}
              </Typography>

              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                {user?.role}
              </Typography>
            </Box>
          </Box>
        </Link>
      </Box>

      <Box>
        <List disablePadding sx={{ p: 1 }}>
          {sidebarItems.map((item) => (
            <SideBarItem key={item.path} item={item} />
          ))}
        </List>
      </Box>
      <Box sx={{ flexGrow: 1 }} />
    </Box>
  );

  const isDesktop = useMediaQuery(theme.breakpoints.up("lg"));

  return (
    <Box
      component="nav"
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: ADMIN_SIDEBAR_WIDTH },
      }}
    >
      {isDesktop ? (
        <Drawer
          open
          variant="permanent"
          PaperProps={{
            sx: {
              width: ADMIN_SIDEBAR_WIDTH,
              bgcolor: "background.default",
              borderRightStyle: "dashed",
            },
          }}
        >
          {renderContent}
        </Drawer>
      ) : (
        <Drawer
          variant="temporary"
          open={isOpen}
          onClose={() => handleClose()}
          ModalProps={{
            keepMounted: true,
          }}
          PaperProps={{
            sx: {
              width: ADMIN_SIDEBAR_WIDTH,
            },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </Box>
  );
}

export default SideBar;
