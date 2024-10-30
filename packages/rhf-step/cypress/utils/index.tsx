import {
  FormProvider,
  FormProviderProps
} from "../../src/contexts/FormContext/FormProvider"


export const Form1 = () => <p>form1</p>
export const Form2 = () => <p>form2</p>

export const getFormProvider = (props: Partial<FormProviderProps> = {}) => <FormProvider
  steps={[{ components: [Form1, Form2] }]}
  {...props}
/>