import { useState } from "react";
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import { storage } from "../../config/firebase";
import {Button, CircularProgress, Input} from "@nextui-org/react";
import { useNavigate } from "react-router-dom"; // Cambia la importación a useNavigate

export const Upload = () => {
    const [image, setImage] = useState(null);
    const [url, setUrl] = useState("");
    const [progress, setProgress] = useState(0);

    const navigate = useNavigate(); // Cambia useHistory a useNavigate

    const handleChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    }

    // const handleUpload = () => {
    //     const storageRef = ref(storage, `images/${image.name}`);
    //     uploadBytes(storageRef, image).then((snapshot) => {
    //         getDownloadURL(snapshot.ref).then((downloadURL) => { 
    //             setUrl(downloadURL);
    //             // console.log('Archivo disponible en', downloadURL);
    //         });
    //     });
    // };

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

        console.log("url: ", url);

    }
    return (
            <div className="flex flex-col items-center mt-5 gap-5">
                <Input className="max-w-[400px]" type="file" onChange={handleChange} />
                <Button onClick={handleUpload}>Upload</Button>
                {/* {url && <img src={url} />} */}
                {progress > 0 && <CircularProgress value={progress} />}
            </div>
    )
}
