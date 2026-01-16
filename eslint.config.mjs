import { defineConfig, globalIgnores } from 'eslint/config'
import nextVitals from 'eslint-config-next/core-web-vitals'
import nextTs from 'eslint-config-next/typescript'

export default defineConfig([
  ...nextVitals,
  ...nextTs,

  // deine Overrides
  {
    rules: {
      // In TS-Projekten besser die TS-Regel nutzen:
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'warn',

      'prefer-const': 'warn',
      'no-trailing-spaces': 'warn',
      'object-curly-spacing': ['warn', 'always'],
    },
  },

  // Ignored files (wie in den Next Docs)
  globalIgnores([
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
    'node_modules/**',
  ]),
])
