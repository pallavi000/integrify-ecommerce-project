import React from "react";
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
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputAdornment,
  TextField,
  InputLabel,
  Select,
  FormHelperText,
  MenuItem,
} from "@mui/material";

// types
import {
  ProductInputs,
  ProductInputsData,
  TProduct,
} from "../../../@types/product";
import { TCategory } from "../../../@types/category";

// reducers
import { updateAdminProduct } from "../../../redux/reducers/admin/adminProductReducer";

// icons
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

// components
import LoadingButton from "../../LoadingButton";

// yup validation schema
const validationSchema = yup.object().shape({
  title: yup.string().required("Name is required"),
  price: yup.number().required("Price is required"),
  description: yup.string().required("Description is required"),
  categoryId: yup.number().required("Category is required"),
  image: yup.string().required("Image is required"),
});

// component props type
type AdminProductEditModalProps = {
  product: TProduct;
  categories: TCategory[];
  isOpen: boolean;
  setIsOpen: Function;
};

function AdminProductEditModal({
  product,
  categories,
  isOpen,
  setIsOpen,
}: AdminProductEditModalProps) {
  const dispatch = useAppDispatch();

  // user state
  const isLoading = useSelector(
    (state: AppState) => state.adminProducts.isLoading
  );

  // react hook form with yup validation
  const {
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm<ProductInputs>({
    resolver: yupResolver(validationSchema),
  });

  // set default values
  React.useEffect(() => {
    setValue("title", product.title);
    setValue("price", product.price);
    setValue("categoryId", product.category.id);
    setValue("description", product.description);
    setValue("image", product.images[0]);
  }, [product]);

  // form submit handler
  const onSubmit = async (data: ProductInputs) => {
    const productData: ProductInputsData = {
      ...data,
      id: product.id,
      images: [data.image, ...product.images],
    };
    await dispatch(updateAdminProduct(productData));
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
        <DialogTitle>Update Product</DialogTitle>
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
              name="title"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Title"
                  variant="outlined"
                  error={Boolean(errors.title)}
                  helperText={errors.title?.message}
                />
              )}
            />
            <Controller
              name="price"
              control={control}
              render={({ field }) => (
                <TextField
                  type="number"
                  {...field}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AttachMoneyIcon />
                      </InputAdornment>
                    ),
                  }}
                  label="Price"
                  variant="outlined"
                  error={Boolean(errors.price)}
                  helperText={errors.price?.message}
                />
              )}
            />
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Description"
                  multiline
                  minRows={4}
                  variant="outlined"
                  error={Boolean(errors.description)}
                  helperText={errors.description?.message}
                />
              )}
            />

            <Controller
              name="categoryId"
              control={control}
              render={({ field }) => (
                <FormControl error={Boolean(errors.categoryId)}>
                  <InputLabel id="demo-simple-select-label">
                    Select a category
                  </InputLabel>
                  <Select
                    {...field}
                    label="Select a category"
                    variant="outlined"
                    error={Boolean(errors.categoryId)}
                  >
                    {categories.map((category) => {
                      return (
                        <MenuItem key={category.id} value={category.id}>
                          {category.name}
                        </MenuItem>
                      );
                    })}
                  </Select>
                  {errors.categoryId?.message ? (
                    <FormHelperText>
                      {errors.categoryId?.message}
                    </FormHelperText>
                  ) : null}
                </FormControl>
              )}
            />

            <Controller
              name="image"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Image Link"
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

export default AdminProductEditModal;
