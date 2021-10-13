import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";

export default function MySnack(props) {
  return (
    <div>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={true}
        autoHideDuration={2000}
        message={props.message}
        action={
          <>
            <IconButton size="small" aria-label="close" color="inherit">
              x
            </IconButton>
          </>
        }
      />
    </div>
  );
}
