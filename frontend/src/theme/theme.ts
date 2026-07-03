import { createTheme, responsiveFontSizes } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#a0d8ef",
    },
    secondary: {
      main: "#5eb954",
    },
    error: {
      main: "#ff0000",
    },
  },
  components: {
    MuiFormControl: {
      styleOverrides: {
        root: {
          "&.Mui-error": {
            "& .MuiInputLabel-root": {
              color: "red",
            },
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "red",
            },
            "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
              {
                borderColor: "red",
              },
            "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "red",
            },
            "& .MuiInputBase-input": {
              color: "red",
            },
            "& .MuiFormLabel-asterisk": {
              color: "red",
            },
          },
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        asterisk: {
          color: "red",
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: "#666",
          "&.Mui-focused": {
            color: "#666",
          },
          "&.Mui-error": {
            color: "red",
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          backgroundColor: "transparent",
          "&:hover": {
            backgroundColor: "transparent",
          },
          "&.Mui-focused": {
            backgroundColor: "transparent",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#ccc",
          },
          "&.Mui-error .MuiOutlinedInput-notchedOutline": {
            borderColor: "red",
          },
          "& input:-webkit-autofill": {
            WebkitBoxShadow: "0 0 0 100px transparent inset",
            WebkitTextFillColor: "inherit",
            transition: "background-color 9999s ease-out 0s",
          },
        },
      },
    },
  },
  typography: {
    h1: {
      fontSize: "5rem",
    },
  },
});
export default responsiveFontSizes(theme);
