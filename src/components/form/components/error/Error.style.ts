import { styled } from "@mui/material";

export const StyledError = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  background: "#EBEEF2",
  borderRadius: theme?.shape?.borderRadius,
  padding: "8px 12px",
  marginTop: "10px",
  boxSizing: "border-box",
  "& svg path": {
    fill: theme?.palette?.error?.main,
  },
}));
