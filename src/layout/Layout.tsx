import { Suspense, useState } from "react";
import { Outlet } from "react-router-dom";
import { Box, useTheme } from "@mui/material";
import { get } from "lodash";

import { Navbar, Sidebar } from "./components";
import { Spinner } from "components/common";

const drawerWidth = 280;

const Layout = () => {
  const theme = useTheme();

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
          height: { xs: "calc(100vh - 76px)", sm: "calc(100vh - 84px)" },
          marginTop: { xs: "76px", sm: "84px" },
        }}
      >
        <Box height="100%" sx={{ overflowY: "auto", p: 2 }}>
          <Suspense fallback={<Spinner />}>
            <Outlet />
          </Suspense>
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;
