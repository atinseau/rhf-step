/// <reference path="../../../cypress/support/component.ts" />

import { getFormProvider } from "../../../cypress/utils"
import { RenderStep } from "../../components/RenderStep"
import { useFormNavigation } from "./useFormNavigation"

const Control = () => {
  const { next, back } = useFormNavigation()

  return <div>
    <button onClick={back}>Back</button>
    <button onClick={next}>Next</button>
  </div>
}


describe('FormNavigationContext', () => {

  it('Should be able to navigate manually between steps', () => {
    cy.mount(getFormProvider({
      children: <>
        <RenderStep />
        <Control />
      </>
    }))

    const nextButton = cy.get('button').contains('Next')
    const backButton = cy.get('button').contains('Back')

    cy.get('p').should('contain', 'form1')
    nextButton.click()
    cy.get('p').should('contain', 'form2')
    backButton.click()
    cy.get('p').should('contain', 'form1')
  })

  it('Should handle beforeStepChange hook (aborting and triggering)', () => {

    let aborting = false

    const hook = {
      beforeStepChange: () => {
        return aborting
      }
    }

    const beforeStepChange = cy.spy(hook, 'beforeStepChange').as('beforeStepChange')

    cy.mount(getFormProvider({
      beforeStepChange,
      children: <>
        <RenderStep />
        <Control />
      </>
    }))

    cy.get('p').should('contain', 'form1')
    cy.get('button').contains('Next').click()
    cy.get('@beforeStepChange').should('have.been.calledOnce')
    cy.get('p').should('contain', 'form2')
    // Return to the first step
    cy.get('button').contains('Back').click()

    cy.get('p').should('contain', 'form1').then(() => {
      aborting = true
      beforeStepChange.resetHistory()
      cy.get('button').contains('Next').click()
      cy.get('@beforeStepChange').should('have.been.calledOnce')
      cy.get('p').should('contain', 'form1')
    })
  })

  it('Should handle beforeNextStep hook (aborting and triggering)', () => {

    let aborting = false

    const hook = {
      beforeNextStep: () => {
        return aborting
      }
    }

    const beforeNextStep = cy.spy(hook, 'beforeNextStep').as('beforeNextStep')

    cy.mount(getFormProvider({
      beforeNextStep,
      children: <>
        <RenderStep />
        <Control />
      </>
    }))

    cy.get('p').should('contain', 'form1')
    cy.get('button').contains('Next').click()
    cy.get('@beforeNextStep').should('have.been.calledOnce')
    cy.get('p').should('contain', 'form2')

    // return to the first step
    cy.get('button').contains('Back').click()
    cy.get('p').should('contain', 'form1').then(() => {
      beforeNextStep.resetHistory()
      aborting = true
      cy.get('button').contains('Next').click()
      cy.get('@beforeNextStep').should('have.been.calledOnce')
      cy.get('p').should('contain', 'form1')
    })

  })

  it('Should handle beforePreviousStep hook (aborting and triggering)', () => {

    let aborting = false

    const hook = {
      beforePreviousStep: () => {
        return aborting
      }
    }

    const beforePreviousStep = cy.spy(hook, 'beforePreviousStep').as('beforePreviousStep')

    cy.mount(getFormProvider({
      beforePreviousStep,
      children: <>
        <RenderStep />
        <Control />
      </>
    }))

    cy.get('p').should('contain', 'form1')
    cy.get('button').contains('Next').click()
    cy.get('p').should('contain', 'form2')
    cy.get('button').contains('Back').click()
    cy.get('@beforePreviousStep').should('have.been.calledOnce')
    cy.get('p').should('contain', 'form1')
    
    cy.get('button').contains('Next').click().then(() => {
      beforePreviousStep.resetHistory()
      aborting = true

      cy.get('button').contains('Back').click()
      cy.get('@beforePreviousStep').should('have.been.calledOnce')
      cy.get('p').should('contain', 'form2')
    })
  })

})