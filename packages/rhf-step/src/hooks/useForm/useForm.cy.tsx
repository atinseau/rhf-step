import { getFormProvider } from "../../../cypress/utils"
import { SubmitHandler } from "../../types"
import { useForm } from './useForm'


describe('useForm', () => {

  it('Should be able to instantiate a simple rhf form', () => {

    const Form = ({ onSubmit }: { onSubmit: SubmitHandler<any> }) => {
      const { handleSubmit, register } = useForm<{ name: string }>()
      return <form onSubmit={handleSubmit(onSubmit)}>
        <input type="text" {...register('name')} />
      </form>
    }

    let submission = {}

    const fn = {
      onSubmit: (data: any) => {
        submission = data
      }
    }

    const onSubmit = cy.spy(fn, 'onSubmit')

    cy.mount(getFormProvider({
      steps: [{ components: [Form.bind(null, { onSubmit })] }]
    }))

    cy.get('input').type('arthur')
    cy.get('form').submit().then(() => {
      expect(submission).to.deep.equal({ name: 'arthur' })
    })

    

  })

})