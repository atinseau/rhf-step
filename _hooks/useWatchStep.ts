import { UseWatchProps, useWatch } from "react-hook-form";
import { useActiveForm } from "./useActiveForm";


export default function useWatchStep(watchOptions: Omit<UseWatchProps<any>, 'control'>) {
  const form = useActiveForm()
  const value = useWatch({
    control: form.control,
    ...watchOptions,
    ...watchOptions?.name
      ? { defaultValue: form.getValues(watchOptions.name as string) }
      : {}
  })
  return value
}