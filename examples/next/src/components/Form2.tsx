import { useForm } from "rhf-step"
import { SubmitHandler } from "rhf-step"

type Form2 = {
  age: number
}

function Form2() {

  const { handleSubmit, register, formState } = useForm<Form2>({
    defaultValues: {
      age: 20
    }
  })

  const onSubmit: SubmitHandler<Form2> = (data, mergedData) => {

    console.log('data:', data)
    console.log('mergedData:', mergedData)

    return true
  }

  return <form onSubmit={handleSubmit(onSubmit)}>
    <input type="number" {...register('age')} />
    <button type="submit">Submit 2</button>
  </form>
}

export default Form2