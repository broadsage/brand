/**
 * Broadsage Tailwind CSS Theme Extension
 * Usage in tailwind.config.js:
 * const broadsageTheme = require('./tokens/tailwind.config.js');
 * module.exports = { ...broadsageTheme };
 */

module.exports = {
  theme: {
    extend: {
      colors: {
        broadsage: {
          navy: {
            950: '#050814',
            900: '#0A1128',
            800: '#101B3B',
            700: '#1E293B',
            600: '#334155',
          },
          gold: {
            300: '#FCD34D',
            400: '#FBBF24',
            500: '#F59E0B',
            600: '#D97706',
            700: '#B45309',
          },
          azure: {
            400: '#38BDF8',
            500: '#0284C7',
            600: '#0369A1',
          },
        },
      },
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          'sans-serif',
        ],
        mono: [
          'ui-monospace',
          'SFMono-Regular',
          '"SF Mono"',
          'Menlo',
          'Consolas',
          'monospace',
        ],
      },
      letterSpacing: {
        wordmark: '-0.025em',
        subwordmark: '0.125em',
      },
    },
  },
};

