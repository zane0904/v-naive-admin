<script lang="tsx">
import { themeStore } from '@stores/modules/theme'
// import publicIcon from '@/assets/images/public.png'
export default defineComponent({
  name: 'LayoutFooter',
  setup() {
    const store = themeStore()
    return () =>
      store.showFooter ? (
        <NLayoutFooter
          class={[`h-${store.footerHeight}px flex items-center justify-center`]}
          style={{
            color: '#8590a6'
          }}
        >
          <a class={'pr-[20px]'}>联系我们</a>
          <span class={'pr-[20px] cursor-pointer'}>© 2023-Present &nbsp;&nbsp; mmxxn.cn</span>
          {/* <div>
            <img src={publicIcon} alt="" srcset="" />
            <a target="_blank" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=2021005460">京公网安备 11010802020088 号</a>
          </div> */}
          <a target="_blank" href="https://beian.miit.gov.cn/">
            豫 ICP 备 2021005460 号 - 1
          </a>
        </NLayoutFooter>
      ) : (
        <div></div>
      )
  }
})
</script>
<style lang="less" scoped>
a {
  color: inherit;
  cursor: pointer;
}
a:hover {
  color: #175199;
  text-decoration: none;
}
a:active {
  color: #175199;
  text-decoration: none;
}
</style>
