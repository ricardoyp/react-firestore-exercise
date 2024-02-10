import { useForm } from "react-hook-form"
import { setSong } from "../../API"
import { Button } from '@nextui-org/react'; // Importamos el componente
import { TextInput } from "../components/Input";
import { useNavigate } from "react-router-dom"; // Cambia la importación a useNavigate
import { useMutation } from "@tanstack/react-query";

export const CreateSong = () => {
    const navigate = useNavigate(); // Cambia useHistory a useNavigate
    
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const onSubmit = (data) =>{
        mutateSet(data);
    } 

    const { mutate: mutateSet, ...rest } = useMutation({
        muutationKey: ['songs'],  
        mutationFn: setSong,
        onSuccess: () => {
            navigate('/songs');
        }
    });

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4 mt-5 max-w-md mx-auto'>
                <TextInput type="text" name="artist" label="Artist" register={register} errors={errors} />
                <TextInput type="text" name="title" label="Title" register={register} errors={errors} />
                <TextInput type="text" name="genre" label="Genre" register={register} errors={errors} />
                <TextInput type="Number" name="year" label="Year" register={register} errors={errors} />
                <Button type="submit">Submit</Button>
            </form>
        </div>
    )
}
