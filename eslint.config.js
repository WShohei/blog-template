import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
    baseDirectory: __dirname,
});

const config = [
    js.configs.recommended,
    ...compat.extends(
        'next/core-web-vitals'
    ),
    {
        ignores: ['node_modules/**', '.next/**', 'dist/**'],
    }
];

export default config; 