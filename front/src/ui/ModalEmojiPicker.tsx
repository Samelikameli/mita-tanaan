import { Text, Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, useDisclosure, HStack } from "@chakra-ui/react";

type ModalEmojiPickerProps = {
    emoji: string;
    onChoose: (emoji: string) => void;
    size?: string;
    fontSize?: string;
    reaction?: boolean;
};

const getEmojiSet = (reaction: boolean) => {
    if (reaction){
        return ["🚀", "🍻", "👍", "💻", "🔥", "✅", "🎉", "🐳", "🥰", "🍆", "🍑", "✌️"]
    }

    return ["🍻", "💻", "🎓", "🌲", "💤","⚽️","🏀","🏈","⚾️","🥎","🎾","🏐","🥏","🎱","🏓","🏸","🏒","🏑","🏏","🪃","🥅","⛳️","🪁","🏹","🎣","🤿","🥊","🛹","🛼","🛷","🥌","🎿","🏂","🪂","🏋️","🤼","🤸","⛹️","🤺","🧘","🏄","🏊","🚣","🚴","🏆","🥇","🎖","🎗","🎫","🎟","🎪","🤹","🎭","🩰","🎨","🎬","🎤","🎧","🎼","🎹","🥁","🪘","🪇","🎷","🎺","🪗","🎸","🪕","🎻","🪈","🎲","🎯","🎳","🎮","🧩"];
}

const ModalEmojiPicker = (props: ModalEmojiPickerProps) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    
    const emojis =getEmojiSet(props.reaction);
    return (
        <div>
            <Button onClick={onOpen} size={props.size || "lg"} variant="outline">
                <Text fontSize={props.fontSize || "2em"}>{props.emoji}</Text>
            </Button>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    {!props.reaction && <ModalHeader>Choose an icon</ModalHeader>}
                    <ModalCloseButton />
                    <ModalBody>
                        <HStack flexWrap="wrap">
                            {emojis.map((emoji, index) => (
                                <Button
                                    onClick={() => {
                                        props.onChoose(emoji);
                                        onClose();
                                    }}
                                    key={`${emoji}-${index}`}
                                    fontSize="2rem"
                                    size="lg">
                                    {emoji}
                                </Button>
                            ))}
                        </HStack>
                        {/*<EmojiPicker
                            width="100%"
                            onEmojiClick={emoji => {
                                onClose();
                                props.onChoose(emoji.emoji);
                            }}
                            searchDisabled={true}
                            lazyLoadEmojis={true}
                            previewConfig={{ showPreview: false }}
                            categories={[]}
                        />*/}
                    </ModalBody>
                </ModalContent>
            </Modal>
        </div>
    );
};

export default ModalEmojiPicker;
