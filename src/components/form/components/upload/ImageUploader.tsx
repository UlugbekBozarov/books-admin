import { forwardRef } from "react";
import { CircularProgress } from "@mui/material";

import { Image } from "assets/icons";
import { ImageSize } from "types";

import {
  StyledContainer,
  StyledImageBlock,
  StyledInput,
  UploadImageBlock,
} from "./ImageUploader.style";

interface ImageUploaderProps {
  size?: ImageSize;
  loading?: boolean | undefined;
  value?: string | undefined;
  accept?: string;
  className?: string;
}

const ImageUploader = forwardRef(
  ({ size, loading, value = "", ...props }: ImageUploaderProps, ref: any) => {
    return (
      <StyledContainer size={size}>
        <UploadImageBlock>
          <StyledInput ref={ref} {...props} value={value} />
        </UploadImageBlock>
        <StyledImageBlock>
          {loading ? <CircularProgress /> : <Image />}
        </StyledImageBlock>
      </StyledContainer>
    );
  }
);

export default ImageUploader;
