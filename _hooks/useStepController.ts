import { useCallback, useState } from "react"
import { FormStep } from "../contexts/FormProvider"

type UseStepControllerOptions = {
  stepIndex?: number
  subStepIndex?: number
  steps?: FormStep[]
  defaultValues?: any
}

export function useStepController(options: UseStepControllerOptions = {}) {

  const [steps, setSteps] = useState<FormStep[]>(options.steps || [])
  const [stepIndex, setStepIndex] = useState<number>(options.stepIndex || 0)
  const [subStepIndex, setSubStepIndex] = useState<number>(options.subStepIndex || 0)
  const [defaultValues, setDefaultValues] = useState<any>(options.defaultValues || {})

  const update = useCallback((options: {
    stepIndex?: number
    subStepIndex?: number
    steps?: FormStep[],
    defaultValues?: any
  }) => {
    typeof options.stepIndex !== 'undefined' && setStepIndex(options.stepIndex)
    typeof options.subStepIndex !== 'undefined' && setSubStepIndex(options.subStepIndex)
    typeof options.steps !== 'undefined' && options.steps && setSteps(options.steps)
    typeof options.defaultValues !== 'undefined' && setDefaultValues(options.defaultValues || {})
  }, [])

  return {
    ctx: {
      steps,
      initialStepIndex: stepIndex,
      initialSubStepIndex: subStepIndex,
      defaultValues
    },
    update
  }
}