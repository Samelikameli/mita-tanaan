import dog from "../../assets/dog_face.png";
import bear from "../../assets/bear_face.png";
import cat from "../../assets/cat_face.png";
import fox from "../../assets/fox_face.png";
import koala from "../../assets/koala_face.png";
import lion from "../../assets/lion_face.png";
import panda from "../../assets/panda_face.png";
import pig from "../../assets/pig_face.png";
import tiger from "../../assets/tiger_face.png";
import giraffe from "../../assets/giraffe.png";
import pos from "../../assets/mypos.png";

const faces = {
    dog,
    bear,
    cat,
    fox,
    koala,
    lion,
    panda,
    "panda,jpg": panda,
    pig,
    tiger,
    giraffe,
    pos,
};

import { Image } from "@chakra-ui/react";

type Props = {
    animal: keyof faces;
    small?: boolean;
};
const Avatar = ({ animal, small }: Props) => {
    if (faces[animal] == null) console.log(animal);
    return (
        <Image
            filter={`drop-shadow(0px 0px ${small ? 1 : 5}px gray)`}
            src={faces[animal] as string}
            boxSize={animal === "giraffe" ? "64px" : small ? "48px" : "160px"}
            objectFit={"cover"}></Image>
    );
};

export default Avatar;
