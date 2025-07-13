const plugin = require('tailwindcss/plugin')

const classRules = plugin(function({ addUtilities }) {
  addUtilities ({
    ".my-rotate-y-180": {
      transform: "rotateY(180deg)"
    }

  })
})

module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [classRules],
}
