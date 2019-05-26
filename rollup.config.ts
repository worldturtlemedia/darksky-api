import commonjs from 'rollup-plugin-commonjs'
import json from 'rollup-plugin-json'
import resolve from 'rollup-plugin-node-resolve'
import sourceMaps from 'rollup-plugin-sourcemaps'
import typescript from 'rollup-plugin-typescript2'

const pkg = require('./package.json')

const nodePlugins = [
  json(),
  typescript({ useTsconfigDeclarationDir: true }),
  commonjs(),
  resolve(),
  sourceMaps()
]

const commonConfig = {
  input: `src/index.ts`,
  external: [],
  watch: {
    include: 'src/**'
  }
}

const nodeConfig = {
  ...commonConfig,
  output: [
    { file: pkg.module, format: 'es', sourcemap: true },
    { file: pkg.main, format: 'cjs', sourcemap: true }
  ],
  plugins: nodePlugins,
  external: ['os', 'http', 'https', 'url', 'assert', 'stream', 'tty', 'util', 'zlib']
}

export default [nodeConfig]
