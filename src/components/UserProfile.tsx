import React from "react";
// redux
import { useSelector } from "react-redux";
import { AppState } from "../redux/store";

// MUI
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Divider,
  Typography,
} from "@mui/material";

function UserProfile() {
  // auth state
  const user = useSelector((state: AppState) => state.auth.user);

  return (
    <Card
      sx={{
        minWidth: 256,
        textAlign: "center",
      }}
    >
      <CardContent>
        <Avatar
          sx={{ width: 60, height: 60, margin: "auto" }}
          src={user?.avatar}
        />
        <h3
          style={{
            fontSize: 18,
            fontWeight: "bold",
            letterSpacing: "0.5px",
            marginTop: 8,
            marginBottom: 0,
          }}
        >
          {user?.name}
        </h3>
      </CardContent>
      <Typography variant="h6" sx={{ textAlign: "left", padding: "0rem 3rem" }}>
        Personal Details
      </Typography>
      <Divider light sx={{ margin: "0.5rem 0rem" }} />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          borderRadius: "0.3rem",
          margin: "2rem",
          marginTop: "0.5rem",
          justifyContent: "flex-end",
          alignItems: "flex-start",
          textAlign: "left",
          padding: "1rem",
          gap: "1rem",
        }}
      >
        <Box>
          <Typography
            sx={{ fontSize: "14px", color: "text.primary", fontWeight: "500" }}
          >
            Full Name
          </Typography>
          <Typography
            sx={{
              fontSize: "14px",
              color: "text.secondary",
              fontWeight: "500",
            }}
          >
            {user?.name}
          </Typography>
        </Box>
        <Box>
          <Typography
            sx={{ fontSize: "14px", color: "text.primary", fontWeight: "500" }}
          >
            Email
          </Typography>
          <Typography
            sx={{
              fontSize: "14px",
              color: "text.secondary",
              fontWeight: "500",
            }}
          >
            {user?.email}
          </Typography>
        </Box>

        <Box>
          <Typography
            sx={{ fontSize: "14px", color: "text.primary", fontWeight: "500" }}
          >
            Role
          </Typography>
          <Typography
            sx={{
              fontSize: "14px",
              color: "text.secondary",
              fontWeight: "500",
            }}
          >
            {user?.role}
          </Typography>
        </Box>
      </Box>
    </Card>
  );
}

export default UserProfile;
