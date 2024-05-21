Feature: Disparo de email para usuários com comprovante de pedido
As a usuário “cliente”
I want to Receber e-mails de confirmação, edição e cancelamento da reserva
So that eu possa ter uma confirmação escrita das minhas transações e atualizações importantes da minha reserva 

Scenario 1:  Finalização da reserva com sucesso
Given Eu estou logada como “cliente” com login “lorena” e a senha “lory123”
And Eu estou na página “Realizar reserva” do hotel “Flores”
When Eu realizo a reserva
Then Eu vejo uma mensagem de confirmação
And  Eu recebo o e-mail de confirmação contendo os detalhes da reserva

Scenario 2: Cancelamento da reserva  
Given Eu estou logada como “cliente” com login “lorena” e a senha “lory123”
And Eu estou na página “Minhas reservas” 
And O hotel “Flores”  está na listagem das minhas reservas
When Eu cancelo a reserva do hotel “Flores”
Then Eu vejo uma mensagem de confirmação de cancelamento
And Eu recebo o e-mail de confirmação do cancelamento contendo o nome do hotel e o valor que será devolvido

Scenario 3: Edição da reserva  
Given Eu estou logada como “cliente” com login “lorena” e a senha “lory123”
And Eu estou na página “Minhas reservas” 
And O hotel “Flores”  está na listagem das minhas reservas
When Eu realizo alterações na reserva do hotel “Flores”
Then Eu vejo uma mensagem de confirmação
And Eu recebo o e-mail de confirmação das alterações contendo os detalhes da reserva e os campos alterados
