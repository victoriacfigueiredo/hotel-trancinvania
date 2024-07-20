Feature: GestÃ£o de MÃ©todo de Pagamento

  Scenario: Cadastrar Metodo de Pagamento com Sucesso
    Given nenhum metodo de pagamento esta cadastrado
    When cadastro um novo metodo de pagamento com nome "Visa", numCard "4111111111111111", cvv "123", validade "07/2023", tipo "CREDITO", cpf "12345678990"
    Then vejo a mensagem "Cartao Cadastrado com Sucesso"
    And vejo "Visa" na lista de mÃ©todos de pagamento

  Scenario: Alterar Metodo de Pagamento com Sucesso
    Given o mÃ©todo de pagamento "Visa" estÃ¡ cadastrado com o tipo "CREDITO"
    When altero o mÃ©todo de pagamento "Visa" para o tipo "DEBITO"
    Then vejo a mensagem "Metodo de Pagamento Alterado com Sucesso"
    And vejo "Visa" com o tipo "DEBITO" na lista de mÃ©todos de pagamento

  Scenario: Deletar Metodo de Pagamento com Sucesso
    Given o mÃ©todo de pagamento "Visa" estÃ¡ cadastrado
    When deleto o mÃ©todo de pagamento "Visa"
    Then vejo a mensagem "Metodo de pagamento Deletado com Sucesso"
    And nÃ£o vejo "Visa" na lista de mÃ©todos de pagamento

  Scenario: Tentativa de Cadastro de MÃ©todo de pagamento jÃ¡ cadastrado
    Given o mÃ©todo de pagamento "CartÃ£o itaÃº" estÃ¡ cadastrado com numCard "1234567891234567", cvv "234", validade "08/2023", tipo "DEBITO", cpf "12345678990"
    When cadastro um novo metodo de pagamento com nome "CartÃ£o itaÃº", numCard "1234567891234567", cvv "234", validade "08/2023", tipo "DEBITO", cpf "12345678990"
    Then vejo a mensagem "Erro no Cadastro de Metodo de Pagamento"
    And vejo "CartÃ£o itaÃº" na lista de mÃ©todos de pagamento

