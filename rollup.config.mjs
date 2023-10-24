import { defineConfig } from 'rollup';
import json from '@rollup/plugin-json';
import commonjs from '@rollup/plugin-commonjs';
import nodeResolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import { dts } from 'rollup-plugin-dts';
import terser from '@rollup/plugin-terser';
import filesize from 'rollup-plugin-filesize';

// Package
const packageJson = require('./package.json');

// Dist
const outputDir = 'dist';

/**
 * To review the configuration of this file, as well as add or delete properties,
 * consult the following link.
 *
 * @see https://rollupjs.org/introduction/
 */
const config = defineConfig([
  {
    input: 'src/index.ts',
    output: [
      // Browser / Nodejs - UMD
      {
        file: packageJson.main,
        format: 'umd',
        sourcemap: true,
        name: 'localStorageToBbject'
      }
    ],
    plugins: [
      json(),
      // If commonjs() is used, babel should go below this function
      commonjs(),
      nodeResolve({ extensions: ['.ts'] }),
      typescript({ tsconfig: './tsconfig.json' }),
      terser(),
      filesize()
    ]
  },
  {
    input: `${outputDir}/types/index.d.ts`,
    output: [{ file: packageJson.types, format: 'es' }],
    plugins: [dts()]
  }
]);

export default config;
