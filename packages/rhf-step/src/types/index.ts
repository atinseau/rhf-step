import React from "react";
import { FieldValues, UseFormReturn as UseFormReturnRHF } from "react-hook-form";

// COMMON

export type LogLevel = 'info' | 'warn' | 'error' | 'log'

// HANDLERS

export type StepChangeHandler<T> = (stepIndex: number, subStepIndex?: number) => T
export type BeforeStepChangeHandler = StepChangeHandler<boolean | Promise<boolean> | void | Promise<void>>
export type OnStepChangeHandler = StepChangeHandler<void | Promise<void>>

export type SubmitCallback = (data: {
  result: boolean | Error | null,
  data: Record<string, any>
}) => void

export type SubmitHandler<T> = (
  data: T,
  event: React.BaseSyntheticEvent<object, any, any>
) => Promise<boolean> | boolean | Promise<void> | void

export type FormSubscribe = (
  stepIndex: number,
  subStepIndex: number,
  form: UseFormReturn<any, any>,
) => void

export type FormUnsubscribe = (
  stepIndex: number,
  subStepIndex: number,
) => void


export type StepMatrix<T> = Record<number,
  Record<number, T>
>

export type FormRefs = StepMatrix<UseFormReturn<any>>
export type StepMemory = StepMatrix<Record<string, any>>


export type FormStep = {
  title?: string
  // it's a basic component that will be rendered inside of a form
  // submit warn will not be triggered
  // it's useful when you want to render a component that is not a form
  // but you still want to use the form context
  standalone?: boolean
  // If the step is persistent, state will be stored in the localStorage and restored on application
  // load inside the stepMemory at the right indexes (stepIndex, subStepIndex)
  peristent?: boolean
  components: React.ComponentType[]
}



type UseFormOverridedMembers =
  | 'handleSubmit'

export type UseFormHandleSubmitReturn = {
  ref: React.RefObject<HTMLFormElement>
  onSubmit: React.FormEventHandler<HTMLFormElement> | undefined
}

export type UseFormHandleSubmit<
  TFieldValues extends FieldValues = FieldValues
> = (submitHandler?: SubmitHandler<TFieldValues>) => UseFormHandleSubmitReturn

export type UseFormCreateSubmitHandler<TFieldValues> = UseFormHandleSubmit<TFieldValues>

export type UseFormReturn<
  TFieldValues extends FieldValues = FieldValues,
  TContext = any,
> = Omit<UseFormReturnRHF<TFieldValues, TContext, undefined>, UseFormOverridedMembers> & {

  handleSubmit: UseFormHandleSubmit<TFieldValues>
  createSubmitHandler: UseFormCreateSubmitHandler<TFieldValues>
  ref: React.RefObject<HTMLFormElement>

}