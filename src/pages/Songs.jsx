import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getSongs, deleteSong } from "../../API";
import { Card, CardHeader, CardBody, Divider, Button } from "@nextui-org/react";
import ReactAudioPlayer from 'react-audio-player';


export const Songs = () => {

    const queryClient = useQueryClient();

    const { mutate, isPending: isLoadingDelete } = useMutation({
        mutationKey: ['songs'],
        mutationFn: (documentId) => deleteSong(documentId), // Envoltura para pasar documentId a deleteSong
        onSuccess: () => {
            // console.log("Deleted");
            queryClient.invalidateQueries({ queryKey: ['songs'] }); // Invalida la cache de la query para que se vuelva a ejecutar la query y se muestre el nuevo dato en la lista de canciones
        }
    });

    const { data: songs, isLoading: isLoadingGet } = useQuery({
        queryKey: ['songs'],
        queryFn: getSongs
    });

    console.log("songs: ", songs);

    if (isLoadingGet) {
        return <div>Loading...</div>
    }


    return (
        <>
            {songs?.map((song, index) => {
                return (
                    <div key={index} className="flex flex-col items-center mt-5">
                        <Card isHoverable className="min-w-[400px] max-w-[800px]">
                            <CardHeader>
                                <div className="flex flex-col">
                                    <p className="text-md">{song.artist}</p>
                                    <p className="text-small text-default-500">{song.year}</p>
                                </div>
                            </CardHeader>
                            <Divider />
                            <CardBody>
                                <p className="text-lg font-bold">{song.title}</p>
                            </CardBody>
                            <Divider />
                            <CardBody>
                                <p className="text-base">{song.genre}</p>
                            </CardBody>
                            <Divider />
                            <CardBody className="items-center">
                                <ReactAudioPlayer src={song.url} controls />
                            </CardBody>
                        </Card>
                        <Button onClick={() => mutate(song.id)}>Delete</Button>
                        {isLoadingDelete && <p>Deleting...</p>}
                    </div>
                )
            })
            }
        </>
    )
}


// const onSubmit = (data) =>{
//     mutate(data);
//     navigate('/songs');
// } 

// const { mutate, ...rest } = useMutation({
//     muutationKey: 'songs',  
//     mutationFn: setSong
// });