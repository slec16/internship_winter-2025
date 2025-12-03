import { createTheme } from '@mui/material/styles'

export const getMuiTheme = (mode: 'light' | 'dark') => {
  return createTheme({
    palette: {
      mode,
      primary: {
        main: '#0099F7',
      },
      secondary: {
        main: '#64748b',
      },
      background: {
        default: mode === 'light' ? '#ffffff' : '#0f172a',
        paper: mode === 'light' ? '#ffffff' : '#0f172a',
      },
    },
    typography: {
      fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            borderRadius: '8px',
          },
        },
      },
    },
  })
}