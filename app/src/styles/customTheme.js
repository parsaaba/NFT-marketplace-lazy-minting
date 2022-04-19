import { createTheme } from '@mui/material/styles';

const customTheme = createTheme({
  palette: {
    primary: {
      main: '#A2A28F',
    },
    secondary: {
      main: '#99CCCC',
    },
    background: {
      default: '#ffffff',
    },
  },

  components: {
    MuiAppBar: {
      styleOverrides: {
        colorPrimary: {
          backgroundColor: 'white',
          color: 'black',
        },
      },
    },

    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
        colorPrimary: {
          backgroundColor: 'white',
          color: 'black',
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          alignContent: 'center',
          padding: '2px',
        },
        subtitle1: {
          color: '#c5c5c5',
          fontWeight: 500,
          fontSize: '13px',
          lineHeight: '14px',
        },
        subtitle2: {
          color: '#A2A28F',
          fontWeight: 500,
          fontSize: '16px',
          lineHeight: '14px',
        },
        body1: {
          color: '#000000',
          fontWeight: 200,
          fontSize: '12px',
          lineHeight: '14px',
        },
        body2: {
          fontSize: '14px',
          lineHeight: '18px',
          fontWeight: 400,
        },
        span: {
          color: '#636363',
          fontSize: '10px',
          lineHeight: '18px',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        contained: {
          backgroundColor: 'black',
          textTransform: 'none',
          minWidth: '80px',
          color: 'white',
          borderRadius: 0,
          '&:hover': {
            color: 'white',
            backgroundColor: '#A2A28F',
            textDecoration: 'none',
          },
        },
        custom: {
          backgroundColor: '#99CCCC',
          textTransform: 'none',
          minWidth: '80px',
          color: 'white',
          borderRadius: 0,
          '&:hover': {
            color: 'white',
            backgroundColor: '#A2A28F',
            textDecoration: 'none',
          },
        },
        outlined: {
          borderRadius: 0,
          '&:hover': {
            borderColor: 'black',
            textDecoration: 'none',
          },
        },
      },
    },
    MuiImageList: {
      styleOverrides: {
        root: {
          overflowY: '-moz-hidden-unscrollable',
        },
      },
    },
    MuiFilledInput: {
      styleOverrides: {
        root: {
          backgroundColor: 'white',
        },
      },
    },

    MuiInputLabel: {
      styleOverrides: {
        root: {
          '&.Mui-focused': {
            color: 'black',
            textDecoration: 'none',
          },
          // right: 30,
          // transformOrigin: 'top right',
          // transition: 'transform 0.6s cubic-bezier(0.61, 1, 0.88, 1)',
          // transform: 'translate(1px, 9px) scale(0.75)',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 0,
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          paddingLeft: 0,
        },
      },
    },
    MuiImageListItemBar: {
      styleOverrides: {
        titleWrapBelow: {
          display: 'none',
        },
        actionIconActionPosRight: {
          width: '100%',
        },
      },
    },
  },
});

export default customTheme;
