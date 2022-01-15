import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
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
import Paper from "@mui/material/Paper";
import MySnack from "components/common/MySnack";

export default function EditProducts() {
  const navigate = useNavigate();
  const userInfo = useContext(UserContext);
  const [spinner, toggleSpinner] = useState(false);
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState();

  useEffect(() => {
    toggleSpinner(true);
    listProducts(null, userInfo.access_token)
      .then((res) => {
        setProducts(res.data.data);
        setCurrentProduct();
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
  }, [userInfo.access_token]);

  const setCurrentProduct = () => {
    let curr_id = window.location.pathname.split("/")[2];
    if (curr_id) {
      let abb = products.find((item) => item.id == curr_id);
      setSelectedProduct(abb);
    }
  };

  const goBack = (e) => {
    e.preventDefault();
    navigate("/products");
  };

  //   const modifyHistoryData = (hist) => {
  //     // setHistoryData(hist);
  //     hist.forEach((item, index) => {
  //       let abc = {
  //         id: index + 1,
  //         user_name: item.UserDetail.name,
  //         // agent_name: item.UserDetail.name,
  //         delivery_type: item.DeliveryType.name,
  //         product: item.Product.name,
  //         quantity: item.quantity,
  //         price: item.price,
  //         delivered_at: new Date(item.delivered_at).toLocaleString("en-Gb"),
  //       };
  //       setHistoryData((prevData) => [...prevData, abc]);
  //     });
  //   };

  return (
    <div className="main-container">
      <div className="Orders__main-heading">
        <div className="General-main-heading">
          <ProductIcon /> {"  "} Edit Product
        </div>
        <div>
          <button className="Users__refresh-button" onClick={(e) => goBack(e)}>
            {" "}
            Back to Products
          </button>
        </div>
      </div>
      {!spinner ? (
        <div>fdffdfdf</div>
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
