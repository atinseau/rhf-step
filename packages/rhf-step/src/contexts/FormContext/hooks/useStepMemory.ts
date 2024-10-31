import { useCallback, useRef } from "react";
import { useFormState } from "../../FormStateContext";
import { useFormProps } from "../../FormPropsContext";
import { FormStep, StepMemory } from "../../../types";

function parseLocalMemory(steps: FormStep[], localMemory: Record<string, any>) {
  const memory = {}
  for (const [key, step] of Object.entries(localMemory)) {
    const stepIndex = parseInt(key)
    if (steps[stepIndex].peristent) {
      memory[stepIndex] = step
    }
  }
  return memory
}

function syncLocalStorage(steps: FormStep[], name: string, stepMemory: StepMemory) {
  const memory = parseLocalMemory(steps, stepMemory) // Parse the memory from localStorage to remove the steps that are not peristent
  if (Object.keys(memory).length === 0) {
    localStorage.removeItem(name) // Remove the memory if it's empty
  } else {
    localStorage.setItem(name, JSON.stringify(memory)) // Save the memory to localStorage
  }
  return memory
}

export function useStepMemory() {

  const { stepMemoryRef, stepIndex, subStepIndex, steps } = useFormState()
  const { name } = useFormProps()
  const isMountedRef = useRef(false)

  const updateStepMemory = useCallback((data: Record<string, any>) => {
    if (!stepMemoryRef.current[stepIndex]) {
      stepMemoryRef.current[stepIndex] = {}
    }
    stepMemoryRef.current[stepIndex][subStepIndex] = data

    // No need to go further if the step is not peristent
    if (!steps[stepIndex].peristent) {
      return
    }
    syncLocalStorage(steps, name ?? 'form', stepMemoryRef.current)
  }, [
    name,
    steps,
    stepIndex,
    subStepIndex
  ])

  if (!isMountedRef.current) {
    if (typeof window !== 'undefined') {
      const formMemory = localStorage.getItem(name ?? 'form')
      if (formMemory) {
        stepMemoryRef.current = syncLocalStorage(steps, name ?? 'form', JSON.parse(formMemory))
      }
    }
    isMountedRef.current = true
  }

  return {
    updateStepMemory
  }
}