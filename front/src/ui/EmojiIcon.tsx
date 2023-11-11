import { VStack, Text } from "@chakra-ui/react";

type EmojiIconProps = {
    children: string;
};

const EmojiIcon = (props: EmojiIconProps) => {
    return (
        <VStack height="3rem" width="3rem" background="blue.100" justifyContent="center" alignItems="center" borderRadius="0.5rem">
            <Text fontSize="2rem">{props.children}</Text>
        </VStack>
    );
};

export default EmojiIcon;
