import { FormPropsContext, IFormPropsContext } from "./formPropsContext";

export type FormPropsProviderProps = IFormPropsContext & {
  formChildren?: React.ReactNode
}

export function FormPropsProvider(props: FormPropsProviderProps) {
  return <FormPropsContext.Provider
    value={{
      ...props,
      enableLog: props.enableLog ?? false,
      logLevel: props.logLevel ?? ["debug", "error", "info", "log", "warn"],
      children: props.formChildren
    }}
  >
    {props.children}
  </FormPropsContext.Provider>
}