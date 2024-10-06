import { useMemo } from "react";
import { useFormState } from "react-hook-form";
import { useActiveForm } from "./useActiveForm";

import get from 'lodash-es/get'

export function useFormError(name: string) {

  const form = useActiveForm();

  const formState = useFormState({
    control: form.control,
    exact: true,
    name
  })

  const errors = useMemo(() => {
    const mode = form.formPropsRef?.current?.mode
    const error = get(formState.errors, name)
    const errorType = error?.type

    if (errorType === 'forced') {
      return {
        isInvalid: true,
        errorText: error?.message?.toString()
      }
    }

    // submitCount is not cleared when the form is reset
    // so we need to check if the form is submitted and successful
    // to avoid showing errors on the next render after a successful submit
    if (
      mode === 'onSubmit'
      && formState.submitCount > 0
      && formState.isSubmitSuccessful
      && formState.isSubmitted
    ) {
      return {}
    }

    if (mode === 'onSubmit' && formState.submitCount === 0) {
      return {}
    }
    if (mode !== 'onSubmit' && !get(formState.dirtyFields, name) && !form.formPropsRef?.current?.withInitialValidation) {
      return {}
    }

    if (error) {
      return {
        isInvalid: true,
        errorText: error.message?.toString()
      }
    }
    return {}
  }, [formState])

  return errors
}