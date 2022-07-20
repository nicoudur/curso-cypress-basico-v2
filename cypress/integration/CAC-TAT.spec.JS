/// <reference types="Cypress" />
beforeEach(() => {
  cy.visit('./src/index.html')
})
describe('Central de Atendimento ao Cliente TAT', function () {
  it('verifica o titulo da aplicação', function () {
    cy.title().should('eq', 'Central de Atendimento ao Cliente TAT')
  })
  it('preenche os campos obrigatórios e envia o formulário', function () {
    cy.get('[name="firstName"]').type('Nicolas')
    cy.get('[name="lastName"]').type('duarte')
    cy.get('#email').type('Nicolas@gmail.com')
    cy.get('[name="open-text-area"]').type('quero aprender cypress quero aprender cypress quero aprender cypress quero aprender cypress quero aprender cypress', { delay: 0 })
    cy.contains('button', 'Enviar').click()
    cy.get('.success').should('be.visible')
  })
  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function () {
    cy.get('[name="firstName"]').type('Nicolas')
    cy.get('[name="lastName"]').type('duarte')
    cy.get('#email').type('Nicolasgmail.com')
    cy.get('[name="open-text-area"]').type('quero aprender cypress quero aprender cypress quero aprender cypress quero aprender cypress quero aprender cypress', { delay: 0 })
    cy.contains('button', 'Enviar').click()
    cy.get('.error').should('be.visible')
  })
  it('testar input de telefone', function () {
    cy.get('[name="firstName"]').type('Nicolas')
    cy.get('[name="lastName"]').type('duarte')
    cy.get('#email').type('Nicolas@gmail.com')
    cy.get('[name="open-text-area"]').type('quero aprender cypress', { delay: 0 })
    cy.get('#phone').type('daidasod')
    cy.get('#phone').should('have.value', '')
  })
  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function () {
    cy.get('[name="firstName"]').type('Nicolas')
    cy.get('[name="lastName"]').type('duarte')
    cy.get('#email').type('Nicolas@gmail.com')
    cy.get('[name="open-text-area"]').type('quero aprender cypress', { delay: 0 })
    cy.get('#phone-checkbox').check()
    cy.contains('button', 'Enviar').click()
    cy.get('.error').should('be.visible')
  })
  it('preenche e limpa os campos nome, sobrenome, email e telefone', function () {
    cy.get('[name="firstName"]')
      .type('Nicolas')
      .should('have.value', 'Nicolas')
      .clear()
      .should('have.value', '')
    cy.get('[name="lastName"]')
      .type('duarte')
      .should('have.value', 'duarte')
      .clear()
      .should('have.value', '')
    cy.get('#email')
      .type('Nicolas@gmail.com')
      .should('have.value', 'Nicolas@gmail.com')
      .clear()
      .should('have.value', '')
    cy.get('[name="open-text-area"]').type('quero aprender cypress', { delay: 0 })
    cy.get('#phone')
      .type('1234456778')
      .should('have.value', '1234456778')
      .clear()
      .should('have.value', '')
  })

  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function () {
    cy.get('button[type="submit"]').click()
    cy.get('.error').should('be.visible')
  })
  it('envia o formuário com sucesso usando um comando customizado', function () {
    cy.fillMandatoryFieldsAndSubmit()
    cy.get('.success').should('be.visible')
  })
  it('seleciona um produto (YouTube) por seu texto', function () {
    cy.get('#product')
      .select('YouTube')
      .should('have.value', 'youtube')
  })
  it('seleciona um produto (Mentoria) por seu valor (value)', function () {
    cy.get('#product')
      .select('Mentoria')
      .should('have.value', 'mentoria')
  })
  it('seleciona um produto (Blog) por seu índice', function () {
    cy.get('#product')
      .select(1)
      .should('have.value', 'blog')
  })
  it('marca o tipo de atendimento "Feedback"', function () {
    cy.get('input[type="radio"][value ="feedback"')
      .check()
      .should('have.value', 'feedback')
  })
  it('marca cada tipo de atendimento', function () {
    cy.get('input[type="radio"]')
      .should('have.length', 3)
      .each(function ($radio) {
        cy.wrap($radio).check()
        cy.wrap($radio).should('be.checked')
      })
  })
  it('marca ambos checkboxes, depois desmarca o último', function () {
    cy.get('input[type="checkbox"]')
      .should('have.length', 2)
      .check()
      .should('be.checked')
      .last()
      .uncheck()
      .should('not.be.checked')
  })
  it.only('seleciona um arquivo da pasta fixtures', function () {
    cy.get('#file-upload')
      .should('not.have.value')
      .selectFile('cypress/fixtures/example.json')
      .should(function ($input) {
        expect($input[0].files[0].name).to.equal('example.json')

      })
  })

  it.only('seleciona um arquivo simulando um drag-and-drop', function () {
    cy.get('#file-upload')
      .should('not.have.value')
      .selectFile('cypress/fixtures/example.json', { action: 'drag-drop' })
      .should(function ($input) {
        expect($input[0].files[0].name).to.equal('example.json')

      })
  })
  it.only('seleciona um arquivo simulando um drag-and-drop', function () {
    cy.fixture('example.json').as('sampleFile')
    cy.get('#file-upload')
      .should('not.have.value')
      .selectFile('@sampleFile', { action: 'drag-drop' })
      .should(function ($input) {
        expect($input[0].files[0].name).to.equal('example.json')
      })
  })
})
