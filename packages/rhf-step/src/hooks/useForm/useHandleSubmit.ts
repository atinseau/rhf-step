import { UseFormCreateSubmitHandler, UseFormHandleSubmit } from "../../types"
import { useCallback, useRef } from "react"
import { FieldValues, UseFormReturn as UseFormReturnRHF } from "react-hook-form"
import { useFormContext } from "../../contexts/FormContext"


export function useHandleSubmit<
  TFieldValues extends FieldValues = FieldValues,
  TContext = any,
>(form: UseFormReturnRHF<TFieldValues, TContext>) {

  const formRef = useRef<HTMLFormElement>()
  const { onSubmitCallback } = useFormContext()

  const handleSubmit: UseFormHandleSubmit<TFieldValues> = useCallback((onSubmitHandler) => {
    return {
      ref: formRef,
      onSubmit: form.handleSubmit(async (data, event) => {

        let result: boolean | Error | null = null
        try {

          if (onSubmitHandler) {
            const output = await onSubmitHandler(data, event)
            result = typeof output === 'undefined' ? true : output
          } else {
            result = true
          }
        } catch (error) {
          result = error
        }

        onSubmitCallback({
          result,
          data
        })
      })
    }
  }, [])

  const createSubmitHandler: UseFormCreateSubmitHandler<TFieldValues> = useCallback((onSubmitHandler) => {
    return handleSubmit(onSubmitHandler)
  }, [])

  return {
    formRef,
    handleSubmit,
    createSubmitHandler
  }

}