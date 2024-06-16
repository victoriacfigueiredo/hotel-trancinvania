Feature: Realização de reserva
As a usuário cliente
I want to realizar uma reserva em um hotel
So that eu possa garantir minha estadia no hotel desejado

Scenario 1: Tentativa de realização de reserva sem estar logado
Given que não estou logado
And estou na página "Quarto Zumbi Digital"
When eu preencho o campo "check-in" com "2024-07-22"
And preencho o campo "check-out" com "2024-07-26"
And preencho o campo "quantidade de quartos" com "1" 
And preencho o campo "quantidade de adultos" com "2" 
And preencho o campo "quantidade de crianças" com "0" 
And tento realizar a reserva
Then posso ver uma mensagem "Você precisa estar logado para fazer uma reserva"
And sou redirecionado para a página "Login"

Scenario 2: Tentativa de realização de reserva sem o preenchimento de todos os dados obrigatórios
Given que estou logado como "Cliente" com email "vic@gmail.com" e senha "123456"
And estou na página "Quarto Zumbi Digital"
When eu preencho o campo "check-in" com "2024-07-22"
And preencho o campo "check-out" com "2024-07-26"
And tento realizar a reserva
Then posso ver uma mensagem "É necessário preencher todos os campos"
And continuo na página "Quarto Zumbi Digital"

Scenario 3: Tentativa de realização de reserva sem método de pagamento cadastrado 
Given que estou logado como "Cliente" com email "vic@gmail.com" e senha "123456"
And não possuo nenhum método de pagamento cadastrado 
And estou na página "Quarto Zumbi Digital" 
When eu preencho o campo "check-in" com "2024-07-22"
And preencho o campo "check-out" com "2024-07-26"
And preencho o campo "quantidade de quartos" com "2"
And preencho o campo "quantidade de adultos" com "1"
And preencho o campo "quantidade de crianças" com "0"
And tento preencher o campo "método de pagamento"
Then posso ver uma mensagem "É necessário cadastrar um método de pagamento"
And sou redirecionado para a página "Métodos de Pagamento"

Scenario 4: Quantidade de hóspedes selecionados excede capacidade do quarto 
Given que estou logado como "Cliente" com email "vic@gmail.com" e senha "123456"
And estou na página "Quarto Zumbi Digital"
And o quarto "Quarto Zumbi Digital" acomoda até "2" hóspedes
When eu preencho o campo "check-in" com "2024-07-22"
And preencho o campo "check-out" com "2024-07-26"
And preencho o campo "quantidade de quartos" com "1"
And preencho o campo "quantidade de adultos" com "2" 
And preencho o campo "quantidade de crianças" com "3" 
And preencho o campo "método de pagamento" com "cartão de crédito 1"
And tento realizar a reserva
Then posso ver uma mensagem "O limite de hóspedes por quarto foi excedido"
And continuo na página "Quarto Zumbi Digital"

Scenario 5: Não há quartos disponíveis para o período selecionado
Given que estou logado como "Cliente" com email "vic@gmail.com" e senha "123456"
And estou na página "Quarto Zumbi Digital"
And o quarto "Quarto Zumbi Digital" possui "quantidade" igual a "20"
And existem "20" quartos reservados do tipo "Quarto Zumbi Digital" no período de "2024-07-22" a "2024-07-26"When eu preencho o campo "check-in" com "2024-07-22"
And preencho o campo "check-out" com "2024-07-26"
And preencho o campo "quantidade de quartos" com "1"
And preencho o campo "quantidade de adultos" com "1" 
And preencho o campo "quantidade de crianças" com "2" 
And tento realizar a reserva
Then posso ver uma mensagem "Não há quartos suficientes disponíveis nesse período para realizar a reserva"
And continuo na página "Quarto Zumbi Digital"

Scenario 6: Reserva realizada com sucesso utilizando método de pagamento cadastrado
Given que estou logado como "Cliente" com email "vic@gmail.com" e senha "123456"
And possuo apenas o método de pagamento "cartão de crédito 1" cadastrado
And estou na página "Quarto Zumbi Digital"
And o quarto "Quarto Zumbi Digital" possui "quantidade" igual a "20"
And existem "10" quartos reservados do tipo "Quarto Zumbi Digital" no período de "2024-07-22" a "2024-07-26"
When eu preencho o campo "check-in" com "2024-07-22"
And preencho o campo "check-out" com "2024-07-26"
And preencho o campo "quantidade de quartos" com "2"
And preencho o campo "quantidade de adultos" com "2" 
And preencho o campo "quantidade de crianças" com "0"
And preencho o campo "método de pagamento" com "Cartão de Crédito 1"
And eu tento realizar a reserva
Then posso ver uma mensagem "Reserva realizada com sucesso"
And sou redirecionado para página "Minhas reservas"
And o quarto "Quarto Zumbi Digital" possui "quantidade" igual a "20"
And existem "12" quartos reservados do tipo "Quarto Zumbi Digital" no período de "2024-07-22" a "2024-07-26"

