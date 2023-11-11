import dog from "../../assets/dog_face.png";
import bear from "../../assets/bear_face.png";
import cat from "../../assets/cat_face.png";
import fox from "../../assets/fox_face.png";
import koala from "../../assets/koala_face.png";
import lion from "../../assets/lion_face.png";
import panda from "../../assets/panda_face.png";
import pig from "../../assets/pig_face.png";
import tiger from "../../assets/tiger_face.png";

const faces = {
    dog,
    bear,
    cat,
    fox,
    koala,
    lion,
    panda,
    pig,
    tiger,
};

import { Image } from "@chakra-ui/react";

type Props = {
    animal: keyof faces;
};
const Avatar = ({ animal }: Props) => {
    return <Image src={faces[animal] as string} boxSize={"160px"} objectFit={"cover"}></Image>;
};

export default Avatar;