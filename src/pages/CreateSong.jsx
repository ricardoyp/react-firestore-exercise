import { useState } from "react";
import { useForm } from "react-hook-form"
import { setSong } from "../../API"
import { storage } from "../../config/firebase";
import { TextInput } from "../components/Input";
import { useNavigate } from "react-router-dom"; // Cambia la importación a useNavigate
import { useMutation } from "@tanstack/react-query";
import { Button, Input } from '@nextui-org/react'; // Importamos el componente
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';

export const CreateSong = () => {
    const navigate = useNavigate(); // Cambia useHistory a useNavigate
    const [image, setImage] = useState(null);
    const [url, setUrl] = useState("");
    const [progress, setProgress] = useState(0);

    const { register, handleSubmit, formState: { errors } } = useForm();

    const { mutate: mutateSet, ...rest } = useMutation({ 
        muutationKey: ['songs'],
        mutationFn: setSong,
        onSuccess: () => navigate('/songs')
    });

    const handleChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    }

    const handleUpload = (data) => {
        const storageRef = ref(storage, `images/${image.name}`);
        const uploadTask = uploadBytesResumable(storageRef, image);

        uploadTask.on(
            'state_changed',
            (snapshot) => {
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                setProgress(progress);
            },
            (error) => {
                console.error(error);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setUrl(downloadURL);
                    const newData = { ...data, url: downloadURL };
                    mutateSet(newData); // Despues de subir el archivo, llamamos a la mutación para subir los datos a la base de datos
                });
            }
        );
    }

    const onSubmit = async (data) => {
        console.log("data: ", data);
        console.log("url: ", url);
        handleUpload(data);
    };

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4 mt-5 max-w-md mx-auto'>
                <TextInput type="text" name="artist" label="Artist" register={register} errors={errors} />
                <TextInput type="text" name="title" label="Title" register={register} errors={errors} />
                <TextInput type="text" name="genre" label="Genre" register={register} errors={errors} />
                <TextInput type="Number" name="year" label="Year" register={register} errors={errors} />
                <Input type="file" name="mp3" accept="audio/*" onChange={handleChange} />
                <Button type="submit">Submit</Button>
            </form>
        </div>
    )
}


