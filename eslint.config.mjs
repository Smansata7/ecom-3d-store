import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
      // Payload generates these files; don't lint framework boilerplate.
      "src/app/(payload)/**",
      "src/payload-types.ts",
    ],
  },
  {
    rules: {
      // Copy uses plenty of apostrophes; escaping them hurts readability.
      "react/no-unescaped-entities": "off",
    },
  },
];

export default eslintConfig;
