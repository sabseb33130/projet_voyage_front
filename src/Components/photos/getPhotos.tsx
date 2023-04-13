import { useContext, useEffect, useState } from 'react';

import { UserContext } from '../../Contexts/userContext';
import { TokenContext } from '../../Contexts/tokenContext';

export default function GetPhotos() {
    const { token } = useContext(TokenContext);
    var myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${token}`);
    const { user } = useContext(UserContext);
    const [test, setTest] = useState<string>();

    const baseUrl = 'http://localhost:8000/api/photos';
    var formdata = new FormData();

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,

        /*    redirect: 'follow' */
    };

    fetch('http://localhost:8000/api/photos/', requestOptions)
        .then((response) => response.blob())
        .then((result) => {
            console.log(result);
        })
        .catch((error) => console.log('error', error));

    /*  const photo = user.photos.map((data, i) => data.nom_photo);
    return <div> {photo} </div>; */
    return <div>{/*  <img src={test} alt="test" /> */}</div>;
}
