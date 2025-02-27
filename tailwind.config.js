/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  important: true,
  theme: {
    extend: {
      colors: {
        primaryRed: "#DC3644",
        black1: "#FEFEFE",
        black2: "#F2F2F2",
        black3: "#E8E8E8",
        black4: "#979797",
        black5: "#707070",
        black6: "#525252",
        black7: "#2A2A2A",
        black8: "#202020",
        black9: "#1A1A1A",
        black10: "#000000"
      },
      fontFamily: {
        sans: [
          'Pretendard',
          'ui-sans-serif',
          'system-ui'
        ],
        impact: [
          'Paperlogy-7Bold'
        ],
      },
      fontSize: {
        highlight: [
          '40px',
          {
            linHeight: 'auto',
            fontWeight: 700
          }
        ],
        banner: [
          '32px',
          {
            linHeight: 'auto',
            fontWeight: 400
          }
        ],
        title: [
          '32px',
          {
            linHeight: 'auto',
            fontWeight: 600
          }
        ],
        'sub-title': [
          '20px',
          {
            linHeight: 'auto',
            fontWeight: 500
          }
        ],
        body1: [
          '15px',
          {
            linHeight: 'auto',
            fontWeight: 400
          }
        ],
        body2: [
          '13px',
          {
            linHeight: 'auto',
            fontWeight: 400
          }
        ]
      },
      borderRadius: {
        none: '0',
        sm: 'calc(var(--radius) - 4px)',
        DEFAULT: '8px',
        lg: 'var(--radius)',
        xl: '16px',
        full: '9999px',
        md: 'calc(var(--radius) - 2px)'
      },
    },
  },
  plugins: [],
}

