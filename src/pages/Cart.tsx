import React from "react";
import { Link } from "react-router-dom";
// redux
import { useSelector } from "react-redux";
import { AppState, useAppDispatch } from "../redux/store";

// MUI
import {
  Alert,
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

// icons
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";

// types
import { TCart } from "../@types/cart";

// components
import CartItem from "../components/CartItem";

function Cart() {
  // cart items state
  const cart = useSelector((state: AppState) => state.cart);
  const { items } = cart;

  return (
    <Container>
      <Box>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant={"h4"} gutterBottom>
            Shopping Cart
          </Typography>
          <Link to="/checkout">
            <Button
              variant="contained"
              disabled={!Boolean(items.length)}
              endIcon={<KeyboardArrowRight />}
            >
              Checkout
            </Button>
          </Link>
        </Box>
        {items.length ? (
          <>
            <TableContainer>
              <Table
                sx={{
                  minWidth: 650,
                }}
                aria-label="simple table"
              >
                <TableHead>
                  <TableRow>
                    <TableCell>Product</TableCell>
                    <TableCell>Category</TableCell>
                    <TableCell align="center">Quantity</TableCell>
                    <TableCell>Price</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {items.map((item: TCart) => (
                    <CartItem key={item.product.id} item={item} />
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Grid
              container
              spacing={2}
              justifyContent={"space-between"}
              alignItems={"flex-start"}
              marginTop={"1rem"}
            >
              <Grid
                item
                xs={12}
                sm={5}
                md={4}
                container
                alignItems={"flex-end"}
              >
                <Link to="/">
                  <Button variant="outlined" startIcon={<KeyboardArrowLeft />}>
                    Continue Shopping
                  </Button>
                </Link>
              </Grid>
              <Grid item xs={12} sm={5} md={4}>
                <Grid container spacing={1}>
                  <Grid item xs={5}>
                    <Typography variant="h6">Subtotal:</Typography>
                  </Grid>
                  <Grid item xs={7}>
                    <Typography align="right" variant="body1">
                      ${cart.totalPrice}
                    </Typography>
                  </Grid>
                  <Grid item xs={5}>
                    <Typography variant="h6">Shipping:</Typography>
                  </Grid>
                  <Grid item xs={7}>
                    <Typography align="right" variant="body1">
                      $0
                    </Typography>
                  </Grid>
                </Grid>
                <br />
                <Divider />
                <br />
                <Grid container spacing={1}>
                  <Grid item xs={5}>
                    <Typography variant="h6">Total:</Typography>
                  </Grid>
                  <Grid item xs={7}>
                    <Typography align="right" variant="body1">
                      ${cart.totalPrice}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </>
        ) : (
          <Alert severity="error" sx={{ marginTop: "2rem" }}>
            No item added in your shopping cart!
          </Alert>
        )}
      </Box>
    </Container>
  );
}

export default Cart;
