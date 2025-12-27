export default {
  extends: ["@commitlint/config-conventional"],
  rules: {
    // enforce kebab-case scopes, e.g. feat(api-auth): ...
    "scope-case": [2, "always", "kebab-case"],
    // enforce lower-case types, e.g. feat, fix, chore
    "type-case": [2, "always", "lower-case"],
    // allow only conventional commit types
    "type-enum": [
      2,
      "always",
      [
        "build",
        "chore",
        "ci",
        "docs",
        "feat",
        "fix",
        "perf",
        "refactor",
        "revert",
        "style",
        "test",
      ],
    ],
    "header-max-length": [2, "always", 500],
    "body-max-line-length": [2, "always", 500],
  },
};
