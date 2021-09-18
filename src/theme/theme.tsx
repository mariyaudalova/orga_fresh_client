import { createTheme } from "@material-ui/core/styles";

// Create a theme instance.
export const theme = createTheme({
  palette: {
    primary: {
      main: "#357a38",
    },
    secondary: {
      main: "#ff9800",
    },
  },
  typography: {
    fontFamily: "Roboto",
  },
  shape: {
    borderRadius: 4,
  },
  spacing: 8,
  overrides: {
    MuiFilledInput: {
      root: {
        backgroundColor: "#357a38",
      },
    },
    MuiFormHelperText: {
      root: {
        color: "red",
      },
    },
    MuiTextField: {
      root: {},
    },
    MuiButton: {
      root: {
        textTransform: "none",
        padding: "20px",
      },
      fullWidth: {
        maxWidth: "300px",
      },
    },
    MuiSlider: {
      root: {
        width: "50%",
      },
    },
    MuiPaper: {
      rounded: {
        borderRadius: "10px",
      },
    },
    MuiSelect: {
      root: {
        width: "160px",
      },
    },
  },
  props: {
    MuiButton: {
      disableRipple: true,
      variant: "contained",
      color: "primary",
    },
    MuiCheckbox: {
      disableRipple: true,
    },
    MuiTextField: {
      InputLabelProps: {
        shrink: true,
      },
    },
    MuiPaper: {
      elevation: 12,
    },
    MuiCard: {
      elevation: 12,
    },
  },
});
