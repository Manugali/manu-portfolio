import nextVitals from "eslint-config-next/core-web-vitals";

export default [
  ...nextVitals,
  {
    ignores: [".next/**", "dist/**", "coverage/**", "node_modules/**"],
  },
];
