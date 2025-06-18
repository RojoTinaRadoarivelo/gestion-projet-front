// lint-staged.config.js
module.exports = {
  "src/**/*.{ts,html}": ["prettier --write", "eslint --fix"],
  "src/**/*.{scss,css}": ["prettier --write"], 
};