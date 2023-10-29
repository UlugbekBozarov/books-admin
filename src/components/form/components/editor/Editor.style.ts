import { styled } from "@mui/material";

export const EditorContainer = styled("div")({
  "& .sun-editor": {
    minHeight: "300px",
    borderRadius: "12px",
    "& .se-toolbar": {
      borderRadius: "12px 12px 0 0",
    },
    "& .se-btn-module": {
      borderRadius: "8px",
      "& button": {
        borderRadius: "6.5px",
      },
    },
    "& .se-wrapper .se-wrapper-inner": {
      minHeight: "250px",
    },
    "& .se-resizing-bar": {
      minHeight: "36px",
      borderRadius: "0 0 12px 12px",
      padding: "10px 12px",
    },
  },
});
