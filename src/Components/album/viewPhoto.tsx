import { useEffect, useState } from 'react';

import { photoUrl, urlAlbum } from '../../constant/generalConst';
import { Button, Popconfirm, message } from 'antd';
import deletePhoto from '../photos/deletetPhotos';
import { TAlbums } from '../../Types/albums';
import './card.css';
import UpdatePhoto from '../photos/updatePhoto';

export default function ViewPhoto(props: {
    albumView: TAlbums;
    token: string | null;
    setPage: React.Dispatch<React.SetStateAction<string>>;
    setAlbumView: React.Dispatch<React.SetStateAction<TAlbums>>;
}) {
   
    const [numberPhoto, setNumberPhoto] = useState<string>();
    const photoNumber = (e: React.BaseSyntheticEvent) => {
        const { title } = e.currentTarget;
        setNumberPhoto(title);
    };

    const text = `Êtes-vous sûr de vouloir suprimer cette photo ?`;
    const confirm = () => {
        message.info(`Cette photo vient d'être supprimée`);
        deletePhoto(
            props.token,
            numberPhoto!,
            props.albumView,
            props.setAlbumView,  
            setAffichage
        );
    };
    const [affichage, setAffichage] = useState<string>();
    const [filePhoto, setFilePhoto] = useState<string>();
    const [descriptPhoto, setDescripPhoto] = useState<string>('');
    const token = localStorage.getItem('token');
    const [test2, setTest2] = useState<TAlbums>();
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `bearer ${token}`,
        },
    };
    useEffect(() => {
        fetch(`${urlAlbum}/${props.albumView.id}`, options)
            .then((response) => response.json())
            .then((response) => {
                setTest2(response);
            })
            .catch((err) => console.error(err));
    }, [props.albumView]);

    const photos = test2?.photos.map((photo, j) => (
        <div>
            <Popconfirm
                key={j}
                placement="bottom"
                title={text}
                onConfirm={confirm}
                okText="Oui"
                cancelText="Non"
            >
                <div>
                    <div
                        className="bg-image ripple ms-2"
                        data-mdb-ripple-color="light"
                        title={
                            photo.id === undefined
                                ? photo.file
                                : photo.id.toString()
                        }
                        onClick={(e)=> {photoNumber(e);setAffichage('view')}}>
                        <div>
                            <a
                                href="./#"
                                className="bg-image hover-zoom "
                                onClick={()=>{setFilePhoto(photo.file);setDescripPhoto(photo.description)}}>
                                <label className="text-center">
                                    {photo.description === 'undefined'
                                        ? ''
                                        : photo.description}
                                </label>
                                <img
                                    key={j}
                                    className={` border border-5 w-100 img-fluid rounded`}
                                    style={{ height: 300 }}
                                    src={`${photoUrl}/${photo.file}`}
                                    alt={photo.description}
                                />
                            </a>
                        </div>
                    </div>
                </div>
            </Popconfirm>
        </div>
    ));
    let [test, setTest] = useState(false);
    const verif = (e: React.BaseSyntheticEvent) => {
        setTest(e.isTrusted);
    };
 
    const avis = (
        <div>
            <div className="container d-flex justify-content-center">
                <div>
                    <img
                        className={` border border-5 w-100 img-fluid rounded `}
                        style={{ height: 400, width: 500 }}
                        src={`${photoUrl}/${filePhoto}`}
                        alt={filePhoto}
                    />
                </div>
                <div className="ms-3 mt-5">
                    {!test ? (
                        <div>
                            <label className="text-center">
                                Description de la photo : {descriptPhoto}
                            </label>
                        </div>
                    ) : (
                        <UpdatePhoto />
                    )}
                    <Popconfirm
                        placement="bottom"
                        title={text}
                        onConfirm={confirm}
                        okText="Oui"
                        cancelText="Non"
                    >
                        <Button className="btn btn-danger rounded mb-2 ">
                            <i className="bi bi-trash3"></i>
                        </Button>
                    </Popconfirm>
                    {!test ? (
                        <Button
                            className="btn btn-primary rounded mb-2  ms-3"
                            onClick={(e) => {
                                verif(e);
                            }}
                        >
                            <i className="bi bi-pen"></i>
                        </Button>
                    ) : (
                        <Button
                            className="btn btn-success rounded mb-2  ms-3"
                            onClick={() => {
                               setTest(false);
                            }}
                        >
                            Valider
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
    return <>{affichage !== 'view' ? photos : avis}</>;
}
