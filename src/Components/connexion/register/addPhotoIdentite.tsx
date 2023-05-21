import { useState } from 'react';

import { baseUrl } from '../../../constant/generalConst';

export default function AddPhotoIdentite(props: { token: string | null }) {
    /*  const { user, onUserChange } = useContext(UserContext); */
    /*   const [file, setFile] = useState('');
    const postPhoto = (e: React.BaseSyntheticEvent) => {
        e.preventDefault();
        let myHeaders = new Headers();
        myHeaders.append('Authorization', `Bearer ${props.token}`);
        const form = new FormData();
    
          
                form.append('monimage', file, file.name);
            }

        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
        };

        fetch(
            `http://localhost:8000/api/photo-identite/uploads`,
            requestOptions,
        )
            .then((response) => response.json())
            .then((result) => console.log(result));
    }; */
    return <div></div>;
}
