import React, { useEffect, useState } from "react";
// redux
import { useSelector } from "react-redux";
import { AppState, useAppDispatch } from "../../redux/store";

// MUI
import { Button, Container, Grid, Stack, Typography } from "@mui/material";

// icons
import { Add } from "@mui/icons-material";

// components
import AdminCategoryCard from "../../components/admin/categories/AdminCategoryCard";
import AdminCategoryAddModal from "../../components/admin/categories/AdminCategoryAddModal";
import SkeletonCategoryCard from "../../components/skeleton/SkeletonCategoryCard";

// reducers
import { fetchAdminCategories } from "../../redux/reducers/admin/adminCategoryReducer";

function AdminCategories() {
  const dispatch = useAppDispatch();

  // categories states
  const { categories, isLoading } = useSelector((state: AppState) => ({
    categories: state.adminCategories.data,
    isLoading: state.adminCategories.isLoading,
  }));

  // new category modal state
  const [isNewCategoryModalOpen, setIsNewCategoryModalOpen] = useState(false);

  // fetch categories
  useEffect(() => {
    dispatch(fetchAdminCategories());
  }, []);

  return (
    <Container>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={5}
      >
        <Typography variant="h6">Categories</Typography>
        <Button
          onClick={() => setIsNewCategoryModalOpen(true)}
          size="small"
          variant="contained"
          startIcon={<Add />}
        >
          New Category
        </Button>
      </Stack>

      <AdminCategoryAddModal
        isOpen={isNewCategoryModalOpen}
        setIsOpen={setIsNewCategoryModalOpen}
      />

      <Grid container spacing={3}>
        {isLoading && !categories.length
          ? [...Array(8)].map((_, index) => (
              <Grid key={index} item xs={12} sm={6} md={3}>
                <SkeletonCategoryCard key={index} />
              </Grid>
            ))
          : categories.map((category) => (
              <Grid key={category.id} item xs={6} sm={4} md={3}>
                <AdminCategoryCard category={category} />
              </Grid>
            ))}
      </Grid>
    </Container>
  );
}

export default AdminCategories;
