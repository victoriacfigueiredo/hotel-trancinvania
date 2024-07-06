import React from "react";
import { Box } from "@chakra-ui/react";
import { AnimatedTooltip } from "./ui/animated-tooltip";

const people = [
  {
    id: 1,
    name: "Amanda Cristina",
    designation: "Salvar, gostar, compartilhar e avaliar reserva",
    image: "https://i.imgur.com/B3GoJFb.png",
  },
  {
    id: 2,
    name: "Bianca Duarte",
    designation: "Cadastro, Login e tela Inicial",
    image: "https://i.imgur.com/GKQzbwx.png",
  },
  {
    id: 3,
    name: "Maria Letícia",
    designation: "Promoções e Disparo de E-mails",
    image: "https://i.imgur.com/RwDa0K6.png",
  },
  {
    id: 4,
    name: "Matheus Augusto",
    designation: "Métodos de Pagamento",
    image: "https://i.imgur.com/2ccf5ry.png",
  },
  {
    id: 5,
    name: "Matheus Galdino",
    designation: "Busca com Filtro",
    image: "https://i.imgur.com/9KP19I1.png",
  },
  {
    id: 6,
    name: "Thaís Neves",
    designation: "Gerenciar e Publicar Reservas",
    image: "https://i.imgur.com/j15hgfa.png",
  },
  {
    id: 7,
    name: "Victória Cesar",
    designation: "Realizar Reservas",
    image: "https://i.imgur.com/N5YaGKi.png",
  },
];

export function AnimatedTooltipPreview() {
  return (
    <AnimatedTooltip items={people} />
  );
}
