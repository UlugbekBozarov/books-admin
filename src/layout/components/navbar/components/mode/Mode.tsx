import { useContext } from "react";
import { Box } from "@mui/material";

import { Moon, Sun } from "assets/icons";
import { AppContext } from "context";

import IconButton from "../button/IconButton";

const Mode = () => {
  const {
    state: { mode },
    actions: { handleChangeMode },
  } = useContext<any>(AppContext);

  return (
    <Box mr="10px">
      <IconButton onClick={handleChangeMode}>
        {mode === "light" ? <Moon /> : <Sun />}
      </IconButton>
    </Box>
  );
};

export default Mode;
