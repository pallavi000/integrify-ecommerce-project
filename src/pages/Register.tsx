import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
// redux
import { useSelector } from "react-redux";
import { AppState, useAppDispatch } from "../redux/store";

// MUI
import { Box, Card, Container, Typography } from "@mui/material";

// components
import UserForm from "../components/UserForm";
import LoadingButton from "../components/LoadingButton";

// reducers
import { loginUser, registerUser } from "../redux/reducers/authReducer";

// types
import { RegisterInputs } from "../@types/user";

// routes
import { ROUTES } from "../routes/routers";

// yup form validation schema
const validationSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  role: yup.string().oneOf(["admin", "customer"]).required("Role is required"),
  avatar: yup.string().required("Role is required"),
});

function Register() {
  const navigate = useNavigate();

  // app dispatch
  const dispatch = useAppDispatch();

  const [isEmailAvailable, setIsEmailAvailable] = useState(false);

  // auth states
  const { user, isLoading } = useSelector((state: AppState) => ({
    user: state.auth.user,
    isLoading: state.auth.isLoading,
  }));

  // redirect user after successful registraion/login
  React.useEffect(() => {
    if (user) {
      navigate(ROUTES.HOME);
    }
  }, [user]);

  // react hook form with yup validation
  const {
    handleSubmit,
    control,
    setValue,
    setError,
    clearErrors,
    getValues,
    formState: { errors },
  } = useForm<RegisterInputs>({
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    // demo avatar link set
    setValue("avatar", "https://i.imgur.com/fpT4052.jpeg");
  }, []);

  useEffect(() => {
    if (getValues("email") && !errors.email) {
      console.log("ooooo");
      setIsEmailAvailable(true);
    }
  }, [errors, getValues]);

  // form submit handler
  const onSubmit: SubmitHandler<RegisterInputs> = async (data) => {
    await dispatch(registerUser(data));
    // login user
    dispatch(loginUser({ email: data.email, password: data.password }));
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
          Register
        </Typography>

        <Box sx={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
          <UserForm
            control={control}
            errors={errors}
            setError={setError}
            clearErrors={clearErrors}
          />
          <LoadingButton
            isLoading={isLoading}
            isDisabled={!isEmailAvailable}
            color="success"
            title="Register"
          />
        </Box>
      </Card>
    </Container>
  );
}

export default Register;
