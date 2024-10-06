import { useForm } from "rhf-step"
import { SubmitHandler } from "rhf-step"

type Form1 = {
  name: string
}

function Form1() {

  const { handleSubmit, register, formState } = useForm<Form1>({
    defaultValues: {
      name: 'Thomas'
    }
  })

  const onSubmit: SubmitHandler<Form1> = (data) => {
    return true
  }

  return <form onSubmit={handleSubmit(onSubmit)}>
    <input type="text" {...register('name')} />
    <button type="submit">Submit 1</button>
  </form>
}

export default Form1