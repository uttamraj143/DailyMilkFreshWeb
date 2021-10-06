import { useState } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";

export default function MySnack(props) {
  const [isOpen, setIsopen] = useState(true);
  return (
    <div>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={isOpen}
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
