import { useCallback, useEffect, useRef } from "react"
import type { SubmitCallback } from "../../../types"
import { useFormProps } from "../../FormPropsContext"
import { useFormNavigation } from "../../FormNavigationContext"
import { useFormState } from "../../FormStateContext"

// INTERNAL AUTORESET WATCHER

function useAutoResetRef() {
  const { autoReset } = useFormProps()

  const autoResetRef = useRef<boolean>(autoReset ?? false)

  useEffect(() => {
    autoResetRef.current = autoReset
  }, [autoReset])

  return autoResetRef
}

// This hook is used to expose the submit function that will be triggered
// when the form is submitted
// also there is two mecanism to submitting the form (externally and internally)
// TODO: explain better the two mecanism
export function useFormSubmit() {

  const { onError, afterLastStep } = useFormProps()
  const { to } = useFormNavigation()

  const {
    getForm,
    stepIndex,
    subStepIndex,
    steps,
    afterSubmitHandlerRef,
    mergedValuesRef,
    watchedValuesRef,
    submissionHistoryRef
  } = useFormState()

  const autoResetRef = useAutoResetRef()

  const onSubmitCallback: SubmitCallback = useCallback(async ({ result, data }) => {
    if (result instanceof Error) {
      if (!onError) {
        console.error('[FormProvider] An error occurred during the form submission: ', result)
        return
      }
      onError?.(result)
      return
    }
    if (!result) {
      console.warn('[FormProvider] Form submission was cancelled: ', result)
      return
    }

    const keepValues = typeof steps[stepIndex].keepValues === 'undefined'
      ? true
      : steps[stepIndex].keepValues

    mergedValuesRef.current = {
      ...mergedValuesRef.current,
      ...data
    }

    if (subStepIndex < steps[stepIndex].components.length - 1) {
      to({
        si: stepIndex,
        ssi: subStepIndex + 1
      })
      return
    }

    if (stepIndex < steps.length - 1) {
      if (!keepValues) {
        submissionHistoryRef.current = {}
        watchedValuesRef.current = {}
        mergedValuesRef.current = {}
      }

      // TODO: for scoped values, we need clear the form values of the last step
      to({
        si: stepIndex + 1,
        ssi: 0,
      })
      return
    }

    afterLastStep?.()

    if (typeof autoResetRef.current === 'undefined' || autoResetRef.current) {
      const form = getForm(stepIndex, subStepIndex)
      if (form) {
        form.reset()
      }
    }

    mergedValuesRef.current = {}
    watchedValuesRef.current = {}
    submissionHistoryRef.current = {}

  }, [
    stepIndex,
    subStepIndex,
    steps
  ])

  const onSubmit = useCallback(async () => {
    const { formRef } = getForm(stepIndex, subStepIndex) || {}

    if (!formRef?.current) {
      console.error('[FormProvider] Form ref is not defined cannot submit form')
      return
    }

    formRef.current?.dispatchEvent(new CustomEvent('submit', {
      cancelable: true,
      bubbles: true,
      detail: {
        external: true
      }
    }))

    function afterSubmitHandler(e: CustomEvent) {
      onSubmitCallback(e.detail)
    }

    if (afterSubmitHandlerRef.current) {
      formRef?.current?.removeEventListener('afterSubmit', afterSubmitHandlerRef.current)
    }

    afterSubmitHandlerRef.current = afterSubmitHandler
    formRef.current?.addEventListener('afterSubmit', afterSubmitHandler, {
      once: true
    })
  }, [
    stepIndex,
    subStepIndex,
    steps
  ])

  return {
    onSubmit,
    onSubmitCallback
  }
}