import { createTheme } from "@mui/material";

const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontSize: "0.875rem",
          borderRadius: 8.5,
          textTransform: "none",
          "&.MuiButton-contained": {
            backgroundColor: "#009be5",
            "&:hover": {
              backgroundColor: "#006db3",
            },
          },
          "&.MuiButton-outlined": {
            color: "#fff",
            borderColor: "rgba(255, 255, 255, 0.7)",
            "&:hover": {
              backgroundColor: "rgba(0, 0, 0, 0.04)",
            },
          },
        },
      },
    },
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          fontSize: "1.7rem",
        },
      },
    },
  },
  palette: {
    white: {
      main: "#fff",
    },
  },
  typography: {
    fontFamily: "Merriweather",
    fontSize: 14,
    h1: {
      fontSize: "1.6rem",
      fontWeight: 600,
      color: "#fff",
      letterSpacing: "0.5px",
      textTransform: "capitalize",
    },
    h6: {
      fontSize: "1.2rem",
    },
    body2: {
      fontSize: "1rem",
    },
  },
});
export default theme;
