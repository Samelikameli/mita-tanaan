// @ts-nocheck
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
import human1 from "../../assets/Property 1=Default.png";
import human2 from "../../assets/Property 1=Variant2.png";
import human3 from "../../assets/Property 1=Variant3.png";
import human4 from "../../assets/Property 1=Variant4.png";

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
    human1,
    human2,
    human3,
    human4,
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
            boxSize={animal === "giraffe" ? "64px" : small ? "32px" : "160px"}
            objectFit={"cover"}></Image>
    );
};

export default Avatar;
