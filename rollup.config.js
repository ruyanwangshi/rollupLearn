import { terser } from 'rollup-plugin-terser'
import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import typescriptplugin from '@rollup/plugin-typescript'

console.log(process.env.NODE_ENV);

export default {
  input: 'src/index.ts',
  output: {
    file: 'dist/bundle.js',
    name: 'piniaPlugin',
    format: 'umd',
  },
  plugins: [
    typescriptplugin({ tsconfig: './tsconfig.json' }),
    babel({
      exclude: 'node_modules/**', // 防止打包node_modules下的文件
      runtimeHelpers: true, // 使plugin-transform-runtime生效
    }),
    terser(),
    commonjs(),
  ],
}
