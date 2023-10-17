import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
// Redux
import { AppState, useAppDispatch } from "../redux/store";
import { useSelector } from "react-redux";

// MUI
import {
  Box,
  Button,
  Card,
  Container,
  TextField,
  Typography,
} from "@mui/material";

// reducer
import { loginUser } from "../redux/reducers/authReducer";

// types
import { LoginInputs } from "../@types/user";

// components
import LoadingButton from "../components/LoadingButton";

// routes
import { ROUTES } from "../routes/routers";

// yup validation schema
const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

function SignIn() {
  const navigate = useNavigate();

  // app dispatch
  const dispatch = useAppDispatch();

  // auth states
  const { user, isLoading } = useSelector((state: AppState) => ({
    user: state.auth.user,
    isLoading: state.auth.isLoading,
  }));

  // react hook form with yup validation
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LoginInputs>({
    resolver: yupResolver(validationSchema),
  });

  // redirect after login success
  React.useEffect(() => {
    if (user) {
      user.role && user.role === "admin"
        ? navigate(ROUTES.ADMIN_DASHBOARD)
        : navigate(ROUTES.HOME);
    }
  }, [user]);

  // form submit handler
  const onSubmit: SubmitHandler<LoginInputs> = (data) => {
    dispatch(loginUser(data));
  };

  return (
    <Container maxWidth="sm">
      <Card
        component={"form"}
        onSubmit={handleSubmit(onSubmit)}
        variant="outlined"
        sx={{ padding: "3rem", textAlign: "center" }}
      >
        <Typography variant="h4" marginBottom={"3rem"}>
          Sign In
        </Typography>

        <Box sx={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Enter Email"
                variant="outlined"
                error={Boolean(errors.email)}
                helperText={errors.email?.message}
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <TextField
                type="password"
                {...field}
                id="outlined-basic"
                label="Password"
                variant="outlined"
                error={Boolean(errors.password)}
                helperText={errors.password?.message}
              />
            )}
          />
          <LoadingButton
            isLoading={isLoading}
            color="success"
            title="Sign In"
          />
        </Box>
      </Card>
    </Container>
  );
}

export default SignIn;
