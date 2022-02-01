import TextField from "@mui/material/TextField";

export default function OrdersCancel(props) {
  return (
    <>
      <div>
        Cancel order Delivery id: {props.order}
        <TextField
          id="frdate"
          label="From Date"
          type="date"
          defaultValue={new Date().toLocaleDateString("fr-CA")}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          id="todate"
          label="From Date"
          type="date"
          defaultValue={new Date().toLocaleDateString("fr-CA")}
          onChange={(newValue) => {
            console.log(newValue.target.value);
          }}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <button>dfdfddf</button>
      </div>
    </>
  );
}
