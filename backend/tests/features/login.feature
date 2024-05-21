Feature: Realizar Login
  As a Usuário "Hoteleiro" ou "Cliente"
  I want to realizar o login no sistema 
  So that eu possa realizar ações no sistema de acordo com meu tipo de usuário

Scenario: Login Bem-Sucedido
  Given Eu estou na página de “Login”
  And Eu estou cadastrado no Sistema com o “Nome de Usuário”  “barbaralencar”
  And a “Senha” “@AmoBolo123”
  When Eu preencho o campo “Nome de Usuário”  com “barbaralencar”
  And eu preencho o campo “Senha” com “@AmoBolo123”
  Then Eu vejo uma mensagem de confirmação “Login Realizado com Sucesso”
  And fico logado no sistema

Scenario: Login Mal-Sucedido por Senha Incorreta
  Given Eu estou na página de “Login”
  And Eu estou cadastrado no Sistema com o “Nome de Usuário”  “barbaralencar”
  And a “Senha” “@AmoBolo123”
  When Eu preencho o campo “Nome de Usuário”  com “barbaralencar”
  And eu preencho o campo “Senha” com “abacateverde”
  Then Eu vejo uma mensagem de erro “Login ou Senha não correspondem”.
  And continuo na página de "Login"

Scenario: Login Mal-Sucedido por Usuário não-cadastrado
  Given Eu estou na página de “Login”
  And Não há “Nome de Usuário” “barbaralencar” cadastrado no sistema
  When Eu preencho o campo “Nome de Usuário”  com “barbaralencar”
  And eu preencho o campo “Senha” com “abacateverde”
  Then Eu vejo uma mensagem de erro “Usuário não existe no Sistema”.
  And continuo na página de Login

Scenario: Login Mal-Sucedido por Campo em Branco
  Given Eu estou na página de “Login”
  And Eu estou cadastrado no Sistema com o “Nome de Usuário”  com “barbaralencar”
  And a “Senha” “@AmoBolo123”
  When Eu preencho o campo  “Nome de Usuário”  com “barbaralencar”
  And eu preencho o campo “Senha” com “”
  Then Eu vejo uma mensagem de erro “Preencha todos os campos obrigatórios”.
  And continuo na página de Login

