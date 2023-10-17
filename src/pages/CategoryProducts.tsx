import React, { useState } from "react";
import { useParams } from "react-router-dom";
// redux
import { useSelector } from "react-redux";
import { AppState, useAppDispatch } from "../redux/store";

// MUI
import {
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
  ButtonGroup,
} from "@mui/material";

// reducers
import {
  fetchProductsByCategory,
  setCategory,
} from "../redux/reducers/categoryReducer";

// components
import Product from "../components/Product";
import BreadCrumb from "../components/Breadcrumb";
import SidebarFilter from "../components/SidebarFilter";
import SkeletonProductCard from "../components/skeleton/SkeletonProductCard";
import BannerContainer from "../components/BannerContainer";

// icons
import GridViewIcon from "@mui/icons-material/GridView";
import { ArrowLeft, ArrowRight } from "@mui/icons-material";

function CategoryProducts() {
  const { id } = useParams();

  // app dispatch
  const dispatch = useAppDispatch();

  // pagination states
  const [offset, setOffset] = useState<number>(0);
  const [limit, setLimit] = useState<number>(12);

  // sidebar filter states
  const [price, setPrice] = React.useState<number[]>([1, 5000]);
  const [selectedCategory, setSelectedCategory] = useState<number>(Number(id));

  // categoreis states
  const categories = useSelector((state: AppState) => state.categories.data);

  // current category and it's products state
  const { category, products, isLoading } = useSelector((state: AppState) => ({
    category: state.category.data,
    products: state.category.products,
    isLoading: state.category.isLoading,
  }));

  // fetch products of a category
  React.useEffect(() => {
    dispatch(
      fetchProductsByCategory({
        id: selectedCategory,
        offset,
        limit,
        price_min: price[0],
        price_max: price[1],
        categoryId: selectedCategory,
      })
    );
  }, [id, offset, limit, price, selectedCategory]);

  // set current category
  React.useEffect(() => {
    if (categories.length) {
      const foundCategory = categories.find((cat) => cat.id === Number(id));
      if (foundCategory) dispatch(setCategory(foundCategory));
    }
  }, [categories, id]);

  const handlePrevPage = () => {
    setOffset((prev) => prev - limit);
  };
  const handleNextPage = () => {
    setOffset((prev) => prev + limit);
  };

  const handleChange = (e: SelectChangeEvent) => {
    setLimit(Number(e.target.value));
  };

  return (
    <Container maxWidth="xl" sx={{ padding: "2rem 1rem" }}>
      <BannerContainer />
      <Box sx={{ margin: "2rem 0rem" }}>
        <BreadCrumb label={category?.name || ""} />
        <Typography variant="h4" color={"primary.main"} margin={"1rem 0rem"}>
          {category?.name}
        </Typography>
      </Box>
      <Grid container columns={12} spacing={4} sx={{ padding: "2rem 0rem" }}>
        <Grid item xs={12} md={4} lg={3}>
          <SidebarFilter
            price={price}
            setPrice={setPrice}
            setSelectedCategory={setSelectedCategory}
          />
        </Grid>
        <Grid item xs={12} md={8} lg={9}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <GridViewIcon />
              <Typography variant="h6">
                Showing {offset} - {offset + limit} items
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <Typography variant="h6">Show </Typography>
              <FormControl fullWidth>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={limit.toString()}
                  onChange={handleChange}
                >
                  <MenuItem value={12}>12</MenuItem>
                  <MenuItem value={20}>20</MenuItem>
                  <MenuItem value={30}>30</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Box>
          <Grid container spacing={3} columns={12} sx={{ marginTop: "2rem" }}>
            {isLoading
              ? [...Array(limit)].map((_, index) => (
                  <SkeletonProductCard key={index} />
                ))
              : products.map((product) => {
                  return <Product key={product.id} product={product} />;
                })}
          </Grid>
          <ButtonGroup sx={{ float: "right" }}>
            <Button
              variant="contained"
              disabled={isLoading || !Boolean(offset)}
              startIcon={<ArrowLeft />}
              onClick={handlePrevPage}
            >
              Prev
            </Button>
            <Button disabled size="small">
              <Typography variant="body1">
                {Math.ceil((offset + 1) / limit)}
              </Typography>
            </Button>
            <Button
              variant="contained"
              disabled={isLoading || products.length !== limit ? true : false}
              endIcon={<ArrowRight />}
              onClick={handleNextPage}
            >
              Next
            </Button>
          </ButtonGroup>
        </Grid>
      </Grid>
    </Container>
  );
}

export default CategoryProducts;
