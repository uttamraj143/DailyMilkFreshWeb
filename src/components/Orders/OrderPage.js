import { useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";

export default function OrderPage(props) {
  const [state, setState] = useState({
    age: "",
    name: "hai",
  });

  const handleChange = (event) => {
    const name = event.target.name;
    setState({
      ...state,
      [name]: event.target.value,
    });
  };

  return (
    <div>
      <FormControl>
        <InputLabel shrink htmlFor="age-native-label-placeholder">
          Order status
        </InputLabel>
        <NativeSelect
          value={state.age}
          onChange={handleChange}
          inputProps={{
            name: "age",
            id: "age-native-label-placeholder",
          }}
        >
          <option value="booked">booked</option>
          <option>intransit</option>
          <option>pickedup</option>
          <option>delivered</option>
          <option>cancelled</option>
        </NativeSelect>
        <FormHelperText>change order status</FormHelperText>
      </FormControl>
      <div>Scan me</div>
    </div>
  );
}
