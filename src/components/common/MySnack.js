import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import { useState, useEffect } from "react";

export default function MySnack(props) {
  const [open, setOpen] = useState(Boolean(props.message));
  const handleClose = (e) => {
    e.preventDefault();
    setOpen(false);
  };

  useEffect(() => {
    setOpen(true);
  }, [props.message]);

  return (
    <div>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={open}
        autoHideDuration={2000}
        message={props.message}
        action={
          <>
            <IconButton
              onClick={(e) => handleClose(e)}
              size="small"
              aria-label="close"
              color="inherit"
            >
              x
            </IconButton>
          </>
        }
      />
    </div>
  );
}
