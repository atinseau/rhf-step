import { createContext } from "react";
import { OnStepChangeHandler } from "../../types";

export type NavigationQueueEvent = {
  stepIndex: number
  subStepIndex: number
  callback: OnStepChangeHandler
}

export type NavigationQueue = {
  events: NavigationQueueEvent[]
}

type IFormNavigationContext = {
  push: (event: NavigationQueueEvent) => void
  pop: () => NavigationQueueEvent
  shift: () => NavigationQueueEvent
}

export const FormNavigationContext = createContext({} as IFormNavigationContext)