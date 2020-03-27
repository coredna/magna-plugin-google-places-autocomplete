import babel from 'rollup-plugin-babel'
import cleanup from 'rollup-plugin-cleanup'
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';

const extensions = ['.js']
const version = process.env.VERSION || require('./package.json').version
const dependencies = process.env.VERSION || require('./package.json').dependencies
const banner =
  `/**
 * Magna Plugin: Google Places Autocomplete v${version} (https://github.com/coredna/magna)
 * Copywrite ${new Date().getFullYear()} Andrew Fountain
 * Released under the MIT license 
 */`
export default {
  input: 'src/index.js',
  output: [
    {
      file: 'dist/magna-plugin-google-places-autocomplete.umd.js',
      format: 'iife',
      name: 'GooglePlacesAutocomplete',
      sourcemap: true,
      exports: 'named',
      banner,
    },
    {
      file: 'dist/magna-plugin-google-places-autocomplete.umd.min.js',
      format: 'iife',
      name: 'GooglePlacesAutocomplete',
      exports: 'named',
      banner,
      plugins: [
        terser()
      ]
    },
    {
      file: 'dist/magna-plugin-google-places-autocomplete.common.js',
      format: 'cjs',
      exports: 'named',
      sourcemap: true,
      banner,
    },
    {
      file: 'dist/magna-plugin-google-places-autocomplete.esm.js',
      format: 'es',
      exports: 'named',
      sourcemap: true,
      banner,
    },
  ],
  external: Object.keys(dependencies),
  plugins: [
    resolve({
      extensions,
      preferBuiltIns: true,
    }),
    cleanup(),
    babel({
      extensions,
      exclude: ['node_modules/**']
    }),
    commonjs(),
  ]
};
