Feature: Cadastro e Manutenção de Métodos de Pagamento
Como um Usuário Cliente
Eu quero cadastrar, alterar e excluir métodos de pagamento
Para que eu possa realizar pagamentos com métodos diferentes

Scenario 1: Cadastrar Método de pagamento com sucesso
  Given que estou logado como usuário “Cliente” com login “Matheus” e senha “123”
  and estou na página “Meus Métodos de Pagamento”
  and nenhum método de pagamento está cadastrado
  When seleciono a opção “Cadastrar novo método de pagamento”
  and preencho o campo “nome” com “Cartão Itaú”
  and preencho o campo “número cartão” com “1234 5678 9123 4567”
  and preencho o campo “cvv” com “123”
  and preencho o campo "data de validade" com "07/2030"
  and seleciono o campo “Tipo” com “DEBITO”
  and preencho o campo "cpf" com "12345678909"
  Then tento realizar o cadastro
  and vejo a mensagem “Cartão cadastrado com sucesso!”
  and vejo “Cartão Itaú” na página “Meus Métodos de Pagamento”

Scenario 2: Tentativa de Cadastro de Método de pagamento já cadastrado
  Given que estou logado como usuário “Cliente” com login “Matheus” e senha “123”
  and estou na página “Meus Métodos de Pagamento”
  and o método de pagamento “Cartão Itaú” está cadastrado com o campo “Tipo” com o valor “débito”
  When seleciono a opção “Cadastrar novo método de Pagamento”
  and preencho o campo “nome titular” com “Matheus Silva”
  and preencho o campo “número cartão” com “1234 5678 9123 4567”
  and preencho o campo "data de validade" com "07-2030"
  and preencho o campo “cvc” com “123”
  and seleciono o campo “Tipo” com “débito”
  and preencho o campo “apelido” com “Cartão Itaú”
  Then tento realizar o cadastro
  and vejo a mensagem “Cartão já Cadastrado!”
  and vejo “Cartão Itaú” na página “Meus Métodos de Pagamento”

Scenario 3: Tentativa de Cadastrar Método de pagamento com informações insuficientes
  Given que estou logado como usuário “Cliente” com login “Matheus” e senha “123”
  and estou na página “Meus Métodos de Pagamento”
  and o método de pagamento “Cartão Itaú” não está cadastrado
  When seleciono a opção “Cadastrar novo método de pagamento”
  and preencho o campo “nome titular” com “Matheus Silva”
  and preencho o campo “número cartão” com “1234 5678 9123 4567”
  and seleciono o campo “Tipo” com “débito”
  and preencho o campo “apelido” com “Cartão Itaú”
  Then tento realizar o cadastro
  and vejo a mensagem “Campos não foram totalmente preenchidos”
  and continuo o cadastro do método de pagamento

Scenario 4: Alterar método de pagamento com sucesso
  Given que estou logado como usuário “Cliente” com login “Matheus” e senha “123”
  and estou na página “Meus Métodos de Pagamento”
  and o método de pagamento “Cartão Itaú” está cadastrado com o campo “Tipo” com o valor “débito”
  When seleciono a opção “Alterar” no método de pagamento “Cartão Itaú”
  and seleciono o campo “Tipo” com “crédito”
  Then tento realizar a atualização
  and vejo a mensagem “‘Cartão Itaú’ alterado com Sucesso!”
  and vejo “Cartão Itaú” na página “Meus Métodos de Pagamento” com o “Tipo” “Crédito”

Scenario 5: Tentativa de Alterar método de pagamento com informação em Branco
  Given que estou logado como usuário “Cliente” com login “Matheus” e senha “123”
  and estou na página “Meus Métodos de Pagamento”
  and o método de pagamento “Cartão Itaú” está cadastrado e o campo “cvc” com valor “123”
  When seleciono a opção “Alterar” no método de pagamento “Cartão Itaú”
  and preencho o campo “cvc” com "123"
  Then tento realizar o cadastro
  and vejo a mensagem “Campos não foram totalmente preenchidos”
  and continuo a alteração do método de pagamento

Scenario 6: Deletar método de pagamento com sucesso
  Given que estou logado como usuário “Cliente” com login “Matheus” e senha “123”
  and estou na página “Meus Métodos de Pagamento”
  and o método de pagamento “Cartão Itaú” está cadastrado
  When seleciono a opção “Deletar” no método de pagamento “Cartão Itaú”
  Then vejo a mensagem “Deseja deletar método de pagamento?”
  and seleciono a opção “sim”
  and vejo a mensagem “Método de pagamento Deletado com Sucesso!”

Scenario 7: Desistência de exclusão de método de pagamento
  Given que estou logado como usuário “Cliente” com login “Matheus” e senha “123”
  and estou na página “Meus Métodos de Pagamento”
  and o método de pagamento “Cartão Itaú” está cadastrado
  When seleciono a opção “Deletar” no método de pagamento “Cartão Itaú”
  Then vejo a mensagem “Deseja deletar método de pagamento?”
  and seleciono a opção “não”
  and continuo na página “Meus Métodos de Pagamento” com o cartão "Cartão Itaú" cadastrado

Scenario 8: Desistência de exclusão de método de pagamento
  Given que estou logado como usuário “Cliente” com login “Matheus” e senha “123”
  and estou na página “Meus Métodos de Pagamento”
  and o método de pagamento “Cartão Itaú” está cadastrado
  When seleciono a opção “Deletar” no método de pagamento “Cartão Itaú”
  Then vejo a mensagem “Deseja deletar método de pagamento?”
  and seleciono a opção “não”
  and continuo na página “Meus Métodos de Pagamento”
