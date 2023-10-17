import * as React from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
// redux
import { useSelector } from "react-redux";
import { AppState, useAppDispatch } from "../../../redux/store";

// MUI
import {
  Box,
  Button,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";

// types
import { CategoryInputs, TCategory } from "../../../@types/category";

// reducers
import { updateAdminCategory } from "../../../redux/reducers/admin/adminCategoryReducer";

// components
import LoadingButton from "../../LoadingButton";

// yup validation schema
const validationSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  image: yup.string().required("Image Link is required"),
});

// component props type
type AdminCategoryEditModalProps = {
  category: TCategory;
  isOpen: boolean;
  setIsOpen: Function;
};

export default function AdminCategoryEditModal({
  category,
  isOpen,
  setIsOpen,
}: AdminCategoryEditModalProps) {
  const dispatch = useAppDispatch();

  // user state
  const isLoading = useSelector(
    (state: AppState) => state.adminCategories.isLoading
  );

  // react hook form with yup validation
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<CategoryInputs>({
    resolver: yupResolver(validationSchema),
  });

  // set default values
  React.useEffect(() => {
    setValue("name", category.name);
    setValue("image", category.image);
  }, [category]);

  // form submit handler
  const onSubmit = async (data: CategoryInputs) => {
    const categoryData: TCategory = { ...data, id: category.id };
    await dispatch(updateAdminCategory(categoryData));
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
        <DialogTitle>Update Category</DialogTitle>
        <DialogContent>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "2rem",
              padding: "2rem 0rem",
            }}
          >
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <TextField
                  fullWidth
                  {...field}
                  label="Enter name"
                  variant="outlined"
                  error={Boolean(errors.name)}
                  helperText={errors.name?.message}
                />
              )}
            />
            <Controller
              name="image"
              control={control}
              render={({ field }) => (
                <TextField
                  fullWidth
                  {...field}
                  label="Enter Image Link"
                  variant="outlined"
                  error={Boolean(errors.image)}
                  helperText={errors.image?.message}
                />
              )}
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
