import { forwardRef } from "react";
import { CircularProgress } from "@mui/material";

import {
  StyledContainer,
  StyledImageBlock,
  StyledInput,
  UploadImageBlock,
} from "./ImageUploader.style";
import Image from "./Image";

const ImageUploader = forwardRef(
  ({ width, height, size, loading, value = "", ...props }, ref) => {
    return (
      <StyledContainer width={width} height={height} size={size}>
        <UploadImageBlock>
          <StyledInput ref={ref} {...props} value={value} />
        </UploadImageBlock>
        <StyledImageBlock className={props?.className}>
          {loading ? <CircularProgress /> : <Image />}
        </StyledImageBlock>
      </StyledContainer>
    );
  }
);

export default ImageUploader;
