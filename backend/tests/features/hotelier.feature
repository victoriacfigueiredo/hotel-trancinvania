Feature: Cadastro de Hoteleiros
As a Usuário "Hoteleiro"
I want to cadastrar-me na plataforma de reserva de hoteis “hotel trancinvânia”
So that eu possa realizar ações no sistema de acordo com meu tipo de usuário

  Scenario: Cadastro Bem-Sucedido de Usuário Hoteleiro
    Given que eu sou um novo hoteleiro
    When eu envio uma solicitação de cadastro com o hotel "Hotel Transilvânia", email "mavis.dracula@gmail.com", username "mavis", password "@Vampiresca1", cidade "Transilvânia", cep "12345678", endereço "Rua das Sextas", número do endereço "13", UF "TR" e CNPJ "12.215.333/0001-33"
    Then o cadastro deve ser realizado com sucesso
    And eu devo receber uma mensagem de confirmação:
    """
    {
      "message": "Cadastro realizado com sucesso",
      "hotelier": {
        "id": "#is_placeholder",
        "name": "Maria Letícia",
        "email": "mavis.dracula@gmail.com",
        "username": "mavis",
        "password": "@Vampiresca1",
        "hotel": "Hotel Transilvânia",
        "city": "Transilvânia",
        "cep": "12345678",
        "address": "Rua das Sextas",
        "n_address": "13",
        "UF": "TR",
        "cnpj": "12.215.333/0001-33"
      }
    }
    """
