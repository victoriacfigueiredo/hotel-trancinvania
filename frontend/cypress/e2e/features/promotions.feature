Feature: Cadastro e manutenção de promoções
As a usuário hoteleiro
I want to cadastrar, atualizar e remover as promoções nas reservas publicadas
So that eu possa gerenciar eficientemente os descontos nas reservas

Scenario: Cadastro da promoção realizado com sucesso
    Given eu estou na página "/promotions" da reserva do "Quarto Jardins" com o valor da diária por "700.00"
    When eu preencho o campo "desconto" com "20"
    And eu seleciono a promoção "Limite de Quarto"
    And eu preencho o campo "quantidade de quartos" com "2"
    And eu seleciono "confirmar"
    Then eu vejo um toast de sucesso com a mensagem "Promoção cadastrada com sucesso!"
    And eu sou redirecionado para a página "/hotelier-reservations"
    And eu vejo o "Quarto Jardins" com o valor "560.00"

# Scenario: Tentativa de cadastro da promoção com algum campo não preenchido
#     Given eu estou na página "/promotions" da reserva do "Quarto City" com o valor da diária por "1300.00"
#     When eu preencho o campo "desconto" com "20"
#     And eu seleciono a promoção "Limite de Quarto"
#     And eu seleciono "confirmar"
#     Then eu vejo um toast de erro com a mensagem "Preencha todos os campos"
#     And eu continuo na página "/promotions"

# Scenario: Tentativa de cadastro da promoção com desconto menor que 5% ou maior que 60%
#     Given eu estou na página "/promotions" da reserva do "Quarto City" com o valor da diária por "1300.00" 
#     When eu preencho o campo "desconto" com "70"
#     And eu seleciono a promoção "Ilimitada"
#     And eu seleciono "confirmar"
#     Then eu vejo um toast de erro com a mensagem "O desconto deve estar entre 5% e 60%"
#     And eu continuo na página "/promotions"

# Scenario: Deletar promoção na reserva
#     Given eu estou na página "/reservationDetails" da reserva do "Quarto Flores"
#     And o "Quarto Flores" tem uma promoção de "30" cadastrada com o valor promocional de "910.00" a diária
#     When eu seleciono "deletar-promocao"
#     Then eu vejo um toast de sucesso com a mensagem "Promoção deletada com sucesso!"
#     And eu continuo na página "/reservationDetails"
#     And eu vejo o "Quarto Flores" com o valor "1300.00"

# Scenario: Deletar promoção na resereva sem promoção cadastrada
#     Given eu estou na página "/reservationDetails" da reserva do "Quarto Flores"
#     And o "Quarto Flores" não possui nenhuma promoção cadastrada
#     When eu seleciono "deletar-promocao"
#     Then eu vejo um toast de erro com a mensagem "Não há promoção cadastrada"
#     And eu continuo na página "/reservationDetails"

# Scenario: Edição na promoção de uma reserva
#     Given eu estou na página "/reservationDetails" da reserva do "Quarto Flores"
#     And o "Quarto Flores" tem uma promoção de "20" cadastrada com o valor promocional de "1040.00" a diária
#     When eu seleciono "editar-promocao"
#     And eu preencho o campo "desconto" com "60"
#     And eu seleciono a promoção "Ilimitada"
#     And eu seleciono "confirmar"
#     Then eu vejo um toast de sucesso com a mensagem "Promoção atualizada com sucesso!"
#     And eu sou redirecionado para a página "/hotelier-reservations"
#     And eu vejo o "Quarto Flores" com o valor de "520.00"

# Scenario: Edição na promoção de uma reserva sem promoção cadastrada
#     Given eu estou na página "/reservationDetails" da reserva do "Quarto Flores"
#     And o "Quarto Flores" não possui nenhuma promoção cadastrada
#     When eu seleciono "editar-promocao"
#     And eu preencho o campo "desconto" com "60"
#     And eu preencho o campo promoção com "ilimitada"
#     And eu seleciono confirmar
#     Then eu vejo um toast de erro com a mensagem "Não há promoção cadastrada"
#     And eu continuo na página "/promotions"

# Scenario: Deletar todas as promoções
#     Given eu estou na página "/hotelier-reservations"
#     And o "Quarto Flores" tem uma promoção de "30" cadastrada com o valor promocional de "910.00" a diária
#     And o "Quarto Campos" tem uma promoção de "20" cadastrada com o valor promocional de "1120.00" a diária
#     When eu seleciono "deletar-promocoes" 
#     Then eu vejo um toast de sucesso com a mensagem "Promoções deletadas com sucesso!"
#     And eu vejo o "Quarto Flores" com o valor de "1300.00"
#     And eu vejo o "Quarto Campos" com o valor de "1400.00"

# Scenario: Cadastrar uma promoção em todas as reservas publicadas
#     Given eu estou na página "/hotelier-reservations"
#     And o quarto "Flores" está nas reservas publicadas com o valor de "1300.00" a diária
#     And o quarto "Jardins" está nas reservas publicadas com o valor de "1500.00" a diária
#     And o quarto "Campos" está nas reservas publicadas com o valor de "1400.00" a diária
#     When eu seleciono "cadastrar-promocao" 
#     And eu preencho o campo "desconto" com "10"
#     And eu seleciono "confirmar"
#     Then eu vejo um toast de sucesso com a mensagem "Promoção cadastrada com sucesso!"
#     And eu vejo o "Quarto Flores" com o valor de "1040.00" 
#     And eu vejo o "Quarto Flores" com o valor de "1200.00" 
#     And eu vejo o " Quarto Campos" com o valor de "1120.00"

# Scenario: Deletar todas as promoções com nenhuma promoção cadastrada
#     Given eu estou na página "/hotelier-reservations"
#     And Não há nenhuma promoção cadastrada
#     When eu seleciono "deletar-promocoes"
#     Then eu vejo um toast de erro com a mensagem "Nenhuma Promoção encontrada"
#     And eu continuo na página "/hotelier-reservations"

