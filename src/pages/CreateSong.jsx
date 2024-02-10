import { useForm } from "react-hook-form"
import { setSong } from "../../API"
import { Button, Input } from '@nextui-org/react'; // Importamos el componente
import { TextInput } from "../components/Input";
import { useNavigate } from "react-router-dom"; // Cambia la importación a useNavigate
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import { storage } from "../../config/firebase";

export const CreateSong = () => {
    const navigate = useNavigate(); // Cambia useHistory a useNavigate
    const [image, setImage] = useState(null);
    const [url, setUrl] = useState("");
    const [progress, setProgress] = useState(0);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()


    const { mutate: mutateSet, ...rest } = useMutation({
        muutationKey: ['songs'],
        mutationFn: setSong,
        onSuccess: () => {
            navigate('/songs');
        }
    });

    const handleChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    }

    const handleUpload = () => {
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
                    navigate("/")
                });
            }
        );
    }

    const onSubmit = (data) => {
        console.log("data: ", data);
        console.log("url: ", url);
        handleUpload();
        mutateSet(data); // Agrega la URL al objeto data
    }

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4 mt-5 max-w-md mx-auto'>
                <TextInput type="text" name="artist" label="Artist" register={register} errors={errors} />
                <TextInput type="text" name="title" label="Title" register={register} errors={errors} />
                <TextInput type="text" name="genre" label="Genre" register={register} errors={errors} />
                <TextInput type="Number" name="year" label="Year" register={register} errors={errors} />
                <Input type="file" name="mp3" onChange={handleChange} />
                <Button type="submit">Submit</Button>
            </form>
        </div>
    )
}
