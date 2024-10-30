import { useCallback } from "react"
import { FormSubscribe, FormUnsubscribe } from "../../../types"
import { useFormState } from "../../FormStateContext"


export function useFormSubscription() {

  const { formRefs } = useFormState()

  const subscribe: FormSubscribe = useCallback((si, ssi, form) => {
    formRefs.current[si] = {
      ...formRefs.current[si],
      [ssi]: form
    }
  }, [])

  // Unused for now
  const unsubscribe: FormUnsubscribe = useCallback((/*si: number, ssi: number*/) => {
    // implement unsubscribe
  }, [])

  return {
    subscribe,
    unsubscribe
  }
}