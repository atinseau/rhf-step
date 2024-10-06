import { FormNavigationContext } from "./formNavigationContext";
import { useFormNavigation } from "./hooks/useFormNavigation";


export function FormNavigationProvider(props: { children?: React.ReactNode }) {
  const navigation = useFormNavigation()

  return <FormNavigationContext.Provider value={navigation}>
    {props.children}
  </FormNavigationContext.Provider>
}