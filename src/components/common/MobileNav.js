import * as React from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";

import Paper from "@mui/material/Paper";
import settingsIcon from "components/svgs/settingsIcon.svg";
import cartIcon from "components/svgs/cartIcon.svg";
import truckIcon from "components/svgs/truck.svg";
import usersIcon from "components/svgs/users.svg";
import userBadge from "components/svgs/userBadge.svg";
import exportIcon from "components/svgs/export.svg";
import listIcon from "components/svgs/checkList.svg";
import CheckBoxOutlineBlankIcon from "components/svgs/unchecked.svg";

export default function FixedBottomNavigation() {
  const [value, setValue] = React.useState(0);
  const ref = React.useRef(null);

  const RestoreIcon = <img src={userBadge} fontSize="small" />;
  const FavoriteIcon = <img src={CheckBoxOutlineBlankIcon} fontSize="small" />;
  const ArchiveIcon = (
    <img style={{ color: "black" }} src={userBadge} fontSize="small" />
  );

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
            setValue(newValue);
          }}
        >
          <BottomNavigationAction label="Recents" icon={RestoreIcon} />
          <BottomNavigationAction label="Favorites" icon={FavoriteIcon} />
          <BottomNavigationAction label="Archive" icon={ArchiveIcon} />
        </BottomNavigation>
      </Paper>
    </Box>
  );
}
