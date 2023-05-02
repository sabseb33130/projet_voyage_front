import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../Contexts/userContext';
import './getPhotos.css';

export default function GetPhotos() {
    const { user } = useContext(UserContext);
    const [test, setTest] = useState<string>();

    const baseUrl = 'http://localhost:8000/api/photos/file/51';
    const options = {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${user.access_token}`,
        },
    };

    useEffect(() => {
        fetch(baseUrl, options)
            .then((response) => response.blob())
            .then((result) => {
                console.log(result);

                // setTest(URL.createObjectURL(result));
                //setTest(result);
            })
            .catch((error) => console.log('error', error));
    }, []);
    const testouille = user.photos.file;

    return (
        <div className="container">
            <img id="photo" src={test} alt="test" />
        </div>
    );
}
