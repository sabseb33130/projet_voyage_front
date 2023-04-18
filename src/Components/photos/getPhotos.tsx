import { useContext, useEffect, useState } from 'react';
import './getPhotos.css';
import { UserContext } from '../../Contexts/userContext';
import { TokenContext } from '../../Contexts/tokenContext';

export default function GetPhotos() {
    const { token } = useContext(TokenContext);
    var myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${token}`);
    const [test, setTest] = useState<string>();

    const baseUrl = 'http://localhost:8000/api/photos/file/16';
    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
    };
    useEffect(() => {
        fetch(baseUrl, requestOptions)
            .then((response) => response.blob())
            .then((result) => {
                setTest(URL.createObjectURL(result));
            })
            .catch((error) => console.log('error', error));
    }, []);

    return (
        <div className="container">
            <img id="photo" src={test} alt="test" />
        </div>
    );
}
