import { useCallback } from "react"
import type { FormSubscribe } from "../../../types"
import { useFormState } from "../../FormStateContext"


export function useFormSubscription() {

  const { formRefs } = useFormState()

  const subscribe: FormSubscribe = useCallback((si, ssi, form, formRef, formPropsRef, formStepContext) => {
    formRefs.current[si] = {
      ...formRefs.current[si],
      [ssi]: {
        ...form,
        formRef,
        formPropsRef,
        formStepContext,
      }
    }
  }, [])

  // Unused for now
  const unsubscribe = useCallback((si: number, ssi: number) => {
    console.log(formRefs.current[si][ssi])
  }, [])

  return {
    subscribe,
    unsubscribe
  }
}