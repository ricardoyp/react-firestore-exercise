import { useForm } from "react-hook-form"
import { setSong } from "../../API"
import { Button } from '@nextui-org/react'; // Importamos el componente
import { TextInput } from "../components/Input";

export const CreateSong = () => {

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const onSubmit = (data) =>{
        setSong(data);
    } 
    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4 mt-5 max-w-md mx-auto'>
                <TextInput type="text" name="artist" label="Artist" register={register} errors={errors} />
                <TextInput type="text" name="title" label="Title" register={register} errors={errors} />
                <TextInput type="text" name="genre" label="Genre" register={register} errors={errors} />
                <TextInput type="number" name="year" label="Year" register={register} errors={errors} />
                <Button type="submit">Submit</Button>
            </form>
        </div>
    )
}
