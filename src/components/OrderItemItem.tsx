import React from "react";
import { Link } from "react-router-dom";

// MUI
import { TableCell, TableRow, Box, Chip, Tooltip } from "@mui/material";

// types
import { TOrder } from "../@types/order";
import { TCart } from "../@types/cart";

// component props type
type OrderItemItemProps = {
  order: TOrder;
  item: TCart;
};

function OrderItemItem({ order, item }: OrderItemItemProps) {
  return (
    <TableRow>
      <TableCell component="th" scope="row">
        <Tooltip title={item.product.title}>
          <Link to={`/product-detail/${item.product.id}`}>
            <Box width={40} height={40}>
              <img
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                }}
                alt={item.product.title}
                src={item.product.images[0]}
              />
            </Box>
          </Link>
        </Tooltip>
      </TableCell>
      <TableCell>{order.orderDate}</TableCell>
      <TableCell align="center">{order.paymentMethod}</TableCell>
      <TableCell>${item.product.price}</TableCell>
      <TableCell>{item.quantity}</TableCell>
      <TableCell>${item.product.price * item.quantity}</TableCell>
      <TableCell>
        <Chip size="small" label={order.deliveryStatus} color="primary" />
      </TableCell>
    </TableRow>
  );
}

export default OrderItemItem;
