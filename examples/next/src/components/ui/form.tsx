


export function FormItem({ children }: React.PropsWithChildren) {
  return <div className="space-y-2">
    {children}
  </div>
}

export function FormMessage({ message }: { message?: string }) {

  if (!message) {
    return null
  }

  return <p className="text-[0.8rem] font-medium text-red-600">{message}</p>
}