import { useState, useEffect, useContext } from "react";
import ProductsListing from "components/Products/ProductsListing";
import AddProduct from "components/Products/AddProduct";
import Spinner from "components/common/Spinner";
import Skeleton from "@mui/material/Skeleton";
import { ReactComponent as ProductIcon } from "svgs/checkList.svg";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
// import MiniNavbar from 'components/common/MiniNavbar';
import "./Products.scss";
import { listProducts } from "store/products";
import UserContext from "UserContext";

export default function Products() {
  const userInfo = useContext(UserContext);
  const [spinner, toggleSpinner] = useState(false);
  const [products, setProducts] = useState([]);
  const [addagenttoggle, toggleAddProduct] = useState(false);
  const [page] = useState(1);

  useEffect(() => {
    toggleSpinner(true);
    listProducts(null, userInfo.access_token)
      .then((res) => {
        setProducts(res.data.data);
        toggleSpinner(false);
      })
      .catch((res) => {
        // optional chaining
        let status = res?.response?.status;
        if (status & (status === 401)) {
          userInfo.refreshAccessToken();
          toggleSpinner(false);
        }
      });
  }, [userInfo.access_token, userInfo, addagenttoggle]);

  const addProductClicked = (e) => {
    e && e.preventDefault();
    toggleAddProduct(!addagenttoggle);
  };

  return (
    <div className="main-container">
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
        <>
          <div className="Products__card-container">
            {addagenttoggle ? (
              <AddProduct
                toggleAddProduct={toggleAddProduct}
                access_token={userInfo.access_token}
              ></AddProduct>
            ) : (
              <>
                {products.map((product, index) => {
                  return (
                    <ProductsListing
                      access_token={userInfo.access_token}
                      key={index}
                      products={product}
                    ></ProductsListing>
                  );
                })}
              </>
            )}
          </div>

          <div
            className={
              addagenttoggle
                ? "Orders__pagination Orders__pagination-none"
                : "Orders__pagination"
            }
          >
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
      ) : (
        <div className="Products__spinners">
          <Spinner />
          <Skeleton animation="wave" height={100} width="80%" />
          <Skeleton
            variant="rectangular"
            animation="wave"
            width={210}
            height={118}
          />
          {/* <img height="150px" width="150px" src={Spinner} alt="Daily"></img> */}
        </div>
      )}
    </div>
  );
}
