import { useContext } from "react";
import { ThemeProvider, createTheme } from "@mui/material";

import Routes from "routes/Routes";
// import { darkTheme, lightTheme } from "theme";
import { AppContext } from "context";

function App() {
  const {
    state: { mode },
  } = useContext<any>(AppContext);

  // const theme = useMemo(() => {
  //   switch (mode) {
  //     case "dark":
  //       return darkTheme;
  //     default:
  //       return lightTheme;
  //   }
  // }, [mode]);

  return (
    <ThemeProvider
      theme={createTheme({
        palette: {
          mode,
          background: {
            default: mode === "light" ? "#f5f5f5" : "#101418",
          },
        },
        shape: { borderRadius: 12 },
        components: {
          MuiAutocomplete: {
            styleOverrides: {
              root: {
                height: "43px",
              },
              inputRoot: {
                height: "43px",
                paddingTop: 0,
                paddingBottom: 0,
              },
              input: {
                height: "43px",
                minHeight: "43px",
                boxSizing: "border-box",
              },
            },
          },
          MuiFormLabel: {
            styleOverrides: {
              root: {
                display: "inherit",
                fontSize: "14px",
                lineHeight: "inherit",
                color: "#313649",
                marginBottom: "0.5rem",
                "& .MuiFormLabel-asterisk": {
                  color: "rgb(252, 7, 7)",
                },
              },
            },
          },
          MuiAppBar: {
            styleOverrides: {
              root: {
                height: "76px",
                padding: "16px 10px 4px",
                backgroundImage: "none",
                backgroundColor: "transparent",
                boxShadow: "none",
                "& .MuiToolbar-root": {
                  height: "56px",
                  minHeight: "56px",
                  background: mode === "light" ? "#fff" : "#121212",
                  border: "1px solid",

                  borderColor:
                    mode === "light" ? "#E5EAF2" : "rgba(255, 255, 255, 0.12)",
                  borderRadius: "12px",
                },
                "@media(min-width: 900px)": {
                  padding: "16px 20px 4px",
                },
              },
            },
          },
          MuiCard: {
            styleOverrides: {
              root: {
                boxShadow: "none",
              },
            },
          },
          MuiTableCell: {
            styleOverrides: {
              root: {
                "&.MuiTableCell-head": {
                  fontWeight: 600,
                },
              },
            },
          },
          MuiTextField: {
            styleOverrides: {
              root: {
                "& .MuiFormLabel-root": {
                  transform: "translate(14px, 14px) scale(1)",
                  "&.MuiInputLabel-shrink": {
                    transform: "translate(14px, -9px) scale(0.75)",
                  },
                },
                "& .MuiInputBase-input": {
                  height: "43px",
                  padding: "0 14px",
                },
              },
            },
          },
        },
      })}
    >
      <Routes />
    </ThemeProvider>
  );
}

export default App;
