<script lang="tsx">
export default defineComponent({
  name: 'Icon',
  props: {
    prefix: {
      type: String,
      default: 'naive-icon'
    },
    name: {
      type: String,
      required: true
    },
    color: {
      type: String,
      default: ''
    },
    size: {
      type: Number,
      default: 16
    }
  },
  setup(props) {
    const symbolId = computed(() => `#${props.prefix}-${props.name}`)
    return () => (
      <svg aria-hidden="true" class={[`icon text-[${props.size}px]`]}>
        <use xlinkHref={symbolId.value} fill={props.color} />
      </svg>
    )
  }
})
</script>
