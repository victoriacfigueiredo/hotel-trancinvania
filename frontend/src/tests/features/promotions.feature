Feature: Cadastro e manutenção de promoções
As a usuário hoteleiro
I want to cadastrar, atualizar e remover as promoções nas reservas publicadas
So that Eu possa gerenciar eficientemente os descontos nas reservas

Scenario: Cadastro da promoção realizado com sucesso
    Given Eu estou logada como "Hoteleiro" do hotel "Encantado" com o e-mail "mleticiagaspar17@gmail.com" e a senha "let123"
    And Eu estou na página "/promotions" da reserva do quarto "Flores" com o valor da diária por "R$ 1300,00"
    When Eu preencho o campo "desconto" com "20%"
    And Eu preencho o campo "promoção" com "limite de quarto"
    And Eu preencho o campo "quantidade de quartos" com "2"
    And Tento realizar o cadastro
    Then Eu vejo a mensagem "Promoção cadastrada com sucesso!"
    And Eu sou redirecionado para a página "/publishedReservationList"
    And Eu vejo a promoção no quarto "Flores" com o valor atualizado para "R$ 1040,00"

Scenario: Tentativa de cadastro da promoção com algum campo não preenchido
    Given Eu estou logada como "Hoteleiro" do hotel "Encantado" com o e-mail "mleticiagaspar17@gmail.com" e a senha "let123"
    And Eu estou na página "/promotions" da reserva do quarto "Flores" com o valor da diária por "R$ 1300,00" 
    When Eu preencho o campo "desconto" com "20%"
    And Eu preencho o campo "promoção" com "limite de quarto"
    And Tento realizar o cadastro
    Then Eu vejo a mensagem "Preencha todos os campos"
    And Eu continuo na página "/promotions"

Scenario: Tentativa de cadastro da promoção com desconto menor que 5% ou maior que 60%
    Given Eu estou logada como "Hoteleiro" do hotel "Encantado" com o e-mail "mleticiagaspar17@gmail.com" e a senha "let123"
    And Eu estou na página "/promotions" da reserva do quarto "Flores" com o valor da diária por "R$ 1300,00" 
    When Eu preencho o campo "desconto" com "70%"
    And Eu preencho o campo "promoção" com "ilimitada"
    And Tento realizar o cadastro
    Then Eu vejo a mensagem "O desconto deve estar entre 5% e 60%"
    And Eu continuo na página "/promotions"

Scenario: Deletar promoção na reserva
    Given Eu estou logada como "Hoteleiro" do hotel "Encantado" com o e-mail "mleticiagaspar17@gmail.com" e a senha "let123"
    And Eu estou na página "/publishedReservationDetails"
    And O quarto "Flores" tem uma promoção de "30%" cadastrada com o valor promocional de "R$ 910,00" a diária
    When Eu seleciono "Deletar promoção"
    Then Eu vejo a mensagem "Promoção deletada com sucesso!"
    And Eu continuo na página "/publishedReservationDetails"
    And Eu vejo o quarto "Flores" com seu valor original "R$ 1300,00" a diária

Scenario: Deletar promoção na resereva sem promoção cadastrada
    Given Eu estou logada como "Hoteleiro" do hotel "Encantado" com o e-mail "mleticiagaspar17@gmail.com" e a senha "let123"
    And Eu estou na página "/publishedReservationDetails"
    And O quarto "Flores" tem uma promoção de "30%" cadastrada com o valor promocional de "R$ 910,00" a diária
    When Eu seleciono "Deletar promoção"
    Then Eu vejo a mensagem "Não há promoção cadastrada"
    And Eu continuo na página "/publishedReservationDetails"

Scenario: Edição na promoção de uma reserva
    Given Eu estou logada como "Hoteleiro" do hotel "Encantado" com o e-mail "mleticiagaspar17@gmail.com" e a senha "let123"
    And Eu estou na página "/publishedReservationDetails"
    And O quarto "Flores" está com uma promoção de "20%" cadastrada com o valor promocional de "R$ 1040,00"
    When Eu seleciono "Editar promoção" no quarto "Flores"
    And Eu preencho o campo desconto com "60%"
    And Eu preencho o campo promoção com "ilimitada"
    Then Eu vejo a mensagem "Promoção atualizada com sucesso!"
    And Eu sou redirecionado para a página "/publishedReservationList"
    And Eu vejo a nova promoção no quarto "Flores" com o valor da diária atualizado para "R$ 520,00"

Scenario: Edição na promoção de uma reserva sem promoção cadastrada
    Given Eu estou logada como "Hoteleiro" do hotel "Encantado" com o e-mail "mleticiagaspar17@gmail.com" e a senha "let123"
    And Eu estou na página "/publishedReservationDetails"
    And O quarto "Flores" está com uma promoção de "20%" cadastrada com o valor promocional de "R$ 1040,00"
    When Eu seleciono "Editar promoção" no quarto "Flores"
    And Eu preencho o campo desconto com "60%"
    And Eu preencho o campo promoção com "ilimitada"
    And Eu seleciono confirmar
    Then Eu vejo a mensagem "Não há promoção cadastrada"
    And Eu continuo na página ""

Scenario: Deletar todas as promoções
    Given Eu estou logada como "Hoteleiro" do hotel "Encantado" com o e-mail "mleticiagaspar17@gmail.com" e a senha "let123"
    And Eu estou na página "/publishedReservationList"
    And O quarto "Flores" tem uma promoção de "30%" cadastrada com o valor promocional de "R$ 910,00" a diária
    And O quarto "Campos" tem uma promoção de "20%" cadastrada com o valor promocional de "R$ 1120,00" a diária
    And O quarto "Jardins" não possui nenhuma promoção
    When Eu seleciono "Deletar Promoções" 
    Then Eu vejo a mensagem "Promoções deletadas com sucesso!"
    And Eu vejo o quarto "Flores" com seu valor original "R$ 1300,00" a diária
    And Eu vejo o quarto "Campos" com seu valor original "R$ 1400,00" a diária
    And O quarto "Jardins" permanece com seu valor original de "R$ 1500,00" a diária

Scenario: Cadastrar uma promoção em todas as reservas publicadas
    Given Eu estou logada como "Hoteleiro" do hotel "Encantado" com o e-mail "mleticiagaspar17@gmail.com" e a senha "let123"
    And Eu estou na página "/publishedReservationList"
    And O quarto "Flores" está nas reservas publicadas com o valor de "R$ 1300,00" a diária
    And O quarto "Jardins" está nas reservas publicadas com o valor de "R$ 1500,00" a diária
    And O quarto "Campos" está nas reservas publicadas com o valor de "R$ 1400,00" a diária
    When Eu seleciono "Cadastrar Promoção" 
    And Eu preencho o campo "desconto" com "10%"
    Then Eu vejo a mensagem "Promoção cadastrada com sucesso!"
    And Eu vejo o quarto "Flores" com o valor atualizado para "R$ 1040,00" a diária
    And Eu vejo o quarto "Jardins" com o valor atualizado para "R$ 1200,00" a diária
    And Eu vejo o quarto "Campos" com o valor atualizado para "R$ 1120,00" a diária

Scenario: Deletar todas as promoções com nenhuma promoção cadastrada
    Given Eu estou logada como "Hoteleiro" do hotel "Encantado" com o e-mail "mleticiagaspar17@gmail.com" e a senha "let123"
    And Eu estou na página "/publishedReservationList"
    And Não há nenhum quarto com promoção cadastrada
    When Eu seleciono "Deletar Promoções" 
    Then Eu vejo a mensagem "Nenhuma Promoção encontrada"
    And Eu continuo na página "/publishedReservationList"

