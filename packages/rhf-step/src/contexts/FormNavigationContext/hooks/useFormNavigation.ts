import { useCallback } from "react"
import { useFormState } from "../../FormStateContext"
import { useFormProps } from "../../FormPropsContext"

export function useFormNavigation() {

  const { onPreviousStep, onFirstStepBack, beforeStepChange } = useFormProps()
  const { subStepIndex, steps, stepIndex, setSubStepIndex, setStepIndex } = useFormState()

  const next = useCallback(async () => {
    if (subStepIndex < steps[stepIndex].components.length - 1) {
      setSubStepIndex(subStepIndex + 1)
      return
    }

    if (stepIndex < steps.length - 1) {
      setStepIndex(stepIndex + 1)
      setSubStepIndex(0)
      return
    }
    console.warn('Cannot go next because we are on the last step')
  }, [
    stepIndex,
    subStepIndex,
    steps
  ])

  const back = useCallback(async () => {
    if (subStepIndex > 0) {
      await onPreviousStep?.(stepIndex, subStepIndex)
      setSubStepIndex(subStepIndex - 1)
      return
    }

    if (stepIndex > 0) {
      await onPreviousStep?.(stepIndex, subStepIndex)
      setStepIndex(stepIndex - 1)
      setSubStepIndex(steps[stepIndex - 1].components.length - 1)
      return
    }

    if (onFirstStepBack) {
      onFirstStepBack()
      return
    }

    console.warn('Cannot go back because we are on the first step')
  }, [
    stepIndex,
    subStepIndex,
    steps,
    onFirstStepBack,
    onPreviousStep
  ])

  const to = useCallback(async (stepConfig: { si: number, ssi?: number }) => {
    const { si, ssi } = stepConfig

    if (si === stepIndex && ssi === subStepIndex) {
      return
    }

    if (typeof beforeStepChange === 'function') {
      const beforeStepChangeResult = await beforeStepChange(si, ssi)
      if (beforeStepChangeResult === false) {
        console.warn('beforeStepChange returned false, cannot change step')
        return
      }
    }

    setStepIndex(si)
    if (typeof ssi !== 'undefined') {
      setSubStepIndex(ssi)
    }
  }, [
    beforeStepChange,
    stepIndex,
    subStepIndex,
    steps
  ])

  return {
    next,
    back,
    to
  }

}