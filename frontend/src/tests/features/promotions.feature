Feature: Cadastro e manutenção de promoções
As a usuário hoteleiro
I want to cadastrar, atualizar e remover as promoções nas reservas publicadas
So that Eu possa gerenciar eficientemente os descontos nas reservas

Scenario: Cadastro da promoção realizado com sucesso
    Given Eu estou logada como "Hoteleiro" do hotel "Encantado" com o e-mail "mleticiagaspar17@gmail.com" e a senha "let123"
    And Eu estou na página "Cadastro de promoção" da reserva do quarto "Flores" com o valor da diária por "R$ 1300,00"
    When Eu preencho o campo "desconto" com "20%"
    And Eu preencho o campo "promoção" com "limite de quarto"
    And Eu preencho o campo "quantidade de quartos" com "2"
    And Tento realizar o cadastro
    Then Eu vejo a mensagem "Promoção cadastrada com sucesso!"
    And Eu vejo a promoção no quarto "Flores" na página "reservas publicadas" com o valor atualizado para "R$ 1040,00"

Scenario: Tentativa de cadastro da promoção com algum campo não preenchido
    Given Eu estou logada como "Hoteleiro" do hotel "Encantado" com o e-mail "mleticiagaspar17@gmail.com" e a senha "let123"
    And Eu estou na página "Cadastro de promoção" da reserva do quarto "Flores" com o valor da diária por "R$ 1300,00" 
    When Eu preencho o campo "desconto" com "20%"
    And Eu preencho o campo "promoção" com "limite de quarto"
    And Tento realizar o cadastro
    Then Eu vejo a mensagem "Preencha todos os campos"
    And Eu continuo na página "Cadastro de promoção"

Scenario: Deletar promoção na reserva
    Given Eu estou logada como "Hoteleiro" do hotel "Encantado" com o e-mail "mleticiagaspar17@gmail.com" e a senha "let123"
    And Eu estou na página "Reservas publicadas"
    And O quarto "Flores" tem uma promoção de "30%" cadastrada com o valor promocional de "R$ 910,00" a diária
    When Eu seleciono "Deletar promoção"
    Then Eu vejo a mensagem "Promoção deletada com sucesso!"
    And Eu vejo o quarto "Flores" com seu valor original "R$ 1300,00" a diária

Scenario: Edição na promoção de uma reserva
    Given Eu estou logada como "Hoteleiro" do hotel "Encantado" com o e-mail "mleticiagaspar17@gmail.com" e a senha "let123"
    And Eu estou na página "Reservas publicadas"
    And O quarto "Flores" está com uma promoção de "20%" cadastrada com o valor promocional de "R$ 1040,00"
    When Eu seleciono "Editar promoção" no quarto "Flores"
    And Eu altero o desconto para "60%"
    Then Eu vejo a mensagem "Promoção editada com sucesso!"
    And Eu vejo a nova promoção no quarto "Flores" com o valor da diária atualizado para "R$ 520,00" na página "Reservas publicadas" 

Scenario: Deletar todas as promoções
    Given Eu estou logada como "Hoteleiro" do hotel "Encantado" com o e-mail "mleticiagaspar17@gmail.com" e a senha "let123"
    And Eu estou na página "Reservas publicadas"
    And O quarto "Flores" tem uma promoção de "30%" cadastrada com o valor promocional de "R$ 910,00" a diária
    And O quarto "Campos" tem uma promoção de "20%" cadastrada com o valor promocional de "R$ 1120,00" a diária
    And O quarto "Jardins" não possui nenhuma promoção
    When Eu seleciono "Deletar todas as promoções" 
    Then Eu vejo a mensagem "Todas as promoções foram deletadas com sucesso!"
    And Eu vejo o quarto "Flores" com seu valor original "R$ 1300,00" a diária
    And Eu vejo o quarto "Campos" com seu valor original "R$ 1400,00" a diária
    And O quarto "Jardins" permanece com seu valor original de "R$ 1500,00" a diária

Scenario: Cadastrar uma promoção em todas as reservas publicadas
    Given Eu estou logada como "Hoteleiro" do hotel "Encantado" com o e-mail "mleticiagaspar17@gmail.com" e a senha "let123"
    And Eu estou na página "Reservas publicadas"
    And O quarto "Flores" está nas reservas publicadas com o valor de "R$ 1300,00" a diária
    And O quarto "Jardins" está nas reservas publicadas com o valor de "R$ 1500,00" a diária
    And O quarto "Campos" está nas reservas publicadas com o valor de "R$ 1400,00" a diária
    When Eu seleciono "Cadastrar promoção em todas reservas" 
    And Eu realizo o cadastro de uma promoção de "20%" de desconto e "Ilimitada"
    Then Eu vejo a mensagem "A promoção foi cadastrada em todas as reservas com sucesso!"
    And Eu vejo o quarto "Flores" com o valor atualizado para "R$ 1040,00" a diária
    And Eu vejo o quarto "Jardins" com o valor atualizado para "R$ 1200,00" a diária
    And Eu vejo o quarto "Campos" com o valor atualizado para "R$ 1120,00" a diária

Scenario: Deletar todas as promoções com nenhuma promoção cadastrada
    Given Eu estou logada como "Hoteleiro" do hotel "Encantado" com o e-mail "mleticiagaspar17@gmail.com" e a senha "let123"
    And Eu estou na página "Reservas publicadas"
    And Não há nenhum quarto com promoção cadastrada
    When Eu seleciono "Deletar todas as promoções" 
    Then Eu vejo a mensagem "Promoção não encontrada"
    And Eu continuo na página "Reservas publicadas"