import { createContext } from "react"
import type { BeforeStepChangeHandler, FormStep, LogLevel } from "../../types"

export type IFormPropsContext = {
  children?: React.ReactNode
  initialStepIndex?: number
  enableLog?: boolean
  logLevel?: LogLevel[]
  initialSubStepIndex?: number
  autoReset?: boolean
  defaultValues?: Record<string, any>
  steps: FormStep[] | React.ComponentType
  onError?: (error: Error) => void
  beforeStepChange?: BeforeStepChangeHandler
  onPreviousStep?: (stepIndex: number, subStepIndex: number) => void | Promise<void>
  onFirstStepBack?: () => void
  afterLastStep?: () => void
}

// The FormPropsContext is used to pass props across the Form components
// it give the ability to have a better code structure and composition of the form stepper
// it only used internnally, it's not exposed to the user
// formProps is only consumed inside the library (not for external use, to risky)
export const FormPropsContext = createContext({} as IFormPropsContext)
