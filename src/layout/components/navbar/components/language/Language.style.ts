import { IconButton, styled } from "@mui/material";

export const StyledIconButton = styled(IconButton)(({ theme }) => ({
  width: "40px",
  height: "40px",
  borderRadius: `${theme?.shape?.borderRadius}px`,
  border: `1px solid`,
  borderColor: "#DAE2ED",
  "&:hover": {
    borderColor: "#C7D0DD",
  },
}));
