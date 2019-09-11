import { eslint } from 'rollup-plugin-eslint'
import typescript from 'rollup-plugin-typescript2'
import {terser} from 'rollup-plugin-terser'

const packageName = 'flama'
const isMinify = process.env.MINIFY === 'true'
let outputFile = ''

if (isMinify) {
  outputFile = `dist/${packageName}.min.js`
} else {
  outputFile = `dist/${packageName}.js`
}

export default {
  input: `src/${packageName}.ts`,
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
