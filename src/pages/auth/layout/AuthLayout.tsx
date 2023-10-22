import { FC, ReactNode } from "react";
import { Link } from "react-router-dom";

import {
  AuthContainer,
  HandleGoText,
  LeftBlock,
  RightBlock,
  StyledButton,
  StyledContent,
  StyledImageBlock,
  StyledImageRightBlock,
  StyledText,
} from "./AuthLayout.style";
import { Box, Typography } from "@mui/material";
import { Trans } from "react-i18next";

interface IAuthLayout {
  title?: string;
  description?: string;
  submitText?: string;
  children?: ReactNode;
  onSubmit?: any;
  go?: {
    text?: string;
    linkText: string;
    link: string;
  };
}

const AuthLayout: FC<IAuthLayout> = ({
  title,
  description,
  submitText,
  onSubmit,
  children,
  go,
}) => {
  return (
    <AuthContainer>
      <LeftBlock>
        <div>
          <StyledImageBlock>{/* <Logo size={320} /> */}Logo</StyledImageBlock>
          <StyledText>{description}</StyledText>
        </div>
      </LeftBlock>
      <RightBlock>
        <StyledContent onSubmit={onSubmit}>
          <StyledImageRightBlock>
            Logo
            {/* <Logo size={80} /> */}
          </StyledImageRightBlock>
          <Typography textAlign="center">{title}</Typography>
          <div>{children}</div>
          {submitText && (
            <StyledButton type="submit" variant="contained">
              <Trans>{submitText}</Trans>
            </StyledButton>
          )}
          {go && (
            <Box mt={20}>
              <HandleGoText>
                {go?.text}
                <Link to={go?.link || "/"} style={{ marginLeft: "5px" }}>
                  {go?.linkText}
                </Link>
              </HandleGoText>
            </Box>
          )}
        </StyledContent>
      </RightBlock>
    </AuthContainer>
  );
};

export default AuthLayout;
