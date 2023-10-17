import React from "react";

// MUI
import { TableCell, TableRow, Typography, Chip, Box } from "@mui/material";

// types
import { TOrder } from "../../../@types/order";

// component props type
type OrderTableBodyProps = {
  order: TOrder;
};

function OrderTableBody({ order }: OrderTableBodyProps) {
  return (
    <TableRow>
      <TableCell>{order.orderId}</TableCell>

      <TableCell component="th" scope="row">
        {order.items.map((item) => {
          return (
            <Box
              key={`${order.orderId}-${item.product.id}`}
              display={"flex"}
              alignItems={"center"}
              sx={{ marginBottom: "0.5rem" }}
              gap={"0.5rem"}
            >
              <Box width={32} height={32}>
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
              <div
                style={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  width: "20rem",
                }}
              >
                <Typography
                  variant="caption"
                  color={"text.primary"}
                  fontSize={14}
                  noWrap
                >
                  {item.product.title}
                </Typography>
              </div>
            </Box>
          );
        })}
      </TableCell>
      <TableCell>
        <Typography variant="caption" fontWeight={"400"} color={"text.primary"}>
          {order.orderDate}
        </Typography>
      </TableCell>
      <TableCell>
        <Typography variant="caption" fontWeight={"400"} color={"text.primary"}>
          {order.paymentMethod}
        </Typography>
      </TableCell>
      <TableCell>
        <Chip color="success" size="small" label={`${order.deliveryStatus}`} />
      </TableCell>
      <TableCell>${order.total}</TableCell>
    </TableRow>
  );
}

export default OrderTableBody;
