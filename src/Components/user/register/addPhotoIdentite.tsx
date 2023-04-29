import { useContext, useState } from 'react';
import { UserContext } from '../../../Contexts/userContext';
import { baseUrl, photoUrl, token } from '../../../constant/generalConst';

export default function AddPhotoIdentite() {
    /*  const { user, onUserChange } = useContext(UserContext); */
    const [files, setFiles] = useState('');
    const postPhoto = (e: React.BaseSyntheticEvent) => {
        e.preventDefault();
        let myHeaders = new Headers();
        myHeaders.append('Authorization', `Bearer ${token}`);
        let blob = new Blob([files], { type: 'image/png' });
        let formdata = new FormData();
        formdata.append('file', blob, `${files}`);

        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
        };

        fetch(`${baseUrl}photos/uploads`, requestOptions)
            .then((response) => response.json())
            .then((result) => console.log(result));
    };
    return <div></div>;
}
