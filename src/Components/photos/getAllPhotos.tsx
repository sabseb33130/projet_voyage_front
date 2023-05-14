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
                {' '}
                <div className="me-2">
                    <img
                        className=" border border-5  w-100 img-fluid rounded "
                        style={{ height: 200 }}
                        src={`${photoUrl}/${data.originalName}`}
                        alt={data.description}
                    />
                </div>
                <p>{data.description}</p>
            </div>
        )),
    );

    return (
        <div className="text-center">
            <h1 className="mb-5">
                Toutes les photos présentes dans vos albums
            </h1>
            <div className="container d-flex justify-content-between flex-wrap ">
                {photo}
            </div>
        </div>
    );
}
