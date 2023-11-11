import { useForm } from "react-hook-form";

import { GeoPoint } from "firebase/firestore";
import { User } from "../../controllers/user.tsx";

type FormValues = {
    name: string;
};

type Props = {
    register: (user: User) => Promise<void>;
};

const Register = ({ register }: Props) => {
    const { register: registerInput, handleSubmit } = useForm<FormValues>();

    return (
        <div>
            <p>Rekisteröinti tähän</p>
            <form onSubmit={handleSubmit((values: FormValues) => register({ name: values.name, avatar: "panda,jpg", location: new GeoPoint(0, 0) }))}>
                <input placeholder={"nimi"} type={"text"} {...registerInput("name", { required: true })} />
                <button type={"submit"}>Submit</button>
            </form>
        </div>
    );
};

export default Register;
