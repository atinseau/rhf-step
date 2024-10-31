import { createContext } from "react"
import type { FormStep, LogLevel, BeforeStepChangeHandler, OnStepChangeHandler } from "../../types"

export type IFormPropsContext = {
  children?: React.ReactNode
  className?: string // enable container mode
  initialStepIndex?: number
  enableLog?: boolean
  name?: string
  logLevel?: LogLevel[]
  initialSubStepIndex?: number
  defaultValues?: Record<string, any>
  steps: FormStep[] | React.ComponentType
  onError?: (error: Error) => void

  // hooks
  // before<event> is called before the event is triggered
  // so event can be cancelled
  // on<event> has no effect on the action
  // before the event is already triggered

  beforeStepChange?: BeforeStepChangeHandler
  onStepChange?: OnStepChangeHandler

  beforePreviousStep?: BeforeStepChangeHandler
  onPreviousStep?: OnStepChangeHandler

  beforeNextStep?: BeforeStepChangeHandler
  onNextStep?: OnStepChangeHandler

  // Special hooks
  onPreviousFirstStep?: OnStepChangeHandler
  onLastStep?: OnStepChangeHandler
}

// The FormPropsContext is used to pass props across the Form components
// it give the ability to have a better code structure and composition of the form stepper
// it only used internnally, it's not exposed to the user
// formProps is only consumed inside the library (not for external use, to risky)
export const FormPropsContext = createContext({} as IFormPropsContext)
