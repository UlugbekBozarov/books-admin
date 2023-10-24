import { useState, MouseEvent, ReactNode } from "react";
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
import { Logout, User, UserTick } from "assets/icons";
import { useNavigate } from "react-router-dom";

interface SettingsItemType {
  id: string;
  icon: ReactNode;
  labelKey: string;
  link: string;
  disabled?: boolean;
}

const users: Array<SettingsItemType> = [
  {
    id: "profile",
    icon: <UserTick />,
    link: "/profile",
    disabled: true,
    labelKey: "profile",
  },
  {
    id: "logout",
    icon: <Logout />,
    link: "logout",
    labelKey: "logout",
  },
];

const Users = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpen = (event: MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorElUser(null);
  };

  const handleCloseUserMenu = (item: SettingsItemType) => () => {
    switch (get(item, "link")) {
      case "logout": {
        break;
      }
      default: {
        navigate(get(item, "link"));
      }
    }
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
        {users?.map((user) => (
          <MenuItem
            onClick={handleCloseUserMenu(user)}
            disabled={get(user, "disabled", false)}
            key={get(user, "id")}
          >
            <Box display="flex" alignItems="center">
              <Box
                width="24px"
                height="24px"
                display="flex"
                justifyContent="center"
                alignItems="center"
                mr="7px"
              >
                {get(user, "icon", "")}
              </Box>
              <Typography textAlign="center">
                <Trans>navbar.user.{get(user, "labelKey")}</Trans>
              </Typography>
            </Box>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default Users;
