import { NavLink, useNavigate, useParams } from "react-router-dom";

// MUI
import {
  Card,
  Container,
  Grid,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

// icons
import UserIcon from "@mui/icons-material/AccountCircle";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

// types
import UserProfile from "../components/UserProfile";
import Orders from "../components/Orders";

function Account() {
  const navigate = useNavigate();

  // page | "orders" | null
  const { page } = useParams();

  return (
    <Container>
      <Grid container spacing={4}>
        <Grid item sm={12} md={4} sx={{ width: "100%" }}>
          <Card>
            <List disablePadding>
              <ListItemButton
                component={NavLink}
                to="/account/profile"
                sx={{
                  position: "relative",
                  textTransform: "capitalize",
                  color: "text.secondary",
                  "&.active": {
                    color: "text.primary",
                    bgcolor: "action.selected",
                    fontWeight: "bold",
                  },
                }}
              >
                <ListItemIcon>
                  <UserIcon />
                </ListItemIcon>
                <ListItemText primary="Account" />
              </ListItemButton>

              <ListItemButton
                component={NavLink}
                to="/account/orders"
                sx={{
                  position: "relative",
                  textTransform: "capitalize",
                  color: "text.secondary",
                  "&.active": {
                    color: "text.primary",
                    bgcolor: "action.selected",
                    fontWeight: "bold",
                  },
                }}
              >
                <ListItemIcon>
                  <ShoppingCartIcon />
                </ListItemIcon>
                <ListItemText primary="Orders" />
              </ListItemButton>
            </List>
          </Card>
        </Grid>
        <Grid item sm={12} md={8} width={"100%"}>
          {page && page === "orders" ? <Orders /> : <UserProfile />}
        </Grid>
      </Grid>
    </Container>
  );
}

export default Account;
