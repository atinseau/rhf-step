import { useEffect } from "react";
import { FieldValues, UseFormReturn as UseFormReturnRHF } from "react-hook-form";
import { useFormContext } from "../../contexts/FormContext";


export function useWatchedForm<
  TFieldValues extends FieldValues = FieldValues,
  TContext = any,
>(form: UseFormReturnRHF<TFieldValues, TContext>) {

  const { updateStepMemory } = useFormContext()

  useEffect(() => {
    const { unsubscribe } = form.watch((values) => {
      updateStepMemory(values)
    })
    return unsubscribe
  }, [])

}