import { useState, useEffect } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import { listProducts } from "store/products";
import CheckBoxOutlineBlankIcon from "components/svgs/unchecked.svg";
import CheckBoxIcon from "components/svgs/checked.svg";

const icon = <img src={CheckBoxOutlineBlankIcon} alt="dsd" fontSize="small" />;
const checkedIcon = <img src={CheckBoxIcon} alt="dsds" fontSize="small" />;
<CheckBoxIcon fontSize="small" />;

export default function SelectProduct(props) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getAllProducts = () => {
      listProducts(null, props.access_token)
        .then((res) => {
          setProducts(res.data.data);
          //   toggleSpinner(false);
        })
        .catch((res) => {
          if (res && res.response && res.response.status === 401) {
            // toggleSpinner(true);
            // props.refreshAccessToken();
            window.location.reload();
          }
        });
    };
    getAllProducts();
  }, []);

  return (
    <div className="AssignUsers__main">
      <Autocomplete
        // multiple
        id="checkboxes-tags-demo"
        onChange={(e, value) =>
          props.handleData(e, value.product_type, "product")
        }
        options={products}
        // disableCloseOnSelect
        getOptionLabel={(option) => option.name}
        renderOption={(props, option, { selected }) => (
          <li {...props}>
            <Checkbox
              icon={icon}
              checkedIcon={checkedIcon}
              style={{ marginRight: 8 }}
              checked={selected}
            />
            {option.name}
          </li>
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Select Products"
            placeholder="products"
          />
        )}
      />
    </div>
  );
}
