import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSelector } from "react-redux";
// redux
import { AppState, useAppDispatch } from "../../redux/store";

// MUI
import { Box, Button, Container, Typography } from "@mui/material";

// components
import UserForm from "../../components/UserForm";

// types
import { RegisterInputs, TUser } from "../../@types/user";

// reducers
import { updateUser } from "../../redux/reducers/admin/adminUserReducer";

// yup validation schema
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
  avatar: yup.string().required("Avatar is required"),
});

function AdminProfile() {
  const dispatch = useAppDispatch();

  // auth user state
  const user = useSelector((state: AppState) => state.auth.user);

  // react hook form with yup validation
  const {
    handleSubmit,
    control,
    setValue,
    setError,
    clearErrors,
    reset,
    formState: { errors },
  } = useForm<RegisterInputs>({
    resolver: yupResolver(validationSchema),
  });

  // set default value
  React.useEffect(() => {
    if (user) {
      setValue("email", user.email);
      setValue("name", user.name);
      setValue("avatar", user.avatar);
      setValue("role", user.role || "customer");
    }
  }, [user]);

  // form submit handler
  const onSubmit = async (data: RegisterInputs) => {
    if (!user) return;
    const userData: TUser = { ...user, ...data };
    await dispatch(updateUser(userData));
    reset();
  };

  return (
    <Container maxWidth="sm">
      <Box
        component={"form"}
        onSubmit={handleSubmit(onSubmit)}
        sx={{ padding: "1rem", textAlign: "center" }}
      >
        <Typography variant="h4" marginBottom={"1rem"}>
          Update Profile
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "2rem",
              padding: "2rem 0rem",
            }}
          >
            <UserForm
              control={control}
              errors={errors}
              setError={setError}
              clearErrors={clearErrors}
            />
          </Box>
          <Button type="submit" variant="contained">
            Update
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default AdminProfile;
