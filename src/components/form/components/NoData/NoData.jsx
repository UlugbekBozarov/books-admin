import { memo } from "react";
import { Trans } from "react-i18next";
import { Box, Typography } from "@mui/material";

import { NoRows } from "assets/icons";

const NoData = ({ translationKey = "common.no_data" }) => {
  return (
    <Box paddingY="20px">
      <NoRows />
      <Typography textAlign="center" marginTop="10px">
        <Trans>{translationKey}</Trans>
      </Typography>
    </Box>
  );
};

export default memo(NoData);
