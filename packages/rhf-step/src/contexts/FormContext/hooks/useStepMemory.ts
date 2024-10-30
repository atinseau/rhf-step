import { useCallback } from "react";
import { useFormState } from "../../FormStateContext";



export function useStepMemory() {

  const { stepMemoryRef, stepIndex, subStepIndex } = useFormState()

  const updateStepMemory = useCallback((data: Record<string, any>) => {
    if (!stepMemoryRef.current[stepIndex]) {
      stepMemoryRef.current[stepIndex] = {}
    }
    stepMemoryRef.current[stepIndex][subStepIndex] = data
  }, [])

  return {
    updateStepMemory
  }

}