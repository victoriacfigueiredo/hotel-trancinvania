import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";


Given('eu estou logado como hoteleiro com o e-mail {string} e a senha {string}', (email: string, password: string) => {
    cy.visit('/hotelier/login');
    cy.get('input[name=email]').type(email);
    cy.get('input[name=password]').type(password);
    cy.get('button[type=submit]').click();
})

Given('eu estou na página {string}', (page: string) => {
    cy.visit(page);
})

Given('eu estou na página {string} da reserva do {string}', (page: string, hotelName: string) => {
    cy.get(`#${hotelName}`).click();
    cy.wait(500);
    cy.url().should('include', page);
})

Given('eu estou na página {string} da reserva do {string} com o valor da diária por {string}', (page: string, hotelName: string, price: string) => {
    cy.get(`#${hotelName}`).click();
    cy.wait(500);
    cy.get('#registerPromotion').click();
    cy.contains(price).should('be.visible');
    cy.url().should('include', page);
})

Given('O {string} tem uma promoção de {string} cadastrada com o valor promocional de {string} a diária', (hotelName: string, discount: string, new_price: string) => {
    cy.contains(hotelName).parent().within(() => {
        cy.contains(new_price).should('be.visible');
        cy.contains(discount).should('be.visible');
    });
})

Given('O {string} não possui nenhuma promoção cadastrada', () => {
    cy.get('#promotion').should('not.exist');
})

Given('O {string} está nas reservas publicadas com o valor de {string} a diária', (hotelName: string, price: string) => {
    cy.contains(hotelName).parent().within(() => {
        cy.contains(price).should('be.visible');
    });
})

Given('Não há nenhuma promoção cadastrada', () => {
    cy.get('#bat').should('not.exist');
})

When('eu preencho o campo {string} com {string}', (field: string, value: string) => {
    cy.get("#" + field).type(value);
})

When('eu seleciono a promoção {string}', (type: string) => {
    cy.get("#type").select(type);
})

When('eu seleciono {string}', (button: string) => {
    cy.get('#' + button).click();
})

Then('eu vejo um toast de sucesso com a mensagem {string}', (message: string) => {
    cy.get('.Toastify__toast-body').should('contain.text', message);
})

Then('eu vejo um toast de erro com a mensagem {string}', (message: string) => {
    cy.get('.Toastify__toast-body').should('contain.text', message);
})

Then('eu sou redirecionado para a página {string}', (page: string) => {
    cy.wait(3000);
    cy.url().should('include', page);
})

Then('eu continuo na página {string}', (page: string) => {
    cy.url().should('include', page);
})

Then('eu vejo o {string} com o valor de {string}', (hotelName: string, new_price: string) => {
    cy.contains(hotelName).parent().within(() => {
        cy.contains(new_price).should('be.visible');
    });
})