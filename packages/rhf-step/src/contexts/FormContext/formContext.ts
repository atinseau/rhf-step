import type { FormSubscribe, FormUnsubscribe, SubmitCallback } from "../../types"
import { createContext } from "react"

export type IFormContext = {
  subscribe: FormSubscribe
  unsubscribe: FormUnsubscribe
  onSubmit: () => void
  onSubmitCallback: SubmitCallback
  updateStepMemory: (data: Record<string, any>) => void
  Component: React.ComponentType
}

export const FormContext = createContext({} as IFormContext)
