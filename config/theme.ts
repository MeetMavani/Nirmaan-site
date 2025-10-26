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
    logo: '/assets/NirmaanLogo-BgRemoved.png',
    tagline: 'Building Tomorrow\'s Software Today',
    email: 'nirmaan.devv@gmail.com',
    phone: '+91 9850015522',
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
