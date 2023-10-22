import { FC } from "react";
import { AppBar, Box, Toolbar } from "@mui/material";

import { Menu } from "assets/icons";

import { IconButton, Mode, Users } from "./components";

interface NavbarProps {
  drawerWidth?: number;
  onOpen?: () => void;
}

const Navbar: FC<NavbarProps> = ({ drawerWidth = 240, onOpen }) => {
  return (
    <AppBar
      component="nav"
      sx={{
        width: { md: `calc(100% - ${drawerWidth}px)` },
        ml: { md: `${drawerWidth}px` },
      }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          onClick={onOpen}
          iconColorField="stroke"
          sx={{
            display: { md: "none" },
            mr: 2,
          }}
        >
          <Menu />
        </IconButton>
        <Box width="100%" display="flex" justifyContent="flex-end">
          {/* <Language /> */}
          <Mode />
          <Users />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
