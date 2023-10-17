import React, { useEffect } from "react";
// redux
import { useSelector } from "react-redux";
import { AppState, useAppDispatch } from "../../redux/store";

// MUI
import {
  Card,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableFooter,
  TablePagination,
  Typography,
  Chip,
  TextField,
  InputAdornment,
  Box,
} from "@mui/material";

// icons
import { Search } from "@mui/icons-material";

// types
import { TOrder } from "../../@types/order";
import OrderTableBody from "../../components/admin/orders/OrderTableBody";

function AdminOrders() {
  // pagination states
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  // filter states
  const [filterOrderId, setFilterOrderId] = React.useState("");

  // orders states
  const orders: TOrder[] = useSelector((state: AppState) => state.orders.data);

  // handle search by order id
  const handleFilterByOrderId = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPage(0);
    setFilterOrderId(event.target.value);
  };

  // pagination handlers
  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // filter orders
  const filterOrders = orders.filter((u) => u.orderId.includes(filterOrderId));

  const isNotFound = !filterOrders.length && !!filterOrderId;

  return (
    <Container>
      <Card>
        <TextField
          size="small"
          sx={{ ml: 1, flex: 1, margin: "1rem" }}
          placeholder="Search Ordes By ID"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
          onChange={handleFilterByOrderId}
        />
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Items</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Payment Method</TableCell>
                <TableCell>Delivery Status</TableCell>
                <TableCell>Total</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filterOrders
                .slice(page * rowsPerPage, rowsPerPage + page * rowsPerPage)
                .map((order) => {
                  return <OrderTableBody order={order} key={order.orderId} />;
                })}
            </TableBody>

            {isNotFound && (
              <TableBody>
                <TableRow>
                  <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                    <Typography variant="h6" paragraph>
                      Not found
                    </Typography>

                    <Typography variant="body2">
                      No results found for &nbsp;
                      <strong>&quot;{filterOrderId}&quot;</strong>.
                      <br /> Try checking for the Order ID.
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableBody>
            )}

            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[10, 25]}
                  count={filterOrders.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </Card>
    </Container>
  );
}

export default AdminOrders;
