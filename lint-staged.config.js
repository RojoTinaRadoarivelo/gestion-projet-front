// lint-staged.config.js
module.exports = {
  "src/**/*.{ts,html,scss,css}": [
    "prettier --write",
    "eslint --fix"
  ]
};