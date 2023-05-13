import { useEffect, useState } from 'react';

import { PhotosAlbum } from '../../Types/photoAlbum';
import { photoUrl } from '../../constant/generalConst';
export default function GetAllPhotos() {
    const [allPhoto, setAllPhoto] = useState<PhotosAlbum[] | undefined>();
    const token = localStorage.getItem('token');

    const options = {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    useEffect(() => {
        fetch('http://localhost:8000/api/photos', options)
            .then((response) => response.json())
            .then((response) => {
                console.log(response);
                setAllPhoto(response.data);
            })
            .catch((err) => console.error(err));
    }, []);
    const photo = allPhoto?.map((data) =>
        data.map((data) => (
            <div>
                <img
                    /*   crossOrigin="anonymous" */
                    className=" border border-5 border-dark w-100 img-fluid rounded-pill  "
                    style={{ height: 300 }}
                    src={`${photoUrl}/${data.originalName}`}
                    alt={data.description}
                />
                <p>
                    Cette photo est dans l'album {data.albumId} et la
                    description est: {data.description}
                </p>
            </div>
        )),
    );

    return (
        <div className="d-flex justify-content-between flex-wrap">{photo}</div>
    );
}
