import { getCurrentInstance } from 'vue'
import type { IFormProps } from './config/type'

export const useForm = function (_props: IFormProps) {
  if (!getCurrentInstance()) {
    throw new Error('useForm() can only be used inside setup() or functional components!')
  }
}
export default useForm
