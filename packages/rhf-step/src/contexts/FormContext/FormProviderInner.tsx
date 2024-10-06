import { FormContext } from "./formContext"
import { useFormProps } from "../FormPropsContext"
import { useFormComponent } from "./hooks/useFormComponent"
import { useFormSubmit } from "./hooks/useFormSubmit"
import { useSubmissionHistory } from "./hooks/useSubmissionHistory"
import { useFormSubscription } from "./hooks/useFormSubscription"

export default function FormProviderInner() {

  const props = useFormProps()
  const Component = useFormComponent()

  const { getCurrentSubmission, updateSubmissionHistory } = useSubmissionHistory()
  const { subscribe } = useFormSubscription()
  const { onSubmit, onSubmitCallback } = useFormSubmit()

  return <FormContext.Provider
    value={{
      Component,
      getCurrentSubmission,
      updateSubmissionHistory,
      subscribe,
      onSubmit,
      onSubmitCallback
    }}
  >
    {props.children
      ? props.children
      : <Component />
    }
  </FormContext.Provider>

}