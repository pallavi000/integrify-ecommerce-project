import React from "react";
//redux
import { useSelector } from "react-redux";
import { AppState } from "../redux/store";

// MUI
import {
  Alert,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

// components
import OrderItem from "./OrderItem";

// types
import { TOrder } from "../@types/order";

function Orders() {
  // orders state
  const orders = useSelector((state: AppState) => state.orders.data);

  return (
    <>
      {orders.length ? (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Order ID</TableCell>
                <TableCell>Items</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Method</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Qty</TableCell>
                <TableCell>Subtotal</TableCell>
                <TableCell>Order Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order: TOrder) => {
                return <OrderItem key={order.orderId} order={order} />;
              })}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Alert severity="error" sx={{ marginTop: "2rem" }}>
          No orders yet! Your orders will be shown here.
        </Alert>
      )}
    </>
  );
}

export default Orders;
