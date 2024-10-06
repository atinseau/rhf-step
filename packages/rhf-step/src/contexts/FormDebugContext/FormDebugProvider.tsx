import { useFormProps } from "../FormPropsContext";
import { FormDebugContext } from "./formDebugContext";
import { LogLevel } from "../../types";
import { useCallback } from "react";


export function FormDebugProvider(props: { children?: React.ReactNode }) {

  const { enableLog, logLevel } = useFormProps()

  const print = useCallback((level: LogLevel, ...args: any[]) => {
    if (!enableLog) {
      return
    }
    if (logLevel.includes(level)) {
      console[level](...args)
    }
  }, [])

  const log = useCallback((...args: any[]) => {
    print('log', ...args)
  }, [])

  const info = useCallback((...args: any[]) => {
    print('info', ...args)
  }, [])

  const warn = useCallback((...args: any[]) => {
    print('warn', ...args)
  }, [])

  const error = useCallback((...args: any[]) => {
    print('error', ...args)
  }, [])

  const debug = useCallback((...args: any[]) => {
    print('debug', ...args)
  }, [])

  return <FormDebugContext.Provider
    value={{
      print,
      log,
      info,
      warn,
      error,
      debug,
    }}
  >
    {props.children}
  </FormDebugContext.Provider>
}