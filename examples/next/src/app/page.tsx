'use client';
import Form1 from "@/components/Form1";
import Form2 from "@/components/Form2";
import React, { useState } from "react";
import {
  FormProvider,
  FormStep,
  RenderStep,
  // useFormNavigation,
  // SubmitHandler,
  // useFormContext,
  // useFormStep
} from "rhf-step";


// function Form2() {
//   return <p>Form2</p>
// }

// function Form3() {
//   return <p>Form3</p>
// }

const steps: FormStep[] = [
  {
    components: [
      Form1,
      Form2,
    ]
  },
  // {
  //   components: [
  //     Form3,
  //   ]
  // }
]

// function Control() {

//   const { back, next } = useFormNavigation()

//   return <div>
//     <button onClick={back}>Back</button>
//     <button onClick={next}>Next</button>
//   </div>
// }

export default function Page() {

  const [autoReset, setAutoReset] = useState(false)

  return <>
    <FormProvider
      enableLog
      steps={steps}
      autoReset={autoReset}
    >
      <RenderStep />
      {/* <Control /> */}
    </FormProvider>
    <button onClick={() => setAutoReset(!autoReset)}>Toggle autoReset</button>
  </>
}