import { viteMockServe } from 'vite-plugin-mock'
export const mock = (isEnabledMock: boolean) => {
  return viteMockServe({
    ignore: /^_/,
    mockPath: 'mock',
    enable: isEnabledMock,
    logger: true //是否在控制台显示请求日志
  })
}
