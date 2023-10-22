import { useState, MouseEvent } from "react";
import { Trans } from "react-i18next";
import {
  Avatar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import { get } from "lodash";

interface SettingsItemType {
  id: string;
  labelKey: string;
  to: string;
}

const settings: Array<SettingsItemType> = [
  {
    id: "profile",
    to: "/profile",
    labelKey: "profile",
  },
  {
    id: "logout",
    to: "/",
    labelKey: "logout",
  },
];

const Users = () => {
  const theme = useTheme();

  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpen = (event: MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorElUser(null);
  };

  const handleCloseUserMenu = (item: SettingsItemType) => () => {
    console.log("item: ", item);
    setAnchorElUser(null);
  };

  return (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title="Open settings">
        <IconButton onClick={handleOpen} sx={{ p: 0 }}>
          <Avatar
            alt="Remy Sharp"
            src="/static/images/avatar/2.jpg"
            sx={{ borderRadius: `${theme?.shape?.borderRadius}px` }}
          />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: "45px" }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorElUser)}
        onClose={handleClose}
      >
        {settings.map((setting) => (
          <MenuItem
            onClick={handleCloseUserMenu(setting)}
            key={get(setting, "id")}
          >
            <Typography textAlign="center">
              <Trans>{get(setting, "labelKey")}</Trans>
            </Typography>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default Users;
