'use client';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";

import {
  FormProvider,
  FormStep,
  RenderStep,
  useFormNavigation,
  useForm,
  useFormSubmit,
} from "rhf-step";

function Form1() {

  const { register, createSubmitHandler, formState } = useForm<{ name: string, age: number }>({
    defaultValues: {
      age: 20
    },
    resetOptions: {
      keepValues: true
    }
  })

  const { errors } = formState

  const [count, setCount] = useState(0)

  const submitHandler = createSubmitHandler(async (data, event) => {
    console.log(data, count)
  })

  return <form
    {...submitHandler}
    className="flex flex-col gap-2 w-full"
  >

    <FormItem>
      <Label htmlFor="name">Name</Label>
      <Input placeholder="John Doe" type="text" {...register('name', { required: { message: "Name is required", value: true } })} />
      {errors.name && <FormMessage message={errors.name.message} />}
    </FormItem>

    <FormItem>
      <Label htmlFor="age">Age</Label>
      <Input
        placeholder="10"
        type="number"
        {...register('age', {
          valueAsNumber: true,
          required: { message: "Age is required", value: true },
          min: { message: "Age must be greater than 10", value: 10 },
          max: { message: "Age must be less than 100", value: 100 }
        })}
      />
      {errors.age && <FormMessage message={errors.age.message} />}
    </FormItem>

    <Button className="mt-2" type="submit">Submit</Button>
    <Button type="button" onClick={() => setCount(count + 1)}>Count: {count}</Button>
  </form>
}

// function Form1() {
//   return <p>Form1</p>
// }

function Form2() {

  const { createSubmitHandler, register, formState } = useForm<{ description: string }>()
  const { errors } = formState

  const submitHandler = createSubmitHandler(async (data, event) => {
    console.log(data, event)
  })

  return <form
    {...submitHandler}
    className="flex flex-col gap-2 w-full"
  >
    <FormItem>
      <Label htmlFor="description">Description</Label>
      <Input placeholder="Description" type="text" {...register('description')} />
      {errors.description && <FormMessage message={errors.description.message} />}
    </FormItem>
    <Button className="mt-2">Submit</Button>
  </form>

  // return <p>Form2</p>
}

function Form3() {
  return <p>Form3</p>
}

function Form4() {
  return <p>Form4</p>
}

const steps: FormStep[] = [
  {
    // peristent: true,
    components: [
      Form1,
    ]
  },
  {
    // peristent: true,
    components: [
      Form2,
    ]
  },
  {
    standalone: true,
    components: [
      Form3,
      Form4
    ]
  }
]

function Control() {

  const { back, next } = useFormNavigation()
  const { submit } = useFormSubmit()

  return <div className="w-full flex flex-col gap-2">
    <div className="flex gap-2">
      <Button className="flex-1" variant="secondary" onClick={back}>Back</Button>
      <Button className="flex-1" variant="secondary" onClick={next}>Next</Button>
    </div>
    <Button className="w-full" onClick={submit}>External submit</Button>
  </div>
}

function RenderFormStep() {
  return <Card className="w-full">
    <CardHeader>
      <CardTitle>Form step</CardTitle>
    </CardHeader>
    <CardContent>
      <RenderStep /> {/* Only this component will change on each step */}
    </CardContent>
  </Card>
}

export default function Page() {

  return <FormProvider
    // onNextStep={() => {
    //   console.log('onNextStep')
    // }}
    // onPreviousStep={() => {
    //   console.log('onPreviousStep')
    // }}
    // onLastStep={() => {
    //   console.log('onCompleteLastStep')
    // }}
    // beforeNextStep={() => {
    //   console.log('beforeNextStep')
    // }}
    // beforePreviousStep={() => {
    //   console.log('beforePreviousStep')
    // }}
    // beforeStepChange={() => {
    //   console.log('beforeStepChange')
    // }}
    // onPreviousFirstStep={() => {
    //   console.log('onPreviousFirstStep')
    // }}
    enableLog
    name="form-1"
    className="flex flex-col items-center justify-center h-screen w-full max-w-[400px] gap-8 mx-auto"
    steps={steps}
  >
    <RenderFormStep />
    <Control />
  </FormProvider>
}