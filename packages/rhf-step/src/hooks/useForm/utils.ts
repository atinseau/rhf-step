import { DefaultValues } from "react-hook-form"

export const getDefaultValues = (
  submission?: Record<string, any>,
  watchedValues?: Record<string, any>,
  stepDefaultValues?: Record<string, any>,
  providerDefaultValues?: Record<string, any>
): DefaultValues<any> => {

  // The defaultValues is the result of the merge of the providerDefaultValues
  // and the stepDefaultValues, it came from the useForm hook in the step itself
  // and the FormProvider component
  // actually, the hook take the ascendant of the defaultValues from the provider
  // TODO: add a tool to reverse the ascendant
  const defaultValues = {
    ...providerDefaultValues,
    ...stepDefaultValues,
  }

  return {
    ...defaultValues,
    ...submission, // Current submission data take the ascendant over the default values
    ...watchedValues, // Watched values take the ascendant over everything
  }
}

