import type { FormRefs, FormStep, StepMemory, UseFormReturn } from "../../types";
import React, { createContext } from "react";

export type IFormStateContext = {
  steps: FormStep[]
  stepIndex: number
  subStepIndex: number
  prevIndexesRef: React.MutableRefObject<{ stepIndex: number, subStepIndex: number }>
  formRefs: React.MutableRefObject<FormRefs>
  stepMemoryRef: React.MutableRefObject<StepMemory>
  setSteps: (steps: FormStep[]) => void
  setStepIndex: (stepIndex: number) => void
  setSubStepIndex: (subStepIndex: number) => void
  getForm: (si: number, ssi: number) =>  UseFormReturn<any> | null
}

// The formStateContext is used to share every internal state of the form between every hooks or components
// accross steps, it's mean that every step can access to the form state like the submission history, other steps,
// current step index, etc...
// formState is only consumed inside the library (not for external use, to risky)
export const FormStateContext = createContext({} as IFormStateContext)
