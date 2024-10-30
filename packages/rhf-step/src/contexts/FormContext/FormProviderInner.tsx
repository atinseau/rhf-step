import { FormContext } from "./formContext"
import { useFormProps } from "../FormPropsContext"
import { useFormComponent } from "./hooks/useFormComponent"
import { useFormSubmitter } from "./hooks/useFormSubmitter"
import { useFormSubscription } from "./hooks/useFormSubscription"
import { useStepMemory } from "./hooks/useStepMemory"

export default function FormProviderInner() {

  const props = useFormProps()
  const Component = useFormComponent()

  const { subscribe, unsubscribe } = useFormSubscription()
  const { onSubmit, onSubmitCallback } = useFormSubmitter()
  const { updateStepMemory } = useStepMemory()
  
  return <FormContext.Provider
    value={{
      Component,
      subscribe,
      unsubscribe,
      onSubmit,
      onSubmitCallback,
      updateStepMemory
    }}
  >
    {props.className
      ? <div className={props.className}>{props.children ?? <Component />}</div>
      : props.children ?? <Component />
    }
  </FormContext.Provider>

}