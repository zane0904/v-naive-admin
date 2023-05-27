import visualizer from 'rollup-plugin-visualizer'

export const buildVisualizer: any = () => {
  return visualizer({
    open: true,
    gzipSize: true,
    brotliSize: true
  })
}
