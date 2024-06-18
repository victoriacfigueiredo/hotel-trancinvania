Feature: Gestão de Método de Pagamento


Scenario: Cadastrar Metodo de Pagamento com Sucesso
    Given nenhum método de pagamento está cadastrado
    When cadastro um novo método de pagamento com os seguintes dados:
    | nome | num | CVV | validade | tipo | CPF |
    | Visa | 4111111111111111 | 123 | 07/2030 | CREDITO | 12345678909 |
    Then vejo a mensagem "Cartao Cadastrado com Sucesso"
    And vejo "Visa" na lista de métodos de pagamento



  Scenario: Alterar Metodo de Pagamento com Sucesso
    Given o método de pagamento "Visa" está cadastrado com o tipo "CREDITO"
    When altero o método de pagamento "Visa" para o tipo "DEBITO"
    Then vejo a mensagem "Metodo de Pagamento Alterado com Sucesso"
    And vejo "Visa" com o tipo "DEBITO" na lista de métodos de pagamento

  Scenario: Deletar Metodo de Pagamento com Sucesso
    Given o método de pagamento "Visa" está cadastrado
    When deleto o método de pagamento "Visa"
    Then vejo a mensagem "Metodo de pagamento Deletado com Sucesso"
    And não vejo "Visa" na lista de métodos de pagamento
