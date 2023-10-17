import React from "react";
import {
  Controller,
  Control,
  FieldErrors,
  UseFormSetError,
  UseFormClearErrors,
} from "react-hook-form";

// MUI
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";

// types
import { RegisterInputs } from "../@types/user";

// axios
import axiosInstance from "../utils/AxiosInstance";

// component props type
type UserFormProps = {
  control: Control<RegisterInputs, any>;
  errors: FieldErrors<RegisterInputs>;
  setError: UseFormSetError<RegisterInputs>;
  clearErrors: UseFormClearErrors<RegisterInputs>;
};

function UserForm({ control, errors, setError, clearErrors }: UserFormProps) {
  // is email available?
  const handleEmailValidation = async (
    e: React.FocusEvent<HTMLInputElement>
  ) => {
    if (!e.target.value) return;
    try {
      const data = { email: e.target.value };
      const response = await axiosInstance.post("/users/is-available", data);
      if (!response.data.isAvailable) {
        setError("email", {
          type: "manual",
          message: "Email is already taken.",
        });
      } else {
        clearErrors("email");
      }
    } catch (error) {
      setError("email", {
        type: "manual",
        message: "Email is already taken.",
      });
    }
  };

  return (
    <>
      <Controller
        name="name"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Full name"
            variant="outlined"
            error={Boolean(errors.name)}
            helperText={errors.name?.message}
          />
        )}
      />
      <Controller
        name="email"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            onBlur={handleEmailValidation}
            label="Email"
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
      <Controller
        name="role"
        control={control}
        render={({ field }) => (
          <FormControl error={Boolean(errors.role)}>
            <InputLabel id="demo-simple-select-label">Select a role</InputLabel>
            <Select
              {...field}
              label="Select a role"
              variant="outlined"
              error={Boolean(errors.role)}
            >
              <MenuItem value="customer">Customer</MenuItem>
              <MenuItem value="admin">Admin</MenuItem>
            </Select>
            {errors.role?.message ? (
              <FormHelperText>{errors.role?.message}</FormHelperText>
            ) : null}
          </FormControl>
        )}
      />
    </>
  );
}

export default UserForm;
