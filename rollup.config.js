import { eslint } from 'rollup-plugin-eslint'
import typescript from 'rollup-plugin-typescript2'
import {terser} from 'rollup-plugin-terser'

const packageName = 'flanim'
const isProd = process.env.NODE_ENV === 'production'
const isMinify = process.env.MINIFY === 'true'
let outputFile = ''

if (isProd) {
  if (isMinify) {
    outputFile = `dist/${packageName}.min.js`
  } else {
    outputFile = `dist/${packageName}.js`
  }
} else {
  outputFile = `docs/js/${packageName}.js`
}

export default {
  input: `./src/${packageName}.ts`,
  output: {
    name: packageName,
    file: outputFile,
    format: 'umd'
  },
  plugins: [
    eslint(),
    typescript(),
    isMinify && terser()
  ]
}
