import { useForm } from "react-hook-form";

import { GeoPoint } from "firebase/firestore";
import { User } from "../../controllers/user.tsx";
import { Button, Heading, Input, VStack } from "@chakra-ui/react";

type FormValues = {
    name: string;
};

type Props = {
    register: (user: Omit<User, "id">) => Promise<void>;
};

const Register = ({ register }: Props) => {
    const { register: registerInput, handleSubmit } = useForm<FormValues>();

    return (
        <VStack justifyContent="center" height="100%" padding="2">
            <Heading as="h2" fontSize="md">
                Welcome
            </Heading>
            <form
                onSubmit={handleSubmit((values: FormValues) =>
                    register({ name: values.name, avatar: "panda", location: new GeoPoint(60.1619, 24.9053) }),
                )}>
                <VStack>
                    <Input placeholder="Your name" type={"text"} {...registerInput("name", { required: true })} />
                    <Button type="submit" alignSelf="end">
                        Register
                    </Button>
                </VStack>
            </form>
        </VStack>
    );
};

export default Register;
