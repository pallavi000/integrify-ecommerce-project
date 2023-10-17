import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
// redux
import { useSelector } from "react-redux";
import { AppState, useAppDispatch } from "../../../redux/store";

// MUI
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

// reducers
import { updateUser } from "../../../redux/reducers/admin/adminUserReducer";

// components
import UserForm from "../../UserForm";
import LoadingButton from "../../LoadingButton";

// types
import { RegisterInputs, TUser } from "../../../@types/user";

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

// component props type
type AdminUserEditModalProps = {
  user: TUser;
  isOpen: boolean;
  setIsOpen: Function;
};

function AdminUserEditModal({
  user,
  isOpen,
  setIsOpen,
}: AdminUserEditModalProps) {
  const dispatch = useAppDispatch();

  // user state
  const isLoading = useSelector(
    (state: AppState) => state.adminUsers.isLoading
  );

  // react hook form with yup validation
  const {
    handleSubmit,
    control,
    setValue,
    reset,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<RegisterInputs>({
    resolver: yupResolver(validationSchema),
  });

  // set default values
  React.useEffect(() => {
    setValue("email", user.email);
    setValue("name", user.name);
    setValue("avatar", user.avatar);
    if (user?.role) {
      setValue("role", user.role);
    }
  }, [user]);

  // form submit handler
  const onSubmit = async (data: RegisterInputs) => {
    const userData: TUser = { ...user, ...data };
    await dispatch(updateUser(userData));
    reset();
    setIsOpen(false);
  };

  return (
    <React.Fragment>
      <Dialog
        component={"form"}
        onSubmit={handleSubmit(onSubmit)}
        fullWidth
        open={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <DialogTitle>Update User</DialogTitle>
        <DialogContent>
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
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            color="error"
            onClick={() => setIsOpen(false)}
          >
            Cancel
          </Button>
          <LoadingButton isLoading={isLoading} color="success" title="Update" />
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

export default AdminUserEditModal;
