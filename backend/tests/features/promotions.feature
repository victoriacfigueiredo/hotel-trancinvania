Feature: Cadastro e manutenção de promoções
As a usuário hoteleiro
I want to cadastrar, atualizar ou remover as promoções nas reservas publicadas
So that Eu possa gerenciar eficientemente os descontos e maximizar a ocupação do hotel

Scenario 1: Cadastro da promoção realizado com sucesso

Given Eu estou logada como “Hoteleiro” com o login “Maria”  e a senha “let123”
And Eu estou na página “Cadastro de promoção” da reserva do hotel “ Flores” com o valor da noite por “R$ 1300,00” 
When Eu preencho o campo “desconto” com “20%”
And Eu preencho o campo “promoção” com “limite de quarto”
And Eu preencho o campo “quantidade de quartos” com “2”
And Tento realizar o cadastro
Then Eu vejo a mensagem de confirmação de cadastro 
And Eu vejo a promoção na reserva na página de “reservas publicadas” com o valor atualizado para “R$ 1040,00”

Scenario 2: Tentativa de cadastro da promoção com algum campo não preenchido

Given Eu estou logada como “Hoteleiro” com o login “Maria”  e a senha “let123”
And Eu estou na página “Cadastro de promoção” da reserva do hotel “ Flores” com o valor da noite por “R$ 1300,00” 
When Eu preencho o campo “desconto” com “20%”
And Eu preencho o campo “promoção” com “limite de quarto”
And Tento realizar o cadastro
Then Eu vejo a mensagem indicando que é necessário o preenchimento de todos os campos 
And Eu continuo na página “Cadastro de promoção”