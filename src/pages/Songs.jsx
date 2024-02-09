import { useQuery } from "@tanstack/react-query";
import { getSongs } from "../../API";
import { Card, CardHeader, CardBody, Divider } from "@nextui-org/react";

export const Songs = () => {

    const { data: songs, isLoading } = useQuery({
        queryKey: ['songs'],
        queryFn: getSongs
    });
    // console.log("data: ", songs);

    if (isLoading) {
        return <div>Loading...</div>
    }

    return (
        <>
            {songs?.map((song) => {
                return (
                    <div className="flex flex-col items-center mt-5">
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
                        </Card>
                    </div>
                )
            })}
        </>
    )

}