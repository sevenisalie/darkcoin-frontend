/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          'terminal-black': '#0a0a0a',
          'terminal-dark': '#1D1F21',
          'terminal-green': '#00ff00',
          'terminal-bright-green': '#39ff14',
          'terminal-dim-green': '#25a244',
          'terminal-glow': '#4eff4e',
        },
        fontFamily: {
          'terminal': ['VT323', 'monospace'],
          'pixel': ['Press Start 2P', 'cursive'],
        },
        animation: {
          'terminal-blink': 'blink 1s step-end infinite',
          'glitch': 'glitch 1s linear infinite',
          'scan': 'scan 2s linear infinite',
        },
        keyframes: {
          blink: {
            '0%, 100%': { opacity: '1' },
            '50%': { opacity: '0' },
          },
          glitch: {
            '0%, 100%': { transform: 'translate(0)' },
            '20%': { transform: 'translate(-5px, 5px)' },
            '40%': { transform: 'translate(-5px, -5px)' },
            '60%': { transform: 'translate(5px, 5px)' },
            '80%': { transform: 'translate(5px, -5px)' },
          },
          scan: {
            '0%': { top: '0%' },
            '100%': { top: '100%' },
          }
        },
        boxShadow: {
          'terminal': '0 0 10px #39ff14, 0 0 20px #39ff14, 0 0 30px #39ff14',
          'terminal-sm': '0 0 5px #39ff14, 0 0 10px #39ff14',
        },
      },
    },
    plugins: [],
  }