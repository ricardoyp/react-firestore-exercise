import { useState } from 'react';
import { Button, Input } from '@nextui-org/react';
import { auth } from "../../config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';

const login = async ({ email, password}) => {
    try {
        const userCredential = await signInWithEmailAndPassword(
            auth,
            email,
            password
        );
        console.log('Usuario logueado con éxito:', userCredential.user);
    } catch (error) {
        console.error('Error al loguear el usuario:', error);
    }
};

export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const { mutate } = useMutation({
        mutationKey: ['login'],
        mutationFn: login,
        onSuccess: () => {
            navigate('/')
        }
    });

    return (
        <div className='flex flex-col gap-4 mt-5 max-w-md mx-auto'>
            <Input type="email" value={email} label="Email" onChange={(e) => setEmail(e.target.value)} />
            <Input type="password" value={password} label="Password" onChange={(e) => setPassword(e.target.value)} />
            <Button onClick={() => { mutate({email, password}) }}>Login</Button>
        </div>
    );
};
