import { Given, Then, When } from "@badeball/cypress-cucumber-preprocessor";


// cenário 1 - fazer uma busca de reservas sem login, encontrando reservas

Given('eu estou na página inicial', () => {
    cy.visit('/');
})

Given('eu não estou logado', () => {
    cy.get('[data-cy="usernameNavBar"]').should("contain.text", "Conta");
})

When('eu preencho o campo {string} com {string}', (campo: string, valor: string) => {
    cy.get(`[data-cy="${campo}"]`).type(valor);
})

// And eu preencho o campo "check-in" com "21/07/2024"
When('eu preencho o campo {string} com {string} ', (campo: string, valor: string) => {
    cy.get(`[data-cy="${campo}"]`).type(valor);
})


// And eu preencho o campo "checkout" com "2024-07-22"
When('eu preencho o campo {string} com {string} ', (campo: string, valor: string) => {
    cy.get(`[data-cy="${campo}"]`).type(valor);
})

// And eu clico no campo "detalhes"
When('eu clico no campo {string}', (campo: string) => {
    cy.get(`[data-cy="${campo}"]`).click();
})


// And eu clico no campo de "adultos" "2" vezes
When('eu clico no campo de {string} {string} vezes', (campo: string, vezes: string) => {
    for(let i = 0; i < parseInt(vezes); i++){
        cy.get(`[data-cy=increase_${campo}]`).click()
    }
})

// And eu clico no campo de "quartos" "1" vez
When('eu clico no campo de {string} {string} vez', (campo: string, vezes: string) => {
    for(let i = 0; i < parseInt(vezes); i++){
        cy.get(`[data-cy=increase_${campo}]`).click()
    }
})

// And eu clico em "pesquisar"
When('eu clico em {string}', (campo: string, vezes: string) => {
    cy.get(`[data-cy=${campo}]`).click();
})

// Then eu sou redirecionado para a página "/search"
Then('eu sou redirecionado para a página {string}', (url: string) => {
    cy.url().should("include", url);
})


// And eu vejo o "Quarto Outono" com o valor promocional de "1000"
Then('eu vejo o {string} com o valor promocional de {string}', (name: string, value: string) => {
    cy.get("#reservation_name").should("contain.text", name);
    cy.get("#reservation_price").should("contain.text", parseFloat(value).toLocaleString("pt-br", {style: "currency", currency: "BRL"}))
})

// cenario 2 - fazer uma busca de reservas sem login, sem encontrar reservas
// Given eu estou na página inicial 
// And eu não estou logado
// When eu preencho o campo "destino" com "Recife"
// And eu preencho o campo "checkin" com "2024-07-23"
// And eu preencho o campo "checkout" com "2024-07-28"
// And eu clico no campo "popover-trigger-detalhes"
// And eu clico no campo de "adultos" "2" vezes
// And eu clico no campo de "quartos" "1" vez
// And eu clico em "pesquisar"
// Then eu vou para a página “resultados”

// já foram implementados anteriormente ^

// And eu vejo que "Nenhuma reserva foi encontrada"
Then('eu vejo que {string}', (notfound: string) => {
    cy.get("#reservenotfound").should("contain.text", notfound)
})