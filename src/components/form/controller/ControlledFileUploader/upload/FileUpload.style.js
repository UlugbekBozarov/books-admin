import { styled } from "@mui/material";

export const StyledFileUploadContainer = styled("div")(({ theme }) => ({
  position: "relative",
  width: "100%",
  height: "56px",
}));

export const StyledInputBlock = styled("div")({
  position: "absolute",
  top: 0,
  right: 0,
  width: "100%",
  height: "100%",
  zIndex: 1,
});

export const StyledInput = styled("input")(({ theme }) => ({
  width: "100%",
  height: "100%",
  opacity: 0,
  boxSizing: "border-box",
  borderRadius: theme?.shape?.borderRadius,
}));

export const StyledContent = styled("div")({
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  height: "56px",
  boxSizing: "border-box",
  padding: "16.5px 14px",
  zIndex: 0,
});

export const StyledContentBlock = styled("div")({
  width: "100%",
  height: "100%",
  display: "flex",
  alignItems: "center",
  "& svg": {
    maxHeight: "100%",
    marginRight: "10px",
  },
});
