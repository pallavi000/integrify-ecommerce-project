import * as React from "react";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

// MUI
import { Button, Card, Grid, TextField } from "@mui/material";

// types
import { UserAddressInputs } from "../@types/user";

// yup validation schema
const validationSchema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  address: yup.string().required("Address is required"),
  city: yup.string().required("City is required"),
  state: yup.string().required("State is required"),
  zip: yup.string().required("Zip code is required"),
  country: yup.string().required("Country is required"),
});

// compoenent props type
type AddressFormProps = { handleNext: Function };

export default function AddressForm({ handleNext }: AddressFormProps) {
  // react hook form with yup validation
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<UserAddressInputs>({
    resolver: yupResolver(validationSchema),
  });

  // form submit handler
  const onSubmit = (data: UserAddressInputs) => {
    // do something with address data
    handleNext();
  };
  return (
    <Card
      sx={{ padding: "1rem", paddingTop: 0 }}
      component={"form"}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Grid container spacing={3} sx={{ mt: 2, mb: 1 }}>
        <Grid item xs={12} sm={6}>
          <Controller
            name="firstName"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="First Name"
                variant="outlined"
                error={Boolean(errors.firstName)}
                helperText={errors.firstName?.message}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Controller
            name="lastName"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Last Name"
                variant="outlined"
                error={Boolean(errors.lastName)}
                helperText={errors.lastName?.message}
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            name="address"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Address"
                variant="outlined"
                error={Boolean(errors.address)}
                helperText={errors.address?.message}
              />
            )}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Controller
            name="city"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="City"
                variant="outlined"
                error={Boolean(errors.city)}
                helperText={errors.city?.message}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Controller
            name="state"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="State/Province/Region"
                variant="outlined"
                error={Boolean(errors.state)}
                helperText={errors.state?.message}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Controller
            name="zip"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Zip / Postal code"
                variant="outlined"
                error={Boolean(errors.zip)}
                helperText={errors.zip?.message}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Controller
            name="country"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Country"
                variant="outlined"
                error={Boolean(errors.country)}
                helperText={errors.country?.message}
              />
            )}
          />
        </Grid>
      </Grid>
      <Button
        sx={{ marginTop: "1rem", marginBottom: "1rem", float: "right" }}
        type="submit"
        variant="contained"
      >
        Next
      </Button>
    </Card>
  );
}
