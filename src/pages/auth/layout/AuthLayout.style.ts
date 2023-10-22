import { Button, styled } from "@mui/material";

export const AuthContainer = styled("div")({
  minHeight: "100vh",
  display: "flex",
});

export const LeftBlock = styled("div")(({ theme }) => ({
  minHeight: "100vh",
  display: "none",
  justifyContent: "center",
  alignItems: "center",
  padding: "24px 72px",
  //   background: theme.colorPrimary,
  "@media(min-width: 1200px)": {
    display: "flex",
    width: "50%",
  },
}));

export const StyledImageBlock = styled("div")({
  display: "flex",
  justifyContent: "center",
  marginBottom: "32px",
});

export const StyledImageRightBlock = styled("div")({
  display: "flex",
  justifyContent: "center",
  marginBottom: "32px",
  "@media(min-width: 1200px)": {
    display: "none",
  },
});

export const StyledText = styled("p")(({ theme }) => ({
  textAlign: "center",
  fontFamily: "Mulish",
  fontSize: "28px",
  fontStyle: "normal",
  fontWeight: 500,
  lineHeight: "normal",
  //   color: theme?.colorWhite,
}));

export const RightBlock = styled("div")({
  width: "100%",
  height: "100%",
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "24px",
  boxSizing: "border-box",
  "@media(min-width: 1200px)": {
    width: "50%",
    padding: "0 72px 24px 72px",
  },
});

export const StyledContent = styled("form")({
  width: "100%",
  "@media(min-width: 576px)": {
    width: "380px",
  },
});

export const StyledButton = styled(Button)({
  width: "100%",
  height: "50px",
  marginTop: "20px",
});

export const HandleGoText = styled("p")({});
