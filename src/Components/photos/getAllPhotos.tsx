import { useContext, useEffect, useState } from 'react';
import { PhotosAlbum } from '../../Types/photoAlbum';
import { photoUrl } from '../../constant/generalConst';
import { UserContext } from '../../Contexts/userContext';
import { Carousel } from 'antd';

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
    const contentStyle: React.CSSProperties = {
        height: '350px',
        width: '50vh',
        marginLeft: '450px',
        color: '#fff',
        lineHeight: '160px',
        textAlign: 'center',
        background: '#364d79',
    };
    const photo = allPhoto?.map((data) =>
        data.map((data) => (
            <div>
                <div className="container">
                    <p>
                        La photo :{' '}
                        {data.description === 'undefined' ||
                        data.description === data.file
                            ? ''
                            : data.description}{' '}
                        est dans l'album :{' '}
                        {user.albums.find((elm) =>
                            elm.photos.filter((elm) => elm.id === data.id),
                        )?.id
                            ? user.albums.find((elm) =>
                                  elm.photos.filter(
                                      (elm) => elm.id === data.id,
                                  ),
                              )?.nom_album
                            : ''}
                    </p>
                    <a href="./#" className="bg-image hover-zoom ">
                        <img
                            className=" border border-5 img-fluid rounded "
                            style={contentStyle}
                            src={`${photoUrl}/${data.originalName}`}
                            alt={String(data.id)}
                        />
                    </a>
                </div>{' '}
            </div>
        )),
    );

    return (
        <div className="text-center">
            <h1 className="mb-5">
                Toutes les photos présentes dans vos albums
            </h1>

            <Carousel autoplay> {photo}</Carousel>
        </div>
    );
}
