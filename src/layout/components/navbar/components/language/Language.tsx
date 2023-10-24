import { useState, MouseEvent } from "react";
import { Box, Menu, MenuItem, Typography } from "@mui/material";
import { get } from "lodash";

import { Sun } from "assets/icons";

import { StyledIconButton } from "./Language.style";

const languages: Array<string> = [];

const Language = () => {
  const [anchorElLanguage, setAnchorElLanguage] = useState<null | HTMLElement>(
    null
  );

  const handleOpen = (event: MouseEvent<HTMLElement>) => {
    setAnchorElLanguage(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorElLanguage(null);
  };

  const handleCloseUserMenu = (item: string) => () => {
    setAnchorElLanguage(null);
  };

  return (
    <Box mr="10px">
      <StyledIconButton onClick={handleOpen}>
        <Sun />
      </StyledIconButton>
      <Menu
        sx={{ mt: "45px" }}
        id="menu-appbar"
        anchorEl={anchorElLanguage}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorElLanguage)}
        onClose={handleClose}
      >
        {languages.map((language) => (
          <MenuItem
            onClick={handleCloseUserMenu(language)}
            key={get(language, "id")}
          >
            <Typography textAlign="center">
              {get(language, "labelKey")}
            </Typography>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default Language;
