import { useCallback, useRef, useState } from "react";
import { FormStateContext } from "./formStateContext";
import { useFormProps } from "../FormPropsContext/hooks/useFormProps";
import type { FormRefs, FormStep, SubmissionHistory } from "../../types";

// Initialize the formStateContext
// Declare every internal state and pass it to the formStateContext
// to be accessible by calling the useFormState hook
// Explanation of the internal state:
// TODO: explain every internal state
export function FormStateProvider(props: { children?: React.ReactNode }) {

  const {
    steps: rawExternalSteps,
    initialStepIndex = 0,
    initialSubStepIndex = 0,
    defaultValues,
  } = useFormProps()

  const externalSteps = Array.isArray(rawExternalSteps)
    ? rawExternalSteps
    : [{ components: [rawExternalSteps] }]

  const [steps, setSteps] = useState<FormStep[]>(externalSteps)
  const [stepIndex, setStepIndex] = useState(initialStepIndex)
  const [subStepIndex, setSubStepIndex] = useState(initialSubStepIndex)

  const formRefs = useRef<FormRefs>({})
  const submissionHistoryRef = useRef<SubmissionHistory>({})
  const mergedValuesRef = useRef<Record<string, any>>(defaultValues || {})
  const watchedValuesRef = useRef<Record<string, any>>({})
  const afterSubmitHandlerRef = useRef<EventListener>()

  const getForm = useCallback((si: number, ssi: number) => {
    return formRefs.current?.[si]?.[ssi]
  }, [])

  // TODO: improve this behavior
  // It's here to sync new steps when from inside step is similar and need to stay at the same step
  // useLayoutEffect(() => {
  //   let newStepIndex = stepIndex
  //   let newSubStepIndex = subStepIndex

  //   if (newStepIndex >= externalSteps.length) {
  //     newStepIndex = externalSteps.length - 1
  //   }
  //   if (newSubStepIndex >= externalSteps[newStepIndex].components.length) {
  //     newSubStepIndex = 0
  //   }

  //   setStepIndex(newStepIndex)
  //   setSubStepIndex(newSubStepIndex)
  //   setSteps(externalSteps)
  // }, [rawExternalSteps])

  return <FormStateContext.Provider value={{
    stepIndex,
    subStepIndex,
    afterSubmitHandlerRef,
    submissionHistoryRef,
    mergedValuesRef,
    watchedValuesRef,
    formRefs,
    steps,
    setSteps,
    setStepIndex,
    setSubStepIndex,
    getForm,
  }}>
    {props.children}
  </FormStateContext.Provider>
}