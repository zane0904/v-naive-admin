import viteCompression from 'vite-plugin-compression'

export const compression = () => {
  return viteCompression({
    verbose: true, //是否在控制台输出压缩结果
    disable: false, //是否禁用,相当于开关在这里
    threshold: 10240, //体积大于 threshold 才会被压缩,单位 b，1b=8B, 1B=1024KB  那我们这里相当于 9kb多吧，就会压缩
    algorithm: 'gzip', //压缩算法,可选 [ 'gzip' , 'brotliCompress' ,'deflate' , 'deflateRaw']
    ext: '.gz', //文件后缀
    filter: () => true
  })
}
