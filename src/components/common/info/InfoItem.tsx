import { FC, memo } from "react";

import { StyledInfoContent } from "./InfoItem.style";
import { Typography } from "@mui/material";
import { Trans } from "react-i18next";

interface InfoItemProps {
  labelKey?: string;
  value?: string;
}

const InfoItem: FC<InfoItemProps> = ({ labelKey, value }) => {
  return (
    <StyledInfoContent>
      <Typography fontSize={13} color="#999999">
        <Trans>{labelKey}</Trans>
      </Typography>
      <Typography fontSize={16} fontWeight={600}>
        {value || "-"}
      </Typography>
    </StyledInfoContent>
  );
};

export default memo(InfoItem);
