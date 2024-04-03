module.exports = {
  "**/*.ts?(x)": (filenames) =>
    filenames.length > 5
      ? "eslint --ext .ts,.tsx . --ignore-path .gitignore --fix ."
      : `eslint ${filenames.join(" ")} --fix`,
  "*.json": ["prettier --write"],
};
