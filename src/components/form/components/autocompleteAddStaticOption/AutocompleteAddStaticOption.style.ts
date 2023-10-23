import { MenuItem, Typography, styled } from "@mui/material";

export const StyledAddMenuItem = styled(MenuItem)(({ theme }) => ({
  position: "sticky",
  bottom: 0,
  justifyContent: "space-between",
  background: "#fff",
  fontWeight: 600,
  color: theme?.palette?.primary?.main,
  paddingTop: "12px",
  paddingBottom: "12px",
  whiteSpace: "initial",
  backgroundColor: "#fafafa",
  "&.Mui-focused": {
    backgroundColor: "#fafafa",
    "&:hover": {
      backgroundColor: "#f3f3f3",
    },
  },
}));

export const StyledSpan = styled(Typography)({
  width: "calc(100% - 90px)",
  overflow: "hidden",
  textOverflow: "ellipsis",
  display: "-webkit-box",
  WebkitLineClamp: 1,
  WebkitBoxOrient: "vertical",
  fontStyle: "italic",
  fontWeight: 400,
  fontSize: "14px",
  color: "#555",
});

export const StyledAdd = styled("span")({
  display: "flex",
  justifyContent: "flex-end",
  width: "90px",
});
