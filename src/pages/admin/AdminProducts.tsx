import React, { useEffect } from "react";
// redux
import { useSelector } from "react-redux";
import { AppState, useAppDispatch } from "../../redux/store";

// MUI
import {
  Button,
  Card,
  Checkbox,
  Container,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableFooter,
  TablePagination,
  Typography,
  TextField,
  InputAdornment,
  LinearProgress,
} from "@mui/material";

// icons
import { Add, Search } from "@mui/icons-material";

// reducers
import {
  deleteAdminProduct,
  fetchAdminAllProducts,
} from "../../redux/reducers/admin/adminProductReducer";
import { fetchAdminCategories } from "../../redux/reducers/admin/adminCategoryReducer";

// components
import TableOptionPopover from "../../components/TableOptionPopover";
import ProductTableBody from "../../components/admin/products/ProductTableBody";
import AdminProductEditModal from "../../components/admin/products/AdminProductEditModal";
import AdminProductAddModal from "../../components/admin/products/AdminProductAddModal";

// types
import { TProduct } from "../../@types/product";

function AdminProducts() {
  const dispatch = useAppDispatch();

  // pagination states
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  // filter states
  const [selectedProducts, setSelectedProducts] = React.useState<number[]>([]);
  const [filterName, setFilterName] = React.useState("");

  // popover control states
  const [popoverEle, setPopOverEle] = React.useState<
    (EventTarget & HTMLButtonElement) | null
  >(null);
  const [activeProduct, setActiveProduct] = React.useState<null | TProduct>(
    null
  );

  // modal control states
  const [isAddModalOpen, setIsAddModalOpen] = React.useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);

  // products state
  const { products, isLoading } = useSelector((state: AppState) => ({
    products: state.adminProducts.data,
    isLoading: state.adminProducts.isLoading,
  }));

  // categories
  const categories = useSelector(
    (state: AppState) => state.adminCategories.data
  );

  // fetch categories & products
  useEffect(() => {
    dispatch(fetchAdminAllProducts());
    // categories for adding and editing products
    dispatch(fetchAdminCategories());
  }, []);

  // handle checkbox all click
  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = products.map((u) => u.id);
      setSelectedProducts(newSelecteds);
      return;
    }
    setSelectedProducts([]);
  };

  // handle single checkbox click
  const handleSelectClick = (
    event: React.ChangeEvent<HTMLInputElement>,
    id: number
  ) => {
    if (selectedProducts.includes(id)) {
      const filterdSelectedUsers = selectedProducts.filter((s) => s !== id);
      setSelectedProducts(filterdSelectedUsers);
    } else {
      setSelectedProducts((prev) => [...prev, id]);
    }
  };

  // handle search by name
  const handleFilterByName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  // paginations
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

  // popover handler
  const handlePopoverOpen = (
    e: React.MouseEvent<HTMLButtonElement>,
    product: TProduct
  ) => {
    setActiveProduct(product);
    setPopOverEle(e.currentTarget);
  };

  const handlePopoverClose = () => {
    setPopOverEle(null);
    //setActiveUser(null);
  };

  // handle popover menus click
  const handleProductEditClick = () => {
    handlePopoverClose();
    setIsEditModalOpen(true);
  };

  const handleProductDeleteClick = async () => {
    if (activeProduct)
      await dispatch(deleteAdminProduct({ id: activeProduct.id }));
    handlePopoverClose();
  };

  // serach/filter products
  const filterProducts = products.filter((u) =>
    u.title.toLocaleLowerCase().includes(filterName.toLocaleLowerCase())
  );
  const isNotFound = !filterProducts.length && !!filterName;

  return (
    <Container>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={5}
      >
        <Typography variant="h6">Products</Typography>
        <Button
          size="small"
          variant="contained"
          startIcon={<Add />}
          onClick={() => setIsAddModalOpen(true)}
        >
          New Product
        </Button>
      </Stack>

      <AdminProductAddModal
        categories={categories}
        isOpen={isAddModalOpen}
        setIsOpen={setIsAddModalOpen}
      />
      {products.length ? (
        <AdminProductEditModal
          categories={categories}
          isOpen={isEditModalOpen}
          setIsOpen={setIsEditModalOpen}
          product={activeProduct || products[0]}
        />
      ) : null}

      <Card>
        <TextField
          size="small"
          sx={{ ml: 1, flex: 1, margin: "1rem" }}
          placeholder="Search Products"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
          onChange={handleFilterByName}
        />
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    indeterminate={
                      selectedProducts.length > 0 &&
                      selectedProducts.length < products.length
                    }
                    checked={
                      products.length > 0 &&
                      selectedProducts.length === products.length
                    }
                    onChange={handleSelectAllClick}
                  />
                </TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>&nbsp;</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filterProducts
                .slice(page * rowsPerPage, rowsPerPage + page * rowsPerPage)
                .map((product) => {
                  return (
                    <ProductTableBody
                      key={product.id}
                      product={product}
                      selectedProducts={selectedProducts}
                      handleSelectClick={handleSelectClick}
                      handlePopoverOpen={handlePopoverOpen}
                    />
                  );
                })}
            </TableBody>

            {isLoading && !products.length && (
              <TableBody>
                <TableRow>
                  <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                    <LinearProgress />
                  </TableCell>
                </TableRow>
              </TableBody>
            )}

            {isNotFound && (
              <TableBody>
                <TableRow>
                  <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                    <Typography variant="h6" paragraph>
                      Not found
                    </Typography>

                    <Typography variant="body2">
                      No results found for &nbsp;
                      <strong>&quot;{filterName}&quot;</strong>.
                      <br /> Try checking for typos or using complete words.
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableBody>
            )}

            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[10, 25]}
                  count={filterProducts.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
        <TableOptionPopover
          isLoading={isLoading}
          anchorEl={popoverEle}
          handleEdit={handleProductEditClick}
          handleDelete={handleProductDeleteClick}
          handleCloseMenu={handlePopoverClose}
        />
      </Card>
    </Container>
  );
}

export default AdminProducts;
