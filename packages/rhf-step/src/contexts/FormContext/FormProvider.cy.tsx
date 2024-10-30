/// <reference path="../../../cypress/support/component.ts" />
import { getFormProvider } from "../../../cypress/utils"

describe('FormProvider', () => {

  it('Should be instantiated', () => {
    cy.mount(getFormProvider())
    cy.get('p').should('contain', 'form1')
  })

  it('Should render a different children', () => {
    cy.mount(getFormProvider({ children: <p>children</p> }))
    cy.get('p').should('contain', 'children')
  })

})