import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Box, useTheme } from "@mui/material";

import { Navbar, Sidebar } from "./components";
import { get } from "lodash";

const drawerWidth = 280;

const Layout = () => {
  const theme = useTheme();
  console.log("theme: ", theme);

  const [open, setOpen] = useState<boolean>(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box
      sx={{
        display: "flex",
        background: get(theme, "palette.background.default"),
      }}
    >
      <Navbar onOpen={handleOpen} drawerWidth={drawerWidth} />
      <Box
        component="aside"
        sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
        aria-label="mailbox folders"
      >
        <Sidebar open={open} onClose={handleClose} drawerWidth={drawerWidth} />
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { md: `calc(100% - ${drawerWidth}px)` },
          height: { xs: "calc(100vh - 56px)", sm: "calc(100vh - 64px)" },
          marginTop: { xs: "56px", sm: "64px" },
        }}
      >
        <Box sx={{ overflowY: "auto", p: 2 }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;
