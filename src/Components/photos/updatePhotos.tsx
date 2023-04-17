import { useContext, useState, useEffect } from 'react';
import { TokenContext } from '../../Contexts/tokenContext';
import { UserContext } from '../../Contexts/userContext';

export default function UpdatePhotos() {
    const baseUrl = 'http://localhost:8000/api/photos';
    const { token } = useContext(TokenContext);

    const { user } = useContext(UserContext);
    const [test, setTest] = useState<string>();

    var myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${token}`);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,

        /*    redirect: 'follow' */
    };
    useEffect(() => {
        fetch(baseUrl, requestOptions)
            .then((response) => response.blob())
            .then((result) => {
                setTest(URL.createObjectURL(result));
            })
            .catch((error) => console.log('error', error));
    }, []);
    console.log(test);
}
