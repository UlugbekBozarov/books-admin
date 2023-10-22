import { styled } from "@mui/material";

export const StyledContainer = styled("div")(({ width, height, size }) => ({
  position: "relative",
  width:
    width ||
    (size === "small" ? "80px" : size === "medium" ? "100px" : "120px"),
  height:
    height ||
    (size === "small" ? "80px" : size === "medium" ? "100px" : "120px"),
}));

export const UploadImageBlock = styled("div")({
  position: "absolute",
  top: "0",
  right: "0",
  width: "100%",
  height: "100%",
  zIndex: "99999",
});

export const StyledInput = styled("input")({
  width: "100% !important",
  height: "100% !important",
  opacity: 0,
  boxSizing: "border-box !important",
});

export const StyledImageBlock = styled("div")({
  position: "absolute",
  top: "0",
  right: "0",
  width: "100% !important",
  height: "100% !important",
  display: "flex !important",
  justifyContent: "center",
  alignItems: "center",
  zIndex: "1",
  boxSizing: "border-box !important",
});
