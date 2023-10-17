import React from "react";

// MUI
import { TableCell, TableRow, Chip } from "@mui/material";

// type
import { TOrder } from "../@types/order";

// components
import OrderItemItem from "./OrderItemItem";

// component props type
type OrderItemProps = { order: TOrder };

function OrderItem({ order }: OrderItemProps) {
  return (
    <>
      <TableRow>
        <TableCell rowSpan={order.items.length + 1}>
          <Chip label={`#${order.orderId}`} />
        </TableCell>
      </TableRow>
      {order.items.map((item) => {
        return (
          <OrderItemItem
            key={`${order.orderId}-${item.product.id}`}
            order={order}
            item={item}
          />
        );
      })}
    </>
  );
}

export default OrderItem;
