import { forwardRef } from "react";
import { Typography } from "@mui/material";

import {
  StyledContent,
  StyledContentBlock,
  StyledFileUploadContainer,
  StyledInput,
  StyledInputBlock,
} from "./FileUpload.style";
import File from "./FileIcon";

const FileUploader = forwardRef(({ ...props }, ref) => {
  let values = props?.value?.split("\\");

  return (
    <StyledFileUploadContainer>
      <StyledInputBlock>
        <StyledInput
          className="Custom-file-upload-input"
          ref={ref}
          {...props}
        />
      </StyledInputBlock>
      <StyledContent>
        <StyledContentBlock>
          <File />
          <Typography>
            {values[values?.length - 1] || "No file choose"}
          </Typography>
        </StyledContentBlock>
      </StyledContent>
    </StyledFileUploadContainer>
  );
});

export default FileUploader;
