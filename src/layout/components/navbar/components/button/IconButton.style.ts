import { IconButton, styled } from "@mui/material";

export const StyledIconButton = styled(IconButton, {
  shouldForwardProp: (prop) => prop !== "iconColorField",
})<{ iconColorField?: "fill" | "stroke" }>(
  ({ theme, iconColorField = "fill" }) => ({
    width: "40px",
    height: "40px",
    borderRadius: `${theme?.shape?.borderRadius}px`,
    border: `1px solid`,
    borderColor: "#DAE2ED",
    "&:hover": {
      borderColor: "#C7D0DD",
    },
    "& svg path": {
      [iconColorField]: theme?.palette?.mode === "light" ? "#000" : "#fff",
    },
  })
);
