import { FC } from "react";
import { Trans } from "react-i18next";
import { FieldError } from "react-hook-form";
import { Box, Typography } from "@mui/material";

import { StyledError } from "./Error.style";
import InfoIcon from "./InfoIcon";

interface ErrorProps {
  error?: FieldError | undefined;
}

const Error: FC<ErrorProps> = ({ error }) => {
  return error ? (
    <StyledError>
      <Box marginRight="7px">
        <InfoIcon />
      </Box>
      <Typography fontSize="13px" color="error" marginLeft="10px">
        {error?.message || <Trans>errors.invalid_value</Trans>}
      </Typography>
    </StyledError>
  ) : (
    <></>
  );
};

export default Error;
