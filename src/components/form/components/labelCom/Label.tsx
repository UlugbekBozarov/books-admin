import { FC, ReactNode } from "react";
import { Trans } from "react-i18next";
import { FormLabel } from "@mui/material";

interface LabelProps {
  htmlFor?: string;
  required?: boolean;
  children?: ReactNode;
  disabled?: boolean;
}

const Label: FC<LabelProps> = ({
  htmlFor,
  required,
  children,
  disabled,
  ...props
}) => {
  return children ? (
    <FormLabel
      required={!!required || false}
      htmlFor={htmlFor}
      disabled={disabled}
      sx={{ cursor: "pointer" }}
      {...props}
    >
      <Trans>{children}</Trans>
    </FormLabel>
  ) : (
    <></>
  );
};

export default Label;
