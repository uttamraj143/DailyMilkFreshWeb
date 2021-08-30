import { useState } from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';

export default function OrderPage(props) {
  const [state, setState] = useState({
    age: '',
    name: 'hai',
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
        <InputLabel shrink htmlFor='age-native-label-placeholder'>
          Order status
        </InputLabel>
        <NativeSelect
          value={state.age}
          onChange={handleChange}
          inputProps={{
            name: 'age',
            id: 'age-native-label-placeholder',
          }}>
          <option value='booked'>booked</option>
          <option>intransit</option>
          <option>pickedup</option>
          <option>delivered</option>
          <option>cancelled</option>
        </NativeSelect>
        <FormHelperText>change order status</FormHelperText>
      </FormControl>
      <div>
        dsdsdskljdldkjdkljdls dsdsdskljdldkjdkljdls dsdsdskljdldkjdkljdls dsdsdskljdldkjdkljdls
        dsdsdskljdldkjdkljdls dsdsdskljdldkjdkljdls dsdsdskljdldkjdkljdls dsdsdskljdldkjdkljdls
        dsdsdskljdldkjdkljdls dsdsdskljdldkjdkljdls
      </div>
    </div>
  );
}
