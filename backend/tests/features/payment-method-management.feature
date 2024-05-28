Feature: Cadastro e Manutenção de Métodos de Pagamento
As a Usuário Cliente
I want to Cadastrar, alterar e excluir métodos de pagamento
So that Eu posso realizar pagamentos com métodos diferentes 


Scenario 1: Cadastrar Método de pagamento com sucesso
  Given eu estou logado como usuário “Cliente” com login “Matheus” e senha “123”
  and eu estou na página “Meus Métodos de Pagamento”
  and nenhum método de pagamento está cadastrado 
  When eu seleciono a opção “Cadastrar novo método de pagamento”
  and eu preencho o campo “nome titular” com “Matheus silva”
  and eu preencho campo “número cartão” com “1234 5678 9123 4567” 
  and eu preencho o campo “cvc” com “123”
  and eu seleciono o campo  “Tipo” com “débito” 
  and eu preencho o campo “apelido” com “Cartão Itaú”
  Then eu tento realizar o cadastro
  and eu vejo a mensagem “Cartão cadastrado com sucesso!”
  and eu vejo “Cartão itaú”  na página “Meus Métodos de Pagamento”
	
Scenario 2: Tentativa de Cadastro de Método de pagamento  já cadastrado
  Given eu estou logado como usuário “Cliente” com login “Matheus” e senha “123”
  and eu estou na página “Meus Métodos de Pagamento”
  and o método de pagamento “Cartão itaú” está cadastrado com o campo “Tipo” com o valor “débito”
  When eu seleciono a opção “Cadastrar novo método de Pagamento” 
  and eu preencho o campo “nome titular” com “Matheus silva”
  and eu preencho campo “número cartão” com “1234 5678 9123 4567” 	
  and eu preencho o campo "data de validade" com "07-2030"
  and eu preencho o campo “cvc” com “123”
  and eu seleciono o campo  “Tipo” com “débito” 
  and eu preencho o campo “apelido” com “Cartão Itaú”
  Then eu tento realizar o cadastro
  and eu vejo a mensagem “Cartão já Cadastrado!”
  and eu vejo “Cartão itaú”  na página “Meus Métodos de Pagamento”

Scenario 3: Tentativa de Cadastrar Método de pagamento com informações insuficientes
  Given eu estou logado como usuário “Cliente” com login “Matheus” e senha “123”
  and eu estou na página “Meus Métodos de Pagamento”
  and o método de pagamento “Cartão itaú” não está cadastrado
  When eu seleciono a opção “Cadastrar novo método de pagamento” 
  and eu preencho o campo “nome titular” com “Matheus silva”
  and eu preencho campo “número cartão” com “1234 5678 9123 4567” 
  and eu seleciono o campo  “Tipo” com “débito” 
  and eu preencho o campo “apelido” com “Cartão Itaú”
  Then eu tento realizar o cadastro
  and eu vejo a mensagem “Campos não foram totalmente preenchidos”
  and eu continuo o cadastro do método de pagamento

Scenario 4: Alterar método de pagamento com sucesso
  Given eu estou logado como usuário “Cliente” com login “Matheus” e senha “123”
  and eu estou na página “Meus Métodos de Pagamento”
  and o método de pagamento “Cartão itaú” está cadastrado com Campo “Tipo” com o valor  “débito”
  When eu seleciono a opção “Alterar” no método de pagamento “Cartão itaú”
  and eu seleciono o campo  “Tipo” com “crédito” 
  Then eu tento realizar a atualização
  and eu vejo a mensagem “‘Cartão Itaú’ alterado com Sucesso!”
  and eu vejo “Cartão itaú”  na página “Meus Métodos de Pagamento” com o “Tipo” “Crédito”

Scenario 5:  Tentativa de Alterar método de pagamento com informação em Branco
  Given eu estou logado como usuário “Cliente” com login “Matheus” e senha “123”
  and eu estou na página “Meus Métodos de Pagamento”
  and o método de pagamento “Cartão itaú” está cadastrado e o campo “cvc” com valor “123”
  When eu seleciono a opção “Alterar” no método de pagamento “Cartão itaú”
  and eu preencho  o campo  “cvc” com “   ” 
  Then eu tento realizar o cadastro
  and eu vejo a mensagem “Campos não foram totalmente preenchidos”
  and eu continuo a alteração do método de pagamento

Scenario 6: Deletar método de pagamento com sucesso
  Given eu estou logado como usuário “Cliente” com login “Matheus” e senha “123”
  and eu estou na página “Meus Métodos de Pagamento”
  and o método de pagamento “Cartão itaú” está cadastrado 
  When eu seleciono a opção “Deletar” no método de pagamento “Cartão itaú”
  Then eu vejo a mensagem “Deseja deletar método de pagamento?”
  and eu seleciono a opção “sim”
  and eu vejo a mensagem “Método de pagamento Deletado  com Sucesso!”
	
Scenario 7: Desistência de exclusão de método de pagamento
  Given eu estou logado como usuário “Cliente” com login “Matheus” e senha “123”
  and eu estou na página “Meus Métodos de Pagamento”
  and o método de pagamento “Cartão itaú” está cadastrado 
  When eu seleciono a opção “Deletar” no método de pagamento “Cartão itaú”
  Then eu vejo a mensagem “Deseja deletar método de pagamento?”
  and eu seleciono a opção “não”
  and eu continuo na página “Meus Métodos de Pagamento”