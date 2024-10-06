import type { FormRefs, FormStep, SubmissionHistory } from "../../types";
import { createContext } from "react";

export type IFormStateContext = {
  steps: FormStep[]
  stepIndex: number
  subStepIndex: number
  afterSubmitHandlerRef: React.MutableRefObject<EventListener>
  submissionHistoryRef: React.MutableRefObject<SubmissionHistory>
  mergedValuesRef: React.MutableRefObject<Record<string, any>>
  watchedValuesRef: React.MutableRefObject<Record<string, any>>
  formRefs: React.MutableRefObject<FormRefs>
  setSteps: (steps: FormStep[]) => void
  setStepIndex: (stepIndex: number) => void
  setSubStepIndex: (subStepIndex: number) => void
  getForm: (si: number, ssi: number) => FormRefs[number][number]
}

// The formStateContext is used to share every internal state of the form between every hooks or components
// accross steps, it's mean that every step can access to the form state like the submission history, other steps,
// current step index, etc...
// formState is only consumed inside the library (not for external use, to risky)
export const FormStateContext = createContext({} as IFormStateContext)
