import React, { useState } from "react";

// MUI
import {
  Avatar,
  Checkbox,
  IconButton,
  Stack,
  TableCell,
  TableRow,
  Typography,
  Chip,
} from "@mui/material";

// icons
import { MoreVert } from "@mui/icons-material";

// types
import { TProduct } from "../../../@types/product";

// component props type
type ProductTableBodyProps = {
  product: TProduct;
  selectedProducts: number[];
  handleSelectClick: Function;
  handlePopoverOpen: Function;
};

function ProductTableBody({
  product,
  selectedProducts,
  handleSelectClick,
  handlePopoverOpen,
}: ProductTableBodyProps) {
  // is this table row selected?
  const selectedProduct = selectedProducts.indexOf(product.id) !== -1;
  return (
    <TableRow
      hover
      key={product.id}
      tabIndex={-1}
      role="checkbox"
      selected={selectedProduct}
    >
      <TableCell padding="checkbox">
        <Checkbox
          checked={selectedProduct}
          onChange={(event) => handleSelectClick(event, product.id)}
        />
      </TableCell>
      <TableCell component="th" scope="row" padding="none">
        <Stack direction="row" alignItems="center" spacing={2}>
          <Avatar alt={product.title} src={product.images[0]} />
          <Typography variant="body1" noWrap>
            {product.title}
          </Typography>
        </Stack>
      </TableCell>
      <TableCell component={"td"} align="left">
        <div
          style={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            width: "15rem",
          }}
        >
          <Typography
            variant="caption"
            fontWeight={"400"}
            color={"text.primary"}
            noWrap
          >
            {product.description}
          </Typography>
        </div>
      </TableCell>
      <TableCell align="left">
        <Stack direction="row" alignItems="center" spacing={2}>
          <Avatar
            alt={product.category.name}
            src={product.category.image}
            sx={{
              width: 24,
              height: 24,
            }}
          />
          <Typography
            variant="caption"
            fontWeight={"400"}
            color={"text.primary"}
          >
            {product.category.name}
          </Typography>
        </Stack>
      </TableCell>
      <TableCell align="left">
        <Chip color="success" size="small" label={`$${product.price}`} />
      </TableCell>
      <TableCell align="right">
        <IconButton
          size="large"
          color="inherit"
          onClick={(e) => handlePopoverOpen(e, product)}
        >
          <MoreVert />
        </IconButton>
      </TableCell>
    </TableRow>
  );
}

export default ProductTableBody;
