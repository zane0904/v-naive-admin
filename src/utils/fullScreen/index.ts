// import { themeStore } from '@stores/theme'
import { themeStore } from '@stores/modules/theme'
import screenfull from 'screenfull'

// 获取是否全屏状态
export const getFullScreen = () => {
  const theme = themeStore()
  theme.isFullScreen = screenfull.isFullscreen
}
/**
 * 全屏
 **/
export const openFullScreen = () => {
  if (!screenfull.isEnabled) {
    // createErrorMsg({ title: "错误", content: "浏览器不支持全屏" });
  } else {
    screenfull.toggle()
    screenfull.on('change', () => {
      getFullScreen()
    })
  }
}
