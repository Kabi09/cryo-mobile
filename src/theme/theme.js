import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#1E3A8A', // Deep Navy Brand Color
      light: '#3B82F6',
      dark: '#0F172A',
      contrastText: '#FFFFFF'
    },
    secondary: {
      main: '#1D4ED8', // Royal Blue
      light: '#60A5FA',
      dark: '#1E40AF',
      contrastText: '#FFFFFF'
    },
    success: {
      main: '#16A34A',
      light: '#4ADE80',
      dark: '#15803D',
      contrastText: '#FFFFFF'
    },
    warning: {
      main: '#D97706',
      light: '#FBBF24',
      dark: '#B45309',
      contrastText: '#FFFFFF'
    },
    error: {
      main: '#DC2626',
      light: '#F87171',
      dark: '#B91C1C',
      contrastText: '#FFFFFF'
    },
    info: {
      main: '#2563EB',
      light: '#93C5FD',
      dark: '#1D4ED8',
      contrastText: '#FFFFFF'
    },
    background: {
      default: '#F8FAFC',
      paper: '#FFFFFF'
    },
    text: {
      primary: '#0F172A',
      secondary: '#64748B',
      disabled: '#94A3B8'
    },
    divider: '#E2E8F0'
  },
  typography: {
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    h1: { fontSize: '1.75rem', fontWeight: 700, lineHeight: 1.25 },
    h2: { fontSize: '1.5rem', fontWeight: 700, lineHeight: 1.3 },
    h3: { fontSize: '1.25rem', fontWeight: 600, lineHeight: 1.35 },
    h4: { fontSize: '1.125rem', fontWeight: 600, lineHeight: 1.4 },
    h5: { fontSize: '1rem', fontWeight: 600, lineHeight: 1.45 },
    h6: { fontSize: '0.875rem', fontWeight: 600, lineHeight: 1.5 },
    subtitle1: { fontSize: '0.875rem', fontWeight: 500 },
    subtitle2: { fontSize: '0.8125rem', fontWeight: 500 },
    body1: { fontSize: '0.875rem', lineHeight: 1.5 },
    body2: { fontSize: '0.8125rem', lineHeight: 1.5 },
    button: { textTransform: 'none', fontWeight: 600, fontSize: '0.875rem' },
    caption: { fontSize: '0.75rem', color: '#64748B' }
  },
  shape: {
    borderRadius: 8
  },
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true
      },
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '6px 14px',
          fontWeight: 600
        },
        containedPrimary: {
          backgroundColor: '#1E3A8A',
          '&:hover': {
            backgroundColor: '#1E293B'
          }
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          border: '1px solid #E2E8F0',
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.04)'
        }
      }
    },
    MuiTextField: {
      defaultProps: {
        size: 'small',
        fullWidth: true
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          backgroundColor: '#FFFFFF',
          '& fieldset': {
            borderColor: '#CBD5E1'
          },
          '&:hover fieldset': {
            borderColor: '#94A3B8'
          },
          '&.Mui-focused fieldset': {
            borderColor: '#1D4ED8'
          }
        }
      }
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 6,
          fontWeight: 500,
          fontSize: '0.75rem'
        }
      }
    }
  }
});
