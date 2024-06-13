Feature: Cadastro e manutenção de promoções
As a usuário hoteleiro
I want to cadastrar, atualizar e remover as promoções nas reservas publicadas
So that Eu possa gerenciar eficientemente os descontos nas reservas

Scenario 1: Cadastro da promoção realizado com sucesso

Given Eu estou logada como "Hoteleiro" do hotel "Encantado" com o e-mail "maria@gmail.com" e a senha "let123"
And Eu estou na página "Cadastro de promoção" da reserva do quarto "Flores" com o valor da diária por "R$ 1300,00"
When Eu preencho o campo "desconto" com "20%"
And Eu preencho o campo "tipo" com "limite de quarto"
And Eu preencho o campo "quantidade de quartos" com "2"
And Tento realizar o cadastro
Then Eu vejo a mensagem de confirmação de cadastro 
And Eu vejo a promoção no quarto "Flores" na página "reservas publicadas" com o valor atualizado para "R$ 1040,00"

Scenario 2: Tentativa de cadastro da promoção com algum campo não preenchido

Given Eu estou logada como "Hoteleiro" do hotel "Encantado" com o e-mail "maria@gmail.com" e a senha "let123"
And Eu estou na página "Cadastro de promoção" da reserva do quarto "Flores" com o valor da diária por "R$ 1300,00" 
When Eu preencho o campo "desconto" com "20%"
And Eu preencho o campo "promoção" com "limite de quarto"
And Tento realizar o cadastro
Then Eu vejo a mensagem indicando que é necessário o preenchimento de todos os campos 
And Eu continuo na página "Cadastro de promoção"

Scenario 3: Deletar todas as promoções

Given Eu estou logada como "Hoteleiro" do hotel "Encantado" com o e-mail "maria@gmail.com" e a senha "let123"
And Eu estou na página "Reservas publicadas"
And O quarto "Flores" tem uma promoção de "30%" cadastrada com o valor promocional de "R$ 910,00" a diária
And O quarto "Campos" tem uma promoção de "20%" cadastrada com o valor promocional de "R$ 1120,00" a diária
And O quarto "Jardins" não possui nenhuma promoção
When Eu seleciono "Deletar todas as promoções" 
Then Eu vejo uma mensagem de confirmação de remoção das promoções
And Eu vejo o quarto "Flores" com seu valor original "R$ 1300,00" a diária
And Eu vejo o quarto "Campos" com seu valor original "R$ 1400,00" a diária
And O quarto "Jardins" permanece com seu valor original de "R$ 1500,00" a diária

Scenario 4: Cadastrar uma promoção em todas as reservas publicadas

Given Eu estou logada como "Hoteleiro" do hotel "Encantado" com o e-mail "maria@gmail.com" e a senha "let123"
And Eu estou na página "Reservas publicadas"
And O quarto "Flores" está nas reservas publicadas com o valor de "R$ 1300,00" a diária
And O quarto "Jardins" está nas reservas publicadas com o valor de "R$ 1500,00" a diária
And O quarto "Campos" está nas reservas publicadas com o valor de "R$ 1400,00" a diária
When Eu seleciono "Cadastrar promoção em todas reservas" 
And Eu realizo o cadastro de uma promoção de "20%" de desconto e "Ilimitada"
Then Eu vejo uma mensagem de confirmação de cadastro
And Eu vejo o quarto "Flores" com o valor atualizado para "R$ 1040,00" a diária
And Eu vejo o quarto "Jardins" com o valor atualizado para "R$ 1200,00" a diária
And Eu vejo o quarto "Campos" com o valor atualizado para "R$ 1120,00" a diária


Scenario 5: Edição na promoção de uma reserva

Given Eu estou logada como "Hoteleiro" do hotel "Encantado" com o e-mail "maria@gmail.com" e a senha "let123"
And Eu estou na página "Reservas publicadas"
And O quarto "Flores" está com uma promoção de "20%" cadastrada com o valor promocional de "R$ 1040,00"
When Eu seleciono "Editar promoção" no quarto "Flores"
And Eu altero o desconto para "60%"
Then Eu vejo uma mensagem de confirmação
And Eu vejo a nova promoção no quarto "Flores" com o valor da diária atualizado para "R$ 520,00" na página "Reservas publicadas" 

Scenario 6: Deletar todas as promoções com nenhuma promoção cadastrada

Given Eu estou logada como "Hoteleiro" do hotel "Encantado" com o e-mail "maria@gmail.com" e a senha "let123"
And Eu estou na página "Reservas publicadas"
And Não há nenhum quarto com promoção cadastrada
When Eu seleciono "Deletar todas as promoções" 
Then Eu posso ver uma mensagem de erro de que não há nenhuma promoção cadastrada
And Eu continuo na página "Reservas publicadas"

