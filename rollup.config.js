import prodConfig from './rollup.config.prod'
import devConfig from './rollup.config.dev'

const isProd = process.env.NODE_ENV === 'production'
let config = ''

if (isProd) {
  config = prodConfig
} else {
  config = devConfig
}

export default config
