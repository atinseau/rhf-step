import type { CurrentSubmission, FormSubscribe, SubmitCallback } from "../../types"
import { createContext } from "react"

export type IFormContext = {
  getCurrentSubmission: (fromKeys?: string[]) => CurrentSubmission
  updateSubmissionHistory: (data: Record<string, any>) => void
  subscribe: FormSubscribe
  onSubmit: () => void
  onSubmitCallback: SubmitCallback
  Component: React.ComponentType
}

export const FormContext = createContext({} as IFormContext)
