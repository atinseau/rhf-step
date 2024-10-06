import {
  useForm as RHFuseForm,
  UseFormProps as RHFUseFormProps,
  FieldValues,
} from "react-hook-form"

import { useCallback, useEffect, useMemo, useRef } from "react"
import { atom, useSetAtom } from 'jotai'
import { SubmitHandler, UseFormOptions, UseFormReturn } from "../../types"
import { useFormContext } from "../../contexts/FormContext"
import { useFormState } from "../../contexts/FormStateContext"
import { useFormProps } from "../../contexts/FormPropsContext"
import { getDefaultValues } from "./utils"

export function useForm<
  TFieldValues extends FieldValues = FieldValues,
  TContext = any
>(props?: UseFormOptions<TFieldValues, TContext>): UseFormReturn<TFieldValues> {

  const { getCurrentSubmission, updateSubmissionHistory, onSubmitCallback, subscribe } = useFormContext()
  const {
    watchedValuesRef,
    // submissionHistoryRef,
    mergedValuesRef,
    stepIndex,
    subStepIndex,
    steps,
    // setStepIndex,
    // setSubStepIndex
  } = useFormState()
  const { defaultValues } = useFormProps()

  const initialDefaultValues = getDefaultValues(
    getCurrentSubmission().data,
    watchedValuesRef.current,
    props?.defaultValues,
    defaultValues
  )

  // const isMountedRef = useRef(false)

  const formPropsRef = useRef<RHFUseFormProps<TFieldValues, TContext>>({
    mode: Object.keys(getCurrentSubmission()?.errors || {}).length > 0 ? 'onChange' : 'onSubmit',
    reValidateMode: 'onChange',
    ...props,
    // override defaultValues with the current submission data (if any)
    defaultValues: initialDefaultValues,
  })

  // Before inject formPropsRef into useForm, sync the defaultValues with the formPropsRef
  // in case the defaultValues is changed externally or there is a rerender of the component
  // due to react strict mode or any other reason
  // formPropsRef.current.defaultValues = initialDefaultValues

  const form = RHFuseForm(formPropsRef.current)
  const formRef = useRef<HTMLFormElement>(null)

  const isSubmittingAtom = useMemo(() => atom(false), [])
  const isValidAtom = useMemo(() => atom(false), [])

  const setSubmitting = useSetAtom(isSubmittingAtom)
  // const setIsValid = useSetAtom(isValidAtom)

  // TODO: check if it's still needed
  // useLayoutEffect(() => {
  //   if (props?.defaultAsDirty) {
  //     for (const key in initialDefaultValues) {
  //       form.control._formState.dirtyFields[key] = true
  //     }
  //   }
  // }, [])


  // useEffect(() => {
  //   if (!isMountedRef.current) {
  //     isMountedRef.current = true
  //     return
  //   }

  //   if (props?.withInitialValidation) {
  //     validate()
  //   }

  //   const currentSubmission = getCurrentSubmission(Object.keys(form.control._fields))

  //   // Restoring errors from submission history (when we come back to a non current step)
  //   if (currentSubmission && currentSubmission?.errors && Object.keys(currentSubmission?.errors || {}).length > 0) {
  //     setErrors(currentSubmission.errors, true)
  //   }
  // }, [])

  useEffect(() => {
    const { unsubscribe } = form.watch((values) => {
      for (const key in values) {
        watchedValuesRef.current[key] = values[key]
      }
    })
    return () => {
      unsubscribe()
    }
  }, [])


  // If there are errors on mount, set initial validity to false
  // and delete the errors from the current submission
  // because they are only rendered on mount after we don't want them anymore
  // const validate = useCallback((values?: Record<string, any>) => {
  //   const allowedKeys = Object.keys(form.control._fields)
  //   const filteredErrors = Object.entries(submissionHistoryRef.current).reduce((acc, [key, data]) => {
  //     if (!data.error || !allowedKeys.includes(key)) {
  //       return acc
  //     }
  //     acc[key] = data.error
  //     return acc
  //   }, {})

  //   // update the initial default values with the latest submission data
  //   // to compare the errored fields with the new values gived by the trigger method
  //   const comparedValues = {
  //     ...initialDefaultValues,
  //     ...getCurrentSubmission().data
  //   }

  //   for (const key in values) {
  //     if (comparedValues[key] !== values[key] && filteredErrors?.[key]) {
  //       delete filteredErrors[key]
  //       delete submissionHistoryRef.current[key].error
  //     }
  //   }

  //   if (Object.keys(filteredErrors).length > 0) {
  //     setIsValid(false)
  //     return
  //   }
  //   form.trigger().then(setIsValid)
  // }, [])

  const handleSubmit = useCallback((onSubmit?: SubmitHandler<TFieldValues>) => {
    return form.handleSubmit(async (data, event) => {

      // We add the current step to the submission history
      // This is useful to restore errors when we come back to a non current step
      // Even if the form is not submitted, we want to keep the data
      updateSubmissionHistory(data)

      const isExternalSubmission: boolean = (event?.nativeEvent as CustomEvent)?.detail?.external || false
      let result: boolean | Error | null = null

      setSubmitting(true)
      try {
        // onSubmit is optional, if not provided, we just submit the form
        if (onSubmit) {
          result = await onSubmit(data, mergedValuesRef.current, event)
          // result = true
        } else {
          result = true // if there is no submit handler, we just submit the form
        }
      } catch (error) {
        result = error
      }
      setSubmitting(false)
      // validate()

      const contextResult = {
        result,
        data
      }

      // If there is an error or the submit handler returns false, we don't want to
      // go to the next step. We just want to display the error.
      // in other cases, we go to the next step and return the submitted data.
      if (isExternalSubmission) {
        formRef?.current?.dispatchEvent(new CustomEvent('afterSubmit', {
          detail: contextResult,
        }))
      } else {
        onSubmitCallback(contextResult)
      }
    })
  }, [])


  // const setErrors = useCallback((errors: Array<{ key: string, message: string }> | Record<string, string>, forcedDisplay?: boolean) => {
  //   if (!errors) {
  //     return
  //   }

  //   if (forcedDisplay && typeof errors === 'object' && !Array.isArray(errors)) {
  //     Object.entries(errors).forEach(([key, value]) => {
  //       form.setError(key as Path<TFieldValues>, {
  //         message: value,
  //         type: 'forced'
  //       })
  //     })
  //     return
  //   }

  //   // Set the error
  //   if (typeof errors === 'object' && Array.isArray(errors)) {
  //     for (const error of errors) {
  //       const { key, message } = error
  //       if (!submissionHistoryRef.current[key].error) {
  //         submissionHistoryRef.current[key].error = message
  //       }
  //     }
  //   }


  //   const currentErrors: Array<[string, string]> = [] // key value
  //   let otherSubmission: { subStepIndex: number, stepIndex: number } | null = null

  //   for (const [key, data] of Object.entries(submissionHistoryRef.current)) {
  //     if (!data.error) {
  //       continue
  //     }
  //     if (data.stepIndex === stepIndex && data.subStepIndex === subStepIndex) {
  //       currentErrors.push([key, data.error])
  //       continue
  //     }

  //     if (!otherSubmission) {
  //       otherSubmission = {
  //         stepIndex: data.stepIndex,
  //         subStepIndex: data.subStepIndex
  //       }
  //     }
  //   }

  //   // When the error is one the current step
  //   if (currentErrors.length > 0) {
  //     currentErrors.forEach(([key, message]) => {
  //       form.setError(key as Path<TFieldValues>, {
  //         type: 'forced',
  //         message: message
  //       })
  //     })
  //     return
  //   }

  //   if (otherSubmission) {
  //     setStepIndex(otherSubmission.stepIndex)
  //     setSubStepIndex(otherSubmission.subStepIndex)
  //   }
  // }, [])

  // const withValues = useCallback((callback: (values: Record<string, any>) => void) => {
  //   return callback.bind(null, {
  //     ...form.getValues() || {},
  //     ...mergedValuesRef.current || {}
  //   })
  // }, [])

  const formStep = useMemo(() => ({
    ...form,
    step: steps[stepIndex],
    handleSubmit,
    // withValues,
    // validate,
    // setErrors,
    formRef,
    defaultValues
  }), [
    form,
    steps,
    stepIndex,
    handleSubmit,
    // validate,
    // setErrors,
  ])

  subscribe(
    stepIndex,
    subStepIndex,
    formStep,
    formRef,
    formPropsRef,
    {
      isSubmittingAtom,
      isValidAtom,
    }
  )


  return formStep
}