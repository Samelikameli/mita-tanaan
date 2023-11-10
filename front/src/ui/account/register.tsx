import { useForm } from "react-hook-form";
import { useUserRegistration } from "../../controllers/user.tsx";
import { GeoPoint } from "firebase/firestore";

type FormValues = {
    name: string;
};

const Register = () => {
    const { register: registerInput, handleSubmit } = useForm<FormValues>();

    const { register } = useUserRegistration();

    return (
        <div>
            <p>Rekisteröinti tähän</p>
            <form
                onSubmit={handleSubmit((values: FormValues) =>
                    register({ name: values.name, avatar: "panda,jpg", location: new GeoPoint(0, 0) }).then(console.log),
                )}>
                <input placeholder={"nimi"} type={"text"} {...registerInput("name")} />
                <button type={"Submit"}>Submit</button>
            </form>
        </div>
    );
};

export default Register;
