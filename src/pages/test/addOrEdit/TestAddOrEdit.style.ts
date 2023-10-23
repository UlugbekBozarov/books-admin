import { Card, IconButton, styled } from "@mui/material";

export const TestContent = styled("div")({
  marginTop: "30px",
  "&:hover .test-edit-icon": {
    opacity: 1,
  },
});

export const StyledEditButton = styled(IconButton)(({ theme }) => ({
  position: "absolute",
  top: "10px",
  right: "10px",
  width: "34px",
  height: "34px",
  borderRadius: theme?.shape?.borderRadius,
  background: theme?.palette?.primary?.main,
  "& svg path": {
    stroke: theme?.palette?.mode === "light" ? "#fff" : "#000",
  },
  opacity: 0,
}));

export const VariantCard = styled(Card, {
  shouldForwardProp: (prop) => prop !== "isActive",
})<{ isActive?: boolean }>(({ theme, isActive }) => ({
  display: "flex",
  padding: "12px",
  cursor: "pointer",
  border: isActive ? `1px solid ${theme?.palette?.primary?.main}` : "none",
  backgroundColor: isActive ? theme?.palette?.primary?.main : undefined,
  color: isActive
    ? theme?.palette?.mode === "light"
      ? "#fff"
      : "#000"
    : undefined,
}));
