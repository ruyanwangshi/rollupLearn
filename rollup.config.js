import { terser } from 'rollup-plugin-terser'
import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import typescriptplugin from '@rollup/plugin-typescript'
import postcss from 'rollup-plugin-postcss'

console.log(process.env.NODE_ENV);

export default {
  input: 'src/index.ts',
  output: {
    file: 'lib/bundle.js',
    name: 'piniaPlugin',
    format: 'umd',
  },
  plugins: [
    postcss(), // 对样式进行转化
    typescriptplugin({ tsconfig: './tsconfig.json' }),
    babel({
      exclude: 'node_modules/**', // 防止打包node_modules下的文件
      runtimeHelpers: true, // 使plugin-transform-runtime生效
    }),
    terser(), // 打包压缩插件
    commonjs(), // 使用commonjs引入
  ],
  external:[  //外部库， 使用'umd'文件时需要先引入这个外部库
    'vue'
  ]
}
