import { Button, Container, Image, Text, VStack } from '@chakra-ui/react';
import { useWallet } from '@solana/wallet-adapter-react';

const Wallets = () => {
    const { select, publicKey, disconnect, wallets } = useWallet();

    return !publicKey ? (
        <Container mt={8} maxW="3x1">
            <VStack gap={4}>
                {wallets.filter((wallet) => wallet.readyState === 'Installed').map((wallet) => (
                    <Button
                        key={wallet.adapter.name}
                        onClick={() => select(wallet.adapter.name)}
                        w={64}
                        size='lg'
                        fontSize='md'
                        leftIcon={
                            <Image
                                src={wallet.adapter.icon}
                                alt={wallet.adapter.name}
                                h={6}
                                w={6}
                            />
                        }
                    >
                        {wallet.adapter.name}
                    </Button>
                ))}
            </VStack>
        </Container>

    ) : (
        <Container mt={8} maxW="3x1">
            <VStack gap={4}>
                <Text>{publicKey.toBase58()}</Text>
                <Button onClick={disconnect}>Disconnect</Button>
            </VStack>
        </Container>
    );
};

export default Wallets;