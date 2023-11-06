import { FC, Fragment } from "react";
import { Trans, useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Toolbar,
} from "@mui/material";
import { get } from "lodash";

import { Books, Category, Logout, Settings, Test, Users } from "assets/icons";

const DrawerContend = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const goTo = (link: string) => () => {
    switch (link) {
      case "logout": {
        break;
      }
      default: {
        navigate(link);
      }
    }
  };

  return (
    <Fragment>
      <Toolbar sx={{ height: "76px" }} />
      <Divider />
      <Box height="calc(100vh - 230px)" sx={{ overflowY: "auto" }}>
        <List
          subheader={
            <ListSubheader>
              <Trans>sidebar.mainMenu</Trans>
            </ListSubheader>
          }
        >
          {[
            {
              id: "books",
              link: "/books",
              labelKey: "books",
              icon: <Books />,
            },
            {
              id: "categories",
              link: "/categories",
              labelKey: "categories",
              icon: <Category />,
            },
            {
              id: "tests",
              link: "/tests",
              labelKey: "tests",
              icon: <Test />,
            },
            {
              id: "users",
              link: "/users",
              disabled: true,
              labelKey: "users",
              icon: <Users />,
            },
          ].map((item) => (
            <ListItem disablePadding key={get(item, "id")}>
              <ListItemButton
                selected={location.pathname.startsWith(get(item, "link"))}
                onClick={goTo(get(item, "link"))}
                disabled={get(item, "disabled", false)}
              >
                <ListItemIcon
                  sx={{ display: "flex", justifyContent: "center" }}
                >
                  <Box
                    width="28px"
                    height="28px"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                  >
                    {get(item, "icon", "")}
                  </Box>
                </ListItemIcon>
                <ListItemText primary={t(`sidebar.${get(item, "labelKey")}`)} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
      <Box height="152px">
        <List
          subheader={
            <ListSubheader>
              <Trans>sidebar.preference</Trans>
            </ListSubheader>
          }
        >
          {[
            {
              id: "settings",
              disabled: true,
              link: "/settings",
              labelKey: "settings",
              icon: <Settings />,
            },
            {
              id: "logout",
              link: "logout",
              labelKey: "logout",
              icon: <Logout />,
            },
          ].map((item) => (
            <ListItem key={get(item, "id")} disablePadding>
              <ListItemButton
                onClick={goTo(get(item, "link"))}
                disabled={get(item, "disabled", false)}
              >
                <ListItemIcon
                  sx={{ display: "flex", justifyContent: "center" }}
                >
                  <Box
                    width="28px"
                    height="28px"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                  >
                    {get(item, "icon", "")}
                  </Box>
                </ListItemIcon>
                <ListItemText primary={t(`sidebar.${get(item, "labelKey")}`)} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Fragment>
  );
};

interface SidebarProps {
  drawerWidth?: number;
  open?: boolean;
  onClose?: () => void;
}

const Sidebar: FC<SidebarProps> = ({ drawerWidth = 240, open, onClose }) => {
  return (
    <Fragment>
      <Drawer
        variant="temporary"
        open={open}
        onClose={onClose}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
          },
        }}
      >
        <DrawerContend />
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", md: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
          },
        }}
        open
      >
        <DrawerContend />
      </Drawer>
    </Fragment>
  );
};

export default Sidebar;
