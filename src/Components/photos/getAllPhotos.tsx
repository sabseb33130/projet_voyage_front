import { useContext, useEffect, useState } from 'react';
import { PhotosAlbum } from '../../Types/photoAlbum';
import { photoUrl } from '../../constant/generalConst';
import { UserContext } from '../../Contexts/userContext';

export default function GetAllPhotos(props: {
    setPage: React.Dispatch<React.SetStateAction<string>>;
}) {
    const [allPhoto, setAllPhoto] = useState<PhotosAlbum[] | undefined>();
    const token = localStorage.getItem('token');
    const { user } = useContext(UserContext);

    const options = {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` },
    };
    useEffect(() => {
        fetch('http://localhost:8000/api/photos', options)
            .then((response) => response.json())
            .then((response) => {
                setAllPhoto(response.data);
            })
            .catch((err) => console.error(err));
        // eslint-disable-next-line
    }, []);

    const photo = allPhoto?.map((data) =>
        data.map((data) => (
            <div>
                <div className="me-2">
                    <a href="./#" className="bg-image hover-zoom ">
                        <img
                            className=" border border-5  w-100 img-fluid rounded "
                            style={{ height: 200 }}
                            src={`${photoUrl}/${data.originalName}`}
                            alt={String(data.id)}
                        />
                    </a>
                </div>
                <p>
                    {data.description === 'undefined' ? '' : data.description}
                    {user.albums.find((elm) =>
                        elm.photos.filter((elm) => elm.id === data.id),
                    )?.id
                        ? user.albums.find((elm) =>
                              elm.photos.filter((elm) => elm.id === data.id),
                          )?.id
                        : ''}
                </p>
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
