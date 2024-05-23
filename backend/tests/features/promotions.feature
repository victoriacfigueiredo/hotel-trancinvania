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

Given Eu estou logada como “Hoteleiro” com o login “Marialet”  e a senha “let123”
And Eu estou na página “Cadastro de promoção” da reserva do hotel “ Flores” com o valor da noite por “R$ 1300,00” 
When Eu preencho o campo “desconto” com “20%”
And Eu preencho o campo “promoção” com “limite de quarto”
And Tento realizar o cadastro
Then Eu vejo a mensagem indicando que é necessário o preenchimento de todos os campos 
And Eu continuo na página “Cadastro de promoção”

Scenario 3: Deletar todas as promoções

Given Eu estou logada como “Hoteleiro” com o login “Maria”  e a senha “let123”
And Eu estou na página “Reservas publicadas”
And O hotel “Flores” tem uma promoção de “30%” cadastrada com o valor promocional de “R$ 910,00” a noite
And O hotel “Campos” tem uma promoção de “20%” cadastrada com o valor promocional de “R$ 1120,00” a noite
When Eu seleciono “Deletar todas as promoções” 
Then Eu vejo uma mensagem de confirmação de remoção das promoções
And Eu vejo a  listagem de todas as reservas na página “Reservas publicadas” com seus valores originais sem desconto

Scenario 4: Cadastrar uma promoção em todas as reservas publicadas

Given Eu estou logada como “Hoteleiro” com o login “Maria”  e a senha “let123”
And Eu estou na página “Reservas publicadas”
When Eu seleciono “Cadastrar promoção em todas reservas” 
And Eu realizo o cadastro de uma promoção de “20%” de desconto e “Ilimitada”
Then Eu vejo uma mensagem de confirmação de cadastro
And Eu vejo a  listagem de todas as reservas na página “Reservas publicadas” com com a promoção cadastrada

Scenario 6: Deletar todas as promoções com nenhuma promoção cadastrada

Given Eu estou logada como “Hoteleiro” com o login “Maria”  e a senha “let123”
And Eu estou na página “Reservas publicadas”
And Não há nenhum hotel com promoção cadastrada
When Eu seleciono “Deletar todas as promoções” 
And Eu altero o desconto para “60%”
Then Eu posso ver uma mensagem de erro de que não há nenhuma promoção cadastrada
And Eu continuo na página "Reservas publicadas"

