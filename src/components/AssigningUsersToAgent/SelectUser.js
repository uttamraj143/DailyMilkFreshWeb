import { useState, useEffect } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import { listUsers } from "store/user";
import CheckBoxOutlineBlankIcon from "components/svgs/unchecked.svg";
import CheckBoxIcon from "components/svgs/checked.svg";

const icon = <img src={CheckBoxOutlineBlankIcon} alt="dsd" fontSize="small" />;
const checkedIcon = <img src={CheckBoxIcon} alt="dsds" fontSize="small" />;
<CheckBoxIcon fontSize="small" />;

export default function SelectUser(props) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getAllUsers = () => {
      listUsers(3, props.access_token)
        .then((res) => {
          // toggleSpinner(false);
          setUsers(res.data.data);
        })
        .catch((res) => {
          if (res && res.response && res.response.status === 401) {
            // toggleSpinner(true);
            // props.refreshAccessToken();
            window.location.reload();
          }
        });
    };
    getAllUsers();
  }, []);

  return (
    <div className="AssignUsers__main">
      <Autocomplete
        // multiple
        id="checkboxes-tags-demo"
        onChange={(e, value) => props.handleData(e, value.user_id, "user")}
        options={users}
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
          <TextField {...params} label="Select Users" placeholder="Users" />
        )}
      />
    </div>
  );
}
