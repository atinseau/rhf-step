import { useFormState } from "../../FormStateContext"
import { useCallback } from "react"

export function useSubmissionHistory() {

  const { submissionHistoryRef, stepIndex, subStepIndex, steps } = useFormState()

  const updateSubmissionHistory = useCallback((data: Record<string, any>) => {
    Object.entries(data).forEach(([key, value]) => {
      submissionHistoryRef.current[key] = {
        value,
        stepIndex,
        subStepIndex,
      }
    })
  }, [
    stepIndex,
    subStepIndex,
    steps
  ])

  const getCurrentSubmission = useCallback((fromKeys: string[]) => {
    const submissionHistory = {
      data: {},
      stepIndex,
      subStepIndex,
      errors: {}
    }

    Object.entries(submissionHistoryRef.current).forEach(([key, data]) => {
      const condition = typeof fromKeys !== 'undefined' && Array.isArray(fromKeys)
        ? fromKeys.includes(key)
        : data.stepIndex === stepIndex && data.subStepIndex === subStepIndex

      if (condition) {
        submissionHistory.data[key] = data.value
        if (data.error) {
          submissionHistory.errors[key] = data.error
        }
      }
    })
    return submissionHistory
  }, [
    stepIndex,
    subStepIndex,
    steps
  ])

  return {
    updateSubmissionHistory,
    getCurrentSubmission
  }

}