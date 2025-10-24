// Centralized theme configuration - Easy to modify
export const themeConfig = {
  // Color Scheme
  colors: {
    primary: {
      light: '#E8F5E9',
      main: '#4CAF50',
      dark: '#1B5E20',
      accent: '#81C784'
    },
    text: {
      primary: '#1B5E20',
      secondary: '#2E7D32',
      light: '#66BB6A'
    }
  },

  // Typography
  fonts: {
    primary: 'Inter, system-ui, sans-serif',
    heading: 'Inter, system-ui, sans-serif',
  },

  // Company Info
  company: {
    name: 'Nirmaan',
    tagline: 'Building Tomorrow\'s Software Today',
    email: 'hello@nirmaan.dev',
    phone: '+1 (555) 123-4567',
    social: {
      linkedin: 'https://linkedin.com/company/nirmaan',
      github: 'https://github.com/nirmaan',
      twitter: 'https://twitter.com/nirmaan'
    }
  },

  // Animation Settings
  animations: {
    duration: {
      fast: 0.2,
      normal: 0.4,
      slow: 0.6
    },
    ease: 'cubic-bezier(0.4, 0, 0.2, 1)'
  }
};
