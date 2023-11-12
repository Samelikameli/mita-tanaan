import { VStack, Text } from "@chakra-ui/react";

type EmojiIconProps = {
    children: string;
};

const EmojiIcon = (props: EmojiIconProps) => {
    return (
        <VStack height="4rem" width="4rem" justifyContent="center" alignItems="center" borderRadius="0.5rem">
            <Text fontSize="3rem">{props.children}</Text>
        </VStack>
    );
};

export default EmojiIcon;
