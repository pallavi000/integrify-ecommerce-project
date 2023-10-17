import * as React from "react";
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

// components
import UserForm from "../../UserForm";
import LoadingButton from "../../LoadingButton";

// reucers
import { addNewUser } from "../../../redux/reducers/admin/adminUserReducer";

// types
import { RegisterInputs } from "../../../@types/user";

// yup validation shchema
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

// component props type
type AdminUserAddModalProps = {
  isOpen: boolean;
  setIsOpen: Function;
};

export default function AdminUserAddModal({
  isOpen,
  setIsOpen,
}: AdminUserAddModalProps) {
  const dispatch = useAppDispatch();

  // user state
  const isLoading = useSelector(
    (state: AppState) => state.adminUsers.isLoading
  );

  // react hook form with yup validation
  const {
    handleSubmit,
    control,
    reset,
    setValue,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<RegisterInputs>({
    resolver: yupResolver(validationSchema),
  });

  // set default value for avatar
  React.useEffect(() => {
    setValue("avatar", "https://i.imgur.com/fpT4052.jpeg");
  }, []);

  // form submit handler
  const onSubmit = async (data: RegisterInputs) => {
    await dispatch(addNewUser(data));
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
        <DialogTitle>Add New User</DialogTitle>
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
          <LoadingButton isLoading={isLoading} color="success" title="Create" />
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
