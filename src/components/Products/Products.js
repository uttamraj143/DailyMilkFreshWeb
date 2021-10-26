import { useState, useEffect, useContext } from "react";
import ProductsListing from "components/Products/ProductsListing";
import AddProduct from "components/Products/AddProduct";
import Spinner from "spinner.png";
import { ReactComponent as ProductIcon } from "components/svgs/checkList.svg";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
// import MiniNavbar from 'components/common/MiniNavbar';
import "./Products.scss";
import { listProducts } from "store/products";
import UserContext from "UserContext";

export default function Products() {
  const userInfo = useContext(UserContext);
  const [spinner, toggleSpinner] = useState(true);
  const [products, setProducts] = useState([]);
  const [not_products, setNotProducts] = useState([]);
  const [addagenttoggle, toggleAddProduct] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    listProducts(1, userInfo.access_token)
      .then((res) => {
        setProducts(res.data.data);
        listProducts(0, userInfo.access_token).then((res) => {
          setNotProducts(res.data.data);
          toggleSpinner(false);
        });
      })
      .catch((res) => {
        // optional chaining
        let status = res?.response?.status;
        if (status & (status === 401)) {
          userInfo.refreshAccessToken();
          toggleSpinner(true);
        }
      });
  }, [userInfo.access_token, userInfo, addagenttoggle]);

  const addProductClicked = (e) => {
    e && e.preventDefault();
    toggleAddProduct(!addagenttoggle);
  };

  return (
    <div className="Products__main-container">
      <div className="Orders__main-heading">
        <div className="General-main-heading">
          <ProductIcon /> {"  "} Products
        </div>
        <div>
          <button
            className="Users__refresh-button"
            onClick={(e) => addProductClicked(e)}
          >
            {addagenttoggle ? "Cancel Adding" : "Add new Product"}
          </button>
        </div>
      </div>

      {!spinner ? (
        <div>
          {addagenttoggle ? (
            <AddProduct
              toggleAddProduct={toggleAddProduct}
              access_token={userInfo.access_token}
            ></AddProduct>
          ) : (
            <>
              <ProductsListing products={products}></ProductsListing>
              <ProductsListing products={not_products}></ProductsListing>

              <div className="Orders__pagination">
                <Stack spacing={2}>
                  <Pagination
                    // onChange={(event, val) => modifyOrders(event, val)}
                    variant="outlined"
                    color="primary"
                    boundaryCount={2}
                    count={
                      products.length % 2 === 0
                        ? products.length / 2
                        : Math.floor(products.length / 2) + 1
                    }
                    page={page}
                  />
                </Stack>
              </div>
            </>
          )}
        </div>
      ) : (
        <div className="Products__spinner">
          <img height="150px" width="150px" src={Spinner} alt="Daily"></img>
        </div>
      )}
    </div>
  );
}
