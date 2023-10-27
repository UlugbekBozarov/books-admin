import { styled } from "@mui/material";
import { get } from "lodash";

export const StyledInfoContent = styled("div")(({ theme }) => ({
  borderRadius: get(theme, "shape.borderRadius", 12),
  background: "#F5F5F5",
  padding: "10px",
}));
