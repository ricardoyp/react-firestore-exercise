import { Input, Button } from "@nextui-org/react"
import { auth } from "../../config/firebase";
import { createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";

const register = async (email, password) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(
            auth,
            email,
            password
        )
        console.log('Usuario registrado con éxito:', userCredential.user);
    } catch (error) {
        console.error('Error al registrar el usuario:', error);
    }
};

export const Signup = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                console.log('Usuario logueado:', user);
            }
        });

        return unsubscribe;
    }, []);

    return (
        <div className='flex flex-col gap-4 mt-5 max-w-md mx-auto'>
            <Input type="email" name="email" label="Email" onChange={(e) => { setEmail(e.target.value) }} />
            <Input type="password" name="password" label="Password" onChange={(e) => { setPassword(e.target.value) }} />
            <Button onClick={() => { register(email, password) }}>Registrarse</Button>
        </div>
    )
}
