import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs}"],
    plugins: { js },
    extends: ["js/recommended"],
    languageOptions: {
      globals: {
        ...globals.node,   // 👈 allow Node.js globals like process, __dirname
        ...globals.es2021  // 👈 optional, for modern JS globals
      }
    }
  },
]);
