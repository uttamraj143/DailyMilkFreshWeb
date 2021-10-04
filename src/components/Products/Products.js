import { useState, useEffect, useContext } from "react";
import ProductsListing from "components/Products/ProductsListing";
import AddProduct from "components/Products/AddProduct";
import Spinner from "spinner.png";

// import MiniNavbar from 'components/common/MiniNavbar';
import "./Products.scss";
import { listProducts } from "store/products";
import UserContext from "UserContext";

export default function Products() {
  const userInfo = useContext(UserContext);

  const [products, setProducts] = useState([]);
  const [not_products, setNotProducts] = useState([]);
  const [addagenttoggle, toggleAddProduct] = useState(false);

  useEffect(() => {
    listProducts(1, userInfo.access_token)
      .then((res) => {
        setProducts(res.data.data);
        listProducts(0, userInfo.access_token).then((res) => {
          setNotProducts(res.data.data);
        });
      })
      .catch((res) => {
        if (res.response.status === 401) {
          userInfo.refreshAccessToken();
        }
      });
  }, [userInfo.access_token]);

  const addProductClicked = (e) => {
    e.preventDefault();
    toggleAddProduct(!addagenttoggle);
  };

  return (
    <div className="Products__main-container">
      {products.length ? (
        <div>
          <div>
            <button
              className="Products__refresh-button"
              onClick={(e) => addProductClicked(e)}
            >
              {addagenttoggle ? "Cancel Adding" : "Add new Product"}
            </button>
          </div>

          {addagenttoggle ? (
            <AddProduct
              toggleAddProduct={toggleAddProduct}
              access_token={userInfo.access_token}
            ></AddProduct>
          ) : (
            <>
              <ProductsListing products={products}></ProductsListing>
              <ProductsListing products={not_products}></ProductsListing>
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
