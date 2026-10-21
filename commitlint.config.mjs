export default {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-enum": [
      2,
      "always",
      [
        "feat",
        "fix",
        "refactor",
        "perf",
        "chore",
        "test",
        "docs",
        "style",
        "ci",
        "revert",
      ],
    ],
    "subject-case": [0],
  },
};
