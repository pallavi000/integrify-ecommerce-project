import React from "react";
import { Link } from "react-router-dom";

// MUI
import { Box, Grid, Typography } from "@mui/material";

// icons
import { FavoriteBorder } from "@mui/icons-material";

// types
import { TProduct } from "../@types/product";

// component props type
type ProductProps = { product: TProduct };

function Product({ product }: ProductProps) {
  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Box sx={{ height: "412px" }}>
        <Link to={`/product-detail/${product.id}`}>
          <img
            src={product.images[0]}
            alt={product.title}
            height={250}
            style={{
              objectFit: "cover",
              width: "100%",
              borderRadius: "0.5rem",
            }}
          />
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "1rem",
            }}
          >
            <Box>
              <Typography variant="body1">{product.title}</Typography>
              <Typography variant="body2" color={"#626262"}>
                {product.category?.name}
              </Typography>
              <Typography variant="h6">${product.price}</Typography>
            </Box>
            <Box>
              <FavoriteBorder />
            </Box>
          </Box>
        </Link>
      </Box>
    </Grid>
  );
}

export default Product;
