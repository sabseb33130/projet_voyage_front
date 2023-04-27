import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../Contexts/userContext';
import './getPhotos.css';

export default function GetPhotos() {
    const { user } = useContext(UserContext);
    let myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${user.access_token}`);
    const [test, setTest] = useState<string>();

    const baseUrl = 'http://localhost:8000/api/photos/file';
    let requestOptions = {
        method: 'GET',
        headers: myHeaders,
    };
    useEffect(() => {
        fetch(baseUrl, requestOptions)
            .then((response) => response.blob())
            .then((result) => {
                setTest(URL.createObjectURL(result));
            });
    }, []);

    return (
        <div className="container">
            <img id="photo" src={test} alt="test" />
        </div>
    );
}
