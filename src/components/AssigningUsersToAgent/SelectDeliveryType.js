import { useState, useEffect } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import { listDeliveryTypes } from "store/deliveries";

import CheckBoxOutlineBlankIcon from "components/svgs/unchecked.svg";
import CheckBoxIcon from "components/svgs/checked.svg";

const icon = <img src={CheckBoxOutlineBlankIcon} alt="dsd" fontSize="small" />;
const checkedIcon = <img src={CheckBoxIcon} alt="dsds" fontSize="small" />;
<CheckBoxIcon fontSize="small" />;

export default function SelectUser(props) {
  const [deliverytotal, setDeliveryTypes] = useState([]);

  useEffect(() => {
    const getAllTypes = () => {
      listDeliveryTypes(props.access_token)
        .then((res) => {
          setDeliveryTypes(res.data.data);
        })
        .catch((res) => {
          if (res && res.response && res.response.status === 401) {
            window.location.reload();
          }
        });
    };
    getAllTypes();
  }, []);

  return (
    <div className="AssignUsers__main">
      <Autocomplete
        id="checkboxes-tags-demo"
        onChange={(e, value) =>
          props.handleData(e, value.delivery_type, "delivery_type")
        }
        options={deliverytotal}
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
            label="Select deliver type"
            placeholder="delivery_type"
          />
        )}
      />
    </div>
  );
}
