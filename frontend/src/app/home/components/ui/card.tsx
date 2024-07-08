import { Center, Heading, Image, Text } from "@chakra-ui/react";

interface CardProps {
  imageUrl: string;
  title: string;
  description: string;
  imageSize: { width: string; height: string }; // Adicionando a propriedade imageSize
}

const Card = ({ imageUrl, title, description, imageSize }: CardProps) => {
  return (
    <Center
      bg="rgba(106, 5, 114, 0.76)" // Cor de fundo dos cards com transparência
      color="#FFFFFF" // Cor da fonte
      borderRadius="md"
      p={4}
      textAlign="center"
      width="320px" // Ajustando a largura dos cards
      height="398.6px" // Ajustando a altura dos cards
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Image
        src={imageUrl}
        mb={50}
        mt={30}
        width={imageSize.width}
        height={imageSize.height}
      />{" "}
      {/* Ajustando a imagem */}
      <Heading
        size="md"
        mb={10}
        fontFamily="Inter"
        width="345.5px"
        height="38.6px"
      >
        {title}
      </Heading>
      <Text
        fontFamily="Inter"
        width="269.6px"
        height="106.8px"
        whiteSpace="pre-line"
      >
        {description}
      </Text>
    </Center>
  );
};

export default Card;
