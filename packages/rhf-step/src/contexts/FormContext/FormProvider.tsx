import { FormDebugProvider } from "../FormDebugContext/FormDebugProvider";
import { FormNavigationProvider } from "../FormNavigationContext/FormNavigationProvider";
import { FormPropsProvider, IFormPropsContext } from "../FormPropsContext";
import { FormStateProvider } from "../FormStateContext";

import FormProviderInner from "./FormProviderInner";

export type FormProviderProps = IFormPropsContext

export function FormProvider({ children, ...props }: FormProviderProps) {
  return <FormPropsProvider
    {...props}
    formChildren={children}
  >
    <FormDebugProvider>
      <FormStateProvider>
        <FormNavigationProvider>
          <FormProviderInner />
        </FormNavigationProvider>
      </FormStateProvider>
    </FormDebugProvider>
  </FormPropsProvider>
}