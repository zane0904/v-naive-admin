module.exports = {
  plugins: [
    require('cssnano')({
      autoprefixer: {
        overrideBrowserslist: [
          'Android 4.1',
          'iOS 7.1',
          'Chrome > 31',
          'Edge > 16',
          'Firefox > 56',
          'Ios_saf > 11',
          'Opera > 48',
          'Safari > 11',
          'Samsung > 5',
          'ff > 31',
          'ie >= 8',
          'last 10 versions' // 所有主流浏览器最近10版本用
        ],
        grid: true
      }
    }),
    require('postcss-nesting'),
    require('postcss-preset-env'),
    require('autoprefixer')
  ]
}
