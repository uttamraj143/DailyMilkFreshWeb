import { useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import { listUsers } from "store/user";
import CheckBoxOutlineBlankIcon from "svgs/unchecked.svg";
import CheckBoxIcon from "svgs/checked.svg";
import { useQuery } from "react-query";

const icon = <img src={CheckBoxOutlineBlankIcon} alt="dsd" fontSize="small" />;
const checkedIcon = <img src={CheckBoxIcon} alt="dsds" fontSize="small" />;
<CheckBoxIcon fontSize="small" />;

export default function SelectUser(props) {
  const [users, setUsers] = useState([]);
  const { access_token, refreshAccessToken } = props;

  const { isLoading } = useQuery([2, access_token], listUsers, {
    onSuccess: (data) => {
      data?.data && setUsers(data.data.data);
      console.log(isLoading);
    },
    onError: (error) => {
      if (error && error.response && error.response.status === 401) {
        refreshAccessToken();
      }
    },
  });

  return (
    <div className="AssignUsers__main">
      <Autocomplete
        // multiple
        onChange={(e, value) => props.handleData(e, value.user_id, "agent")}
        id="checkboxes-tags-demo"
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
          <TextField {...params} label="Select Agents" placeholder="Agents" />
        )}
      />
    </div>
  );
}
