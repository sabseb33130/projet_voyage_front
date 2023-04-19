import { useContext, useEffect, useState } from 'react';
import './getPhotos.css';
import { TokenContext } from '../../Contexts/tokenContext';

export default function GetPhotos() {
    const { access_token } = useContext(TokenContext);
    var myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${access_token}`);
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
