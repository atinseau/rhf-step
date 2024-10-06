import { PrimitiveAtom } from "jotai"
import { BaseSyntheticEvent } from "react"
import {
  FieldValues,
  UseFormReturn as RHFUseFormReturn,
  UseFormProps as RHFUseFormProps
} from "react-hook-form"

// COMMON

export type LogLevel = 'debug' | 'info' | 'warn' | 'error' | 'log'

// HANDLERS

export type BeforeStepChangeHandler = (stepIndex: number, subStepIndex?: number) => Promise<any> | any

export type SubmitCallback = (data: { result: boolean | Error | null, data: Record<string, any> }) => void

export type SubmitHandler<T> = (
  data: T,
  mergedData?: Record<string, any>,
  e?: BaseSyntheticEvent<object, any, any>,
) => Promise<boolean> | boolean

export type FormSubscribe = (
  stepIndex: number,
  subStepIndex: number,
  // form: UseFormStepReturn,
  form: any,
  formRef: React.RefObject<HTMLFormElement>,
  // formPropsRef: React.RefObject<UseFormProps<any, any>>,
  formPropsRef: any,
  formStepContext: FormStepContext
) => void

// HOOK

export type UseFormOptions<TFieldValues extends FieldValues = FieldValues, TContext = any> = RHFUseFormProps<TFieldValues, TContext> & {
  withInitialValidation?: boolean
  // defaultAsDirty?: boolean
}

export type UseFormReturn<T> = Omit<RHFUseFormReturn<T>, 'handleSubmit'> & {
  formRef: React.RefObject<HTMLFormElement>,
  step: FormStep,
  defaultValues: Record<string, any>,
  handleSubmit: (onSubmit?: SubmitHandler<T>) => (e?: BaseSyntheticEvent<object, any, any> | undefined) => Promise<void>,
  // withValues: (callback: (values: Record<string, any>) => void) => () => void,
  // setErrors: (errors: Array<{ key: string, message: string }> | Record<string, string>, forcedDisplay?: boolean) => void,
  // validate: () => void,
}

export type FormStepContext = {
  isSubmittingAtom: PrimitiveAtom<boolean>
  isValidAtom: PrimitiveAtom<boolean>
}

export type SubmissionHistory = Record<string, {
  value: any,
  stepIndex: number
  subStepIndex: number
  error?: string
}>

export type FormRefs = Record<number, Record<number,
  & UseFormReturn<any>
  & {
    formPropsRef?: React.RefObject<UseFormOptions<any, any>>,
    formStepContext?: FormStepContext
  }
>>



export type FormStep = {
  title?: string
  components: React.ComponentType[]
  keepValues?: boolean
  defaultValues?: Record<string, any>
  prev?: {
    scoped?: boolean
    global?: boolean
    allowed?: number[]
  }
}


export type CurrentSubmission = {
  data: Record<string, any>,
  stepIndex: number
  subStepIndex: number
  errors?: Record<string, string>
}


