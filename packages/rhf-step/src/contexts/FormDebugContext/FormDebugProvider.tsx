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
    } else {
      console.error('[FormDebugProvider] logLevel is not valid')
    }
  }, [])

  const wrap = (fn: (...args: any[]) => void, name: string) => {
    return (...args: any[]) => {
      fn(`[${name}]`, ...args)
    }
  }

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

  const createLogger = useCallback((name: string) => {
    return {
      log: wrap(log, name),
      info: wrap(info, name),
      warn: wrap(warn, name),
      error: wrap(error, name),
    }
  }, [])

  return <FormDebugContext.Provider
    value={{
      log,
      info,
      warn,
      error,
      createLogger
    }}
  >
    {props.children}
  </FormDebugContext.Provider>
}