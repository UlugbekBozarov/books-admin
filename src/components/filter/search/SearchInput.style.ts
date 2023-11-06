import { TextField, styled } from "@mui/material";

export const StyledTextField = styled(TextField)(({ theme }) => ({
  background:
    theme?.palette?.common[
      theme?.palette?.mode === "light" ? "white" : "black"
    ],
  borderRadius: theme?.shape?.borderRadius,
}));
