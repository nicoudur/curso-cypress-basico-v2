// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
Cypress.Commands.add('fillMandatoryFieldsAndSubmit', () => { 
    cy.get('[name="firstName"]').type('Nicolas')
    cy.get('[name="lastName"]').type('duarte')
    cy.get('#email').type('Nicolas@gmail.com')
    cy.get('[name="open-text-area"]').type('quero aprender cypress quero aprender cypress quero aprender cypress quero aprender cypress quero aprender cypress', { delay: 0 })
    cy.contains('button','Enviar').click()
})