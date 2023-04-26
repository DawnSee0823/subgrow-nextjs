import React from "react"
import { RootStateOrAny, useSelector } from "react-redux"
import { ConfigProvider } from "components/ui"
import useDarkMode from "utils/hooks/useDarkMode"
import { themeConfig } from "configs/theme.config"
import { createTheme, responsiveFontSizes, ThemeProvider } from "@mui/material/styles"
// import { blue, green, purple } from "@mui/material/colors"
import { blue, green, purple, red } from "configs/colors/default"

// <ThemeProvider theme={theme}>
// needed for typescript
declare module "@mui/material/Button" {
  interface ButtonPropsVariantOverrides {
    fbbutton: true
    igbutton: true
    twbutton: true
    ttbutton: true
    modern: true
    fancy: true
    animated: true
    outlined: true
    gbutton: true
    addlink: true
  }
}

declare module "@mui/material/styles" {
  interface TypographyVariants {
    poster: React.CSSProperties
    radiolabel: React.CSSProperties
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    poster?: React.CSSProperties
    radiolabel?: React.CSSProperties
  }
}

// Update the Typography's variant prop options
declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    poster: true
    radiolabel: true
  }
}
// TypeError: Cannot read properties of undefined (reading 'muiName')
declare module "@mui/material/Input" {
  interface InputPropsVariantOverrides {
    signup: true
  }

  interface StandardTextFieldProps {
    signup: true
  }
}

const Theme = (props) => {
  // const theme = useSelector((state: RootStateOrAny) => state.theme)

  const theme = useSelector((state: RootStateOrAny) => state.theme)

  const locale = useSelector((state: RootStateOrAny) => state.locale.currentLang)

  // border: `2px dashed grey${blue[500]}`,
  let mytheme = createTheme({
    palette: {
      //mode: isDark,
      primary: {
        light: "#ffffff",
        main: "#3f50b5",
        dark: "#002884",
        contrastText: "#fff",
      },
      secondary: {
        light: "#ff7961",
        main: "#f44336",
        dark: "#ba000d",
        contrastText: "#000",
      },
    },
    typography: {
      fontSize: 14,
      // fontFamily: ["Roboto", '"Helvetica Neue"'].join(","),
      fontFamily: ["Poppins", "sans-serif"].join(","),
      subtitle1: {
        fontSize: 10,
      },
      h1: {
        fontSize: 24,
        fontWeight: 700,
        paddingBottom: 15,
      },
      h2: {
        fontSize: 20,
        fontWeight: 600,
        paddingBottom: 15,
      },
      h3: {
        fontSize: 25,
        fontWeight: 600,
        paddingBottom: 15,
      },
      h4: {
        fontSize: 14,
        fontWeight: 500,
        paddingBottom: 15,
      },
      h5: {
        fontSize: 18,
        fontWeight: 600,
        paddingBottom: 15,
      },
      h6: {
        fontSize: 14,
        fontWeight: 300,
        paddingBottom: 15,
      },
      body1: {
        fontWeight: 500,
        fontSize: 12,
      },
      body2: {
        fontWeight: 500,
        fontSize: 10,
        // color: "#ffffff" // being overridden
      },
      caption: {
        fontWeight: 500,
        fontSize: 10,
        // color: "#ffffff" // being overridden
      },
      poster: {
        fontSize: "4rem",
        color: "red",
      },
      radiolabel: {
        fontSize: 12,
      },
    },
    components: {
      MuiTypography: {
        defaultProps: {
          variantMapping: {
            // Map the new variant to render a <h1> by default
            poster: "h3",
          },
        },
      },
      MuiButton: {
        // styleOverrides: {
        //   root: ({ theme }) => ({
        //     // use JavaScript conditional expression
        //     color: theme.palette.mode === "dark" ? themeConfig.colors.dark.addcolor : themeConfig.colors.light.addcolor,
        //   }),
        // },
        variants: [
          {
            props: { variant: "fbbutton" },
            style: {
              // backgroundColor: "#2374F2",
              backgroundColor: "#e9efef",
              color: "#4267B2",
              // border: `2px dashed grey${blue[500]}`,
              // border: `2px dashed grey${blue[500]}`,
              "&:hover": {
                // backgroundColor: "#3c52b2",
                backgroundColor: "#4267B2",
                color: "#dee3f8",
              },
            },
          },
          {
            props: { variant: "twbutton" },
            style: {
              backgroundColor: "#e9efef",
              color: "#1D9BF0",
              // border: `2px dashed grey${blue[500]}`,
              "&:hover": {
                backgroundColor: "#1D9BF0",
                color: "#dee3f8",
              },
            },
          },
          {
            props: { variant: "igbutton" },
            style: {
              // backgroundColor: "#E1306C",
              backgroundColor: "#e9efef",
              color: "#E1306C",
              // border: `2px dashed grey${blue[500]}`,
              "&:hover": {
                backgroundColor: "#C13584",
                color: "#dee3f8",
              },
            },
          },
          {
            props: { variant: "ttbutton" },
            style: {
              // backgroundColor: "#2374F2",
              backgroundColor: "#e9efef",
              color: "#00F2EA",
              // border: `2px dashed grey${blue[500]}`,
              "&:hover": {
                backgroundColor: "#00F2EA",
                color: "#dee3f8",
              },
            },
          },
          {
            props: { variant: "gbutton" },
            style: {
              // backgroundColor: "#2374F2",
              // backgroundColor: "#CF4232",
              backgroundColor: "#e9efef",
              color: "#CF4232",
              // border: `2px dashed grey${blue[500]}`,
              "&:hover": {
                backgroundColor: "#CF4232",
                color: "#f8dede",
              },
            },
          },
          {
            props: { variant: "addlink" },
            style: {
              // backgroundColor: "#2374F2",
              // backgroundColor: theme.mode === "dark" ? themeConfig.colors.dark.addbgcolor : themeConfig.colors.light.addbgcolor,
              backgroundColor: theme.mode === "dark" ? red[500] : red[700],
              color: theme.mode === "dark" ? blue[100] : purple[100],
              // border: `2px dashed grey${blue[500]}`,
              "&:hover": {
                backgroundColor: theme.mode === "dark" ? blue[700] : purple[700],
                color: theme.mode === "dark" ? blue[100] : purple[100],
              },
            },
          },
        ],
      },
      MuiTextField: {
        variants: [
          // TODO: cannot get custom variants to work for text fields
          // {
          //   props: { variant: "signup", color: "primary" },
          //   style: {
          //     background: `linear-gradient(45deg, ${blue[700]} 35%, ${blue[300]} 90%)`,
          //     color: "#fff",
          //   },
          // },
        ],
        styleOverrides: {
          root: {
            // this is styles for the new variants
            ".urlbox": {
              width: 100,
              height: 20,
            },
          },
        },
      },
      MuiInput: {
        variants: [
          // {
          //   props: { variant: "signup", color: "primary" },
          //   style: {
          //     background: `linear-gradient(45deg, ${blue[700]} 35%, ${blue[300]} 90%)`,
          //     color: "#fff",
          //   },
          // },
          // TODO: cannot get custom variants to work for text fields
          // {
          //   props: { variant: "outlined", color: "primary" },
          //   style: {
          //     background: `linear-gradient(45deg, ${blue[700]} 35%, ${blue[300]} 90%)`,
          //     color: "#fff",
          //   },
          // },
        ],
        // styleOverrides: {
        //   root: {
        //     // this is styles for the new variants
        //     "&.subvariant-hovered": {
        //       "& fieldset": {
        //         border: "none"
        //       },
        //       "& .MuiInputBase-input:hover + fieldset": {
        //         border: `2px solid blue`
        //       },
        //       "& .MuiInputBase-input:focus + fieldset": {
        //         border: `2px solid blue`
        //       }
        //     }
        //   }
        // }
      },
    },
  })

  // breakpoints

  const currentTheme = {
    ...themeConfig,
    ...theme,
    ...{ locale },
  }

  return (
    <ConfigProvider value={currentTheme}>
      {" "}
      <ThemeProvider theme={mytheme}>{props.children}</ThemeProvider>
    </ConfigProvider>
  )
}

export default Theme
