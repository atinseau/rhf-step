import { useCallback, useEffect, useRef } from "react";
import { FormNavigationContext, NavigationQueue, NavigationQueueEvent } from "./formNavigationContext";
import { useFormState } from "../FormStateContext";


export function FormNavigationProvider(props: { children?: React.ReactNode }) {

  const { stepIndex, subStepIndex } = useFormState()
  const navigationQueue = useRef<NavigationQueue>({
    events: []
  })

  const push = useCallback((event: NavigationQueueEvent) => {
    navigationQueue.current.events.push(event)
  }, [])

  const pop = useCallback(() => {
    return navigationQueue.current.events.pop()
  }, [])

  const shift = useCallback(() => {
    return navigationQueue.current.events.shift()
  }, [])

  useEffect(() => {
    if (navigationQueue.current.events.length === 0) {
      return
    }
    const event = shift()
    if (!event) {
      return
    }
    event.callback(event.stepIndex, event.subStepIndex)
  }, [stepIndex, subStepIndex])

  return <FormNavigationContext.Provider
    value={{
      push,
      shift,
      pop
    }}
  >
    {props.children}
  </FormNavigationContext.Provider>

}