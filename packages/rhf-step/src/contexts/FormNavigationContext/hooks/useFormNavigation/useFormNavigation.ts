import { useCallback } from "react"
import { useFormProps } from "../../../FormPropsContext"
import { useFormDebug } from "../../../FormDebugContext/hooks/useFormDebug"
import { useFormState } from "../../../FormStateContext"
import { useFormNavigationContext } from "../useFormNavigationContext"
import { OnStepChangeHandler } from "../../../../types"


export function useFormNavigation() {

  const {
    beforeNextStep,
    beforePreviousStep,
    beforeStepChange,
    onNextStep,
    onLastStep,
    onPreviousStep,
    onPreviousFirstStep
  } = useFormProps()

  const { push } = useFormNavigationContext()
  const { warn } = useFormDebug('useFormNavigation')

  const {
    stepIndex: currentStepIndex,
    subStepIndex: currentSubStepIndex,
    setStepIndex: setCurrentStepIndex,
    setSubStepIndex: setCurrentSubStepIndex,
    steps,
  } = useFormState()

  const to = useCallback(async (stepIndex: number, subStepIndex: number, callback?: OnStepChangeHandler) => {

    if (typeof stepIndex === 'undefined' && typeof subStepIndex === 'undefined') {
      warn('Cannot go to undefined step')
      return false
    }

    const abort = await beforeStepChange?.(currentStepIndex, currentSubStepIndex)
    if (typeof abort === 'boolean' && abort) {
      warn('Could not go to step, because beforeStepChange returned true')
      return false
    }

    if (stepIndex !== currentStepIndex) {
      setCurrentStepIndex(stepIndex)
      setCurrentSubStepIndex(subStepIndex || 0)
    }

    if (subStepIndex !== currentSubStepIndex) {
      setCurrentSubStepIndex(subStepIndex)
    }

    if (callback) {
      push({
        stepIndex,
        subStepIndex,
        callback
      })
    }

    return true
  }, [
    currentStepIndex,
    currentSubStepIndex,
    beforeStepChange
  ])

  // This function is exported but it's not a good practice to use it
  // because it will skip every validation mecanism from rhf
  const next = useCallback(async () => {

    let stepIndex: number | undefined
    let subStepIndex: number | undefined

    const abort = await beforeNextStep?.(currentStepIndex, currentSubStepIndex)

    if (typeof abort === 'boolean' && abort) {
      warn('Could not go to next step, because beforeNextStep returned true')
      return false
    }

    // Intra step navigation
    if (currentSubStepIndex < steps[currentStepIndex].components?.length - 1) {
      stepIndex = currentStepIndex
      subStepIndex = currentSubStepIndex + 1
    }

    // Step navigation
    if (
      steps[currentStepIndex + 1] // next step exists
      && steps[currentStepIndex + 1].components.length > 0 // available components on next step
      && currentSubStepIndex === steps[currentStepIndex].components.length - 1
      && currentStepIndex < steps.length - 1
    ) {
      stepIndex = currentStepIndex + 1
      subStepIndex = 0 // reset subStepIndex when changing step
    }

    if (typeof stepIndex === 'undefined' && typeof subStepIndex === 'undefined') {

      // this is the only "on" function that is called synchronously
      // the other functions will be pushed in the queue and executed
      // on the next render when stepIndex and subStepIndex are updated
      if (onLastStep) {
        onLastStep(currentStepIndex, currentSubStepIndex)
        return true
      }
      warn('Cannot go to next step because we are on the last step')
      return false
    }
    return to(stepIndex, subStepIndex, onNextStep)
  }, [
    steps,
    currentStepIndex,
    currentSubStepIndex,
    onNextStep,
    beforeNextStep
  ])

  const back = useCallback(async () => {

    let stepIndex: number
    let subStepIndex: number

    const abort = await beforePreviousStep?.(currentStepIndex, currentSubStepIndex)

    if (typeof abort === 'boolean' && abort) {
      warn('Could not go to previous step, because beforePreviousStep returned true')
      return false
    }


    if (currentSubStepIndex > 0) {
      stepIndex = currentStepIndex // stay on the same step
      subStepIndex = currentSubStepIndex - 1 // go back
    }

    if (currentStepIndex > 0 && currentSubStepIndex === 0) {
      stepIndex = currentStepIndex - 1 // go back
      subStepIndex = steps[stepIndex].components?.length - 1 // go to end of subStep
    }

    if (typeof stepIndex === 'undefined' && typeof subStepIndex === 'undefined') {

      if (onPreviousFirstStep) {
        onPreviousFirstStep(currentStepIndex, currentSubStepIndex)
        return true
      }

      warn('Cannot go to previous step because we are on the first step')
      return false
    }

    return to(stepIndex, subStepIndex, onPreviousStep)
  }, [
    steps,
    currentStepIndex,
    currentSubStepIndex,
    beforePreviousStep
  ])

  return {
    next,
    back,
    to
  }

}