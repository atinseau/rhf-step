import { useEffect, useState } from "react";
import { useFormContext } from "./useFormContext";


export function useActiveStep() {
  const { steps, stepIndex, subStepIndex, goBack, getForm } = useFormContext();
  const [asNextButton, setAsNextButton] = useState(true);

  const activeStep = steps[stepIndex];
  if (!activeStep) {
    throw new Error('No active step found in context')
  }

  useEffect(() => {
    const form = getForm(stepIndex, subStepIndex)
    if (!form.formRef.current) {
      setAsNextButton(false)
      return
    }
    setAsNextButton(true)
  }, [
    stepIndex,
    subStepIndex
  ])

  return {
    asPreviousButton: ((activeStep.prev?.scoped && subStepIndex > 0) || activeStep.prev?.global) && (activeStep.prev?.allowed ? activeStep?.prev?.allowed?.includes(subStepIndex) : true),
    asNextButton,
    goBack
  }
}