<script lang="tsx">
import { InputNumProps } from './props/props'

export default defineComponent({
  name: 'PageInputNum',
  props: InputNumProps,
  emits: ['update:model'],
  setup(props, { emit }) {
    return () => (
      <NFormItem label={props.name} label-align={'left'} label-placement={'left'}>
        <div class={'w-full flex flex-row-reverse'}>
          <NInputNumber
            style={{ width: '110px' }}
            step="10"
            placeholder={``}
            defaultValue={props.model}
            onUpdateValue={v => emit('update:model', v)}
            v-slots={{
              suffix: () => props.suffix
            }}
            max={props.max}
            min={props.min}
          />
        </div>
      </NFormItem>
    )
  }
})
</script>
