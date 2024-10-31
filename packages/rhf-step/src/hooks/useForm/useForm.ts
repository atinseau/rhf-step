import {
  FieldValues,
  UseFormProps as UseFormPropsRHF,
  useForm as useFormRHF
} from "react-hook-form"
import { UseFormReturn } from "../../types"
import { useHandleSubmit } from "./useHandleSubmit"
import { useFormDebug } from "../../contexts/FormDebugContext/hooks/useFormDebug"
import { useFormContext } from "../../contexts/FormContext"
import { useFormState } from "../../contexts/FormStateContext"
import { useWatchedForm } from "./useWatchedForm"

function getDefaultValues({ stepMemoryDefaultValues, providerDefaultValues }: {
  stepMemoryDefaultValues?: Record<string, any>
  providerDefaultValues: any
}) {
  if (stepMemoryDefaultValues) {
    return stepMemoryDefaultValues
  }
  return providerDefaultValues
}

export function useForm<
  TFieldValues extends FieldValues = FieldValues,
  TContext = any,
>(props?: UseFormPropsRHF<TFieldValues, TContext>): UseFormReturn<TFieldValues, TContext> {
  const { subscribe } = useFormContext()
  const { info } = useFormDebug('useForm')

  const { stepIndex, subStepIndex, stepMemoryRef } = useFormState()

  const form = useFormRHF<TFieldValues, TContext>({
    ...props,
    defaultValues: getDefaultValues({
      stepMemoryDefaultValues: stepMemoryRef.current?.[stepIndex]?.[subStepIndex],
      providerDefaultValues: props?.defaultValues
    })
  })

  const { formRef, createSubmitHandler, handleSubmit } = useHandleSubmit(form)

  useWatchedForm(form)

  const output = {
    ...form,
    createSubmitHandler,
    handleSubmit,
    ref: formRef
  }

  subscribe(stepIndex, subStepIndex, output)
  info('render')

  return output
}