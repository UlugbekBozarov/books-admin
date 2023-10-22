import { FC } from "react";
import { IconButtonProps } from "@mui/material";

import { StyledIconButton } from "./IconButton.style";

const IconButton: FC<
  IconButtonProps & { iconColorField?: "fill" | "stroke" }
> = (props) => {
  return <StyledIconButton {...props} />;
};

export default IconButton;
