import { Container, Heading, VStack } from "@chakra-ui/react";

const Home = () => {
    return(
        <Container as="main" mt={16} maxW="3x1">
            <VStack w="full" gap={8}>
                <Heading textAlign="center">
                    Welcome to the Playground!
                </Heading>
            </VStack>
        </Container>
    );
};

export default Home;