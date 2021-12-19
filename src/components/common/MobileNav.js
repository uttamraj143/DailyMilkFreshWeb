import { useState, useRef, useContext } from "react";
import UserContext from "UserContext";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";

import Paper from "@mui/material/Paper";
import { ReactComponent as SettingsIcon } from "svgs/settingsIcon.svg";
// import { ReactComponent as CartIcon } from "svgs/cartIcon.svg";
// import { ReactComponent as QrIcon } from "svgs/qrcode.svg";
import { ReactComponent as TruckIcon } from "svgs/truck.svg";
import { ReactComponent as HomeIcon } from "svgs/home.svg";

export default function MobileNav(props) {
  const userInfo = useContext(UserContext);
  const isAdmin = () => {
    return userInfo.isAdmin;
  };
  const [value, setValue] = useState(0);
  let navigate = useNavigate();
  const ref = useRef(null);

  const changeMobileMenu = (e, sal) => {
    e.preventDefault();
    switch (sal.toString()) {
      case "0":
        return navigate("/");
      case "1":
        return isAdmin() ? navigate("orders") : navigate("deliveries");
      case "2":
        return navigate("settings");
    }
  };

  return (
    <Box sx={{ pb: 7 }} ref={ref}>
      <CssBaseline />

      <Paper
        sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
        elevation={3}
      >
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            changeMobileMenu(event, newValue);
            setValue(newValue);
          }}
        >
          <BottomNavigationAction
            label="Home"
            icon={<HomeIcon style={{ color: "#90a0ee" }} />}
          />
          {/* <BottomNavigationAction
            label="Delivery Types"
            icon={<CartIcon style={{ color: "#90a0ee" }} />}
          /> */}
          <BottomNavigationAction
            label="Deliveries"
            icon={<TruckIcon style={{ color: "#90a0ee" }} />}
          />
          {/* <BottomNavigationAction
            label="Scan QR"
            icon={<QrIcon style={{ color: "#90a0ee" }} />}
          /> */}
          <BottomNavigationAction
            label="Account"
            icon={<SettingsIcon style={{ color: "#90a0ee" }} />}
          />
        </BottomNavigation>
      </Paper>
    </Box>
  );
}
