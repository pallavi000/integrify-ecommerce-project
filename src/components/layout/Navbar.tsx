import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// redux
import { useSelector } from "react-redux";
import { AppState, useAppDispatch } from "../../redux/store";

// MUI
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Avatar,
  Badge,
  InputAdornment,
  Menu,
  MenuItem,
  OutlinedInput,
  Tooltip,
} from "@mui/material";

// icons
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { FavoriteBorder, ShoppingBagOutlined } from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search";
import StoreIcon from "@mui/icons-material/Store";

// types
import { TUser } from "../../@types/user";

// reducers
import { logoutUser } from "../../redux/reducers/authReducer";
import { fetchCategories } from "../../redux/reducers/categoriesReducer";

// routes
import { ROUTES } from "../../routes/routers";

// helpers
import { showCustomToastr } from "../../utils/helper";

// components
import ThemeModeSwitch from "../ThemeModeSwitch";
import MobileNavbarDrawer from "./MobileNavbarDrawer";

export default function Navbar() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // user profile icon click popover state
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  // search state
  const [searchQuery, setSearchQuery] = useState("");

  // auth states
  const { user }: { user: TUser | null } = useSelector((state: AppState) => ({
    user: state.auth.user,
  }));

  // cart state
  const cartItem = useSelector((state: AppState) => state.cart);

  // categories
  const categories = useSelector((state: AppState) => state.categories.data);

  // fetch categories
  React.useEffect(() => {
    dispatch(fetchCategories());
  }, []);

  // handle user profile/icon click popover
  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // logout handler
  const logout = () => {
    handleClose();
    dispatch(logoutUser());
    navigate(ROUTES.HOME);
  };

  // search
  const handleSearchQueryChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = () => {
    if (searchQuery?.trim().length < 3) {
      return showCustomToastr(
        "Search query length must of at least of 3 characters.",
        "error"
      );
    }
    navigate(`/search/?query=${searchQuery}`);
  };

  return (
    <>
      <AppBar
        position="static"
        color={"primary"}
        elevation={0}
        sx={{
          borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
          padding: "0.5rem 0rem",
          backgroundColor: "background.default",
          color: "text.primary",
        }}
      >
        <Toolbar
          sx={{
            flexWrap: "wrap",
            display: "flex",
            gap: "2rem",
          }}
        >
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              gap: "2rem",
              alignItems: "center",
            }}
          >
            <Link
              to="/"
              style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
            >
              <StoreIcon fontSize={"large"} color="primary" />
              <Typography variant="h6" color={"primary"}>
                हाम्रो-Closet
              </Typography>
            </Link>
            {categories.slice(0, 4).map((category) => {
              return (
                <Link
                  color="text.primary"
                  to={`/category/${category.id}/products`}
                  key={category.id}
                >
                  <Typography variant="body1" fontWeight={"500"}>
                    {category.name}
                  </Typography>
                </Link>
              );
            })}
          </Box>

          <Box
            component={"nav"}
            sx={{
              display: "flex",
              gap: "1.5rem",
              alignItems: "center",
              justifyContent: "space-between",
              flexGrow: 1,
            }}
          >
            <MobileNavbarDrawer
              categories={categories}
              handleSearch={handleSearch}
              handleSearchQueryChange={handleSearchQueryChange}
            />

            <Box
              sx={{
                gap: "1.5rem",
                alignItems: "center",
                justifyContent: "flex-end",
                display: { xs: "none", md: "flex" },
                flexGrow: 1,
              }}
            >
              <OutlinedInput
                required
                id="outlined-required"
                size="small"
                sx={{ background: "default" }}
                placeholder="Search for products..."
                onChange={handleSearchQueryChange}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSearch();
                  }
                }}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton edge="end">
                      <SearchIcon onClick={() => handleSearch()} />
                    </IconButton>
                  </InputAdornment>
                }
              />
              <ThemeModeSwitch />
            </Box>

            {user ? (
              <Box
                sx={{ display: "flex", gap: "0.5rem", alignItems: "center" }}
              >
                <IconButton>
                  <FavoriteBorder />
                </IconButton>

                <IconButton onClick={() => navigate(ROUTES.CART)}>
                  <Badge badgeContent={cartItem.items.length} color="success">
                    <ShoppingBagOutlined />
                  </Badge>
                </IconButton>

                <Tooltip title={user.name}>
                  <IconButton onClick={handleMenu}>
                    <Avatar
                      alt={user.name}
                      src={user.avatar}
                      sx={{ width: 32, height: 32 }}
                    />
                  </IconButton>
                </Tooltip>

                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                  PaperProps={{
                    sx: {
                      mt: 2.2,
                      ml: 0.75,
                      width: 200,
                    },
                  }}
                >
                  <MenuItem
                    onClick={() => {
                      handleClose();
                      navigate("/account/profile");
                    }}
                    sx={{ minWidth: 180 }}
                  >
                    <AccountCircleIcon sx={{ marginRight: "0.5rem" }} /> Profile
                  </MenuItem>
                  <MenuItem onClick={logout}>
                    <LogoutIcon sx={{ marginRight: "0.5rem" }} /> Logout
                  </MenuItem>
                </Menu>
              </Box>
            ) : (
              <Box
                sx={{ display: "flex", gap: "1.5rem", alignItems: "center" }}
              >
                <Link to={ROUTES.SIGN_IN}>
                  <Button variant="contained">Login</Button>
                </Link>
                <Link to={ROUTES.REGISTER}>
                  <Button variant="outlined">Register</Button>
                </Link>
              </Box>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </>
  );
}
