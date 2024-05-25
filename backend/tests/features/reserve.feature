Feature: Realização de reserva
As a usuário cliente
I want to realizar uma reserva em um hotel
So that eu possa garantir minha estadia no hotel desejado

Scenario: Tentativa de realização de reserva sem estar logado
Given que não estou logado
And estou na página "Manaíra Hotel"
When eu preencho o campo "check-in" com "22/07/2024"
And preencho o campo "check-out" com "26/07/2024"
And preencho o campo "quantidade de quartos" com "1" 
And preencho o campo "quantidade de adultos" com "2" em "quarto 1"
And preencho o campo "quantidade de crianças" com "0" em "quarto 1"
And tento realizar a reserva
Then posso ver uma mensagem "Você precisa estar logado para fazer uma reserva"
And sou redirecionado para a página "Login"

Scenario: Tentativa de realização de reserva sem o preenchimento de todos os dados obrigatórios
Given que estou logado como "Cliente" com login "victoria" e senha "123456"
And estou na página "Manaíra Hotel"
When eu preencho o campo "check-in" com "22/07/2024"
And preencho o campo "check-out" com "26/07/2024"
And tento realizar a reserva
Then posso ver uma mensagem "É necessário preencher todos os campos"
And continuo na página "Manaíra Hotel"

Scenario: Tentativa sem sucesso de reserva sem método de pagamento cadastrado
Given que estou logado como "Cliente" com login "victoria" e senha "123456"
And eu não tenho um método de pagamento cadastrado
And estou na página "Manaíra Hotel"
And o campo "check-in" está preenchido com "22/07/2024"
And o campo "check-out" está preenchido com "26/07/2024"
And o campo "quantidade de quartos" está preenchido com "1" 
And o campo "quantidade de adultos" está preenchido com "2" em "quarto 1"
And o campo “quantidade de crianças” está preenchido com "0" em "quarto 1"
When eu tento reservar o quarto "Suíte premium, 1 cama King, vista para o mar" 
And preencho o campo "nome" com "Victoria Cesar"
And preencho o campo "CPF" com  "123.456.789"
And preencho o campo "número do cartão" com  "1111 2222 3333 4444"
And preencho o campo "data de vencimento" com  "01/28"
And preencho o campo "CVV" com "661"
And preencho o campo "tipo de cartão" com "crédito"
And preencho o campo "quantidade de parcelas" com "12"
And tento finalizar a reserva 
Then posso ver uma mensagem "Dados ausentes ou incorretos"
And continuo na página "Manaíra Hotel"