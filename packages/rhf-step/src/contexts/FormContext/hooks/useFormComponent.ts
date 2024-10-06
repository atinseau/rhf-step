import { useFormState } from "../../FormStateContext"
import { useMemo } from "react"

// This hook is used to get the current component of the form
// depending on the current step and substep
export function useFormComponent() {

  const { steps, stepIndex, subStepIndex } = useFormState()

  const Component = useMemo(() => {
    const step = steps[stepIndex]
    const component = step.components[subStepIndex]

    return component
  }, [
    steps,
    stepIndex,
    subStepIndex,
  ])

  return Component
}