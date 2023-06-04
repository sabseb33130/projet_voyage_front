import { useEffect, useState } from 'react';
import { photoUrl, urlAlbum } from '../../constant/generalConst';
import { Button, Popconfirm, message } from 'antd';
import deletePhoto from '../photos/deletetPhotos';
import { TAlbums } from '../../Types/albums';
import './../../App.css';
import UpdatePhoto from '../photos/updatePhoto';

export default function ViewPhoto(props: {
    albumView: TAlbums;
    token: string | null;
    setPage: React.Dispatch<React.SetStateAction<string>>;
    setAlbumView: React.Dispatch<React.SetStateAction<TAlbums>>;
    setAffichage: React.Dispatch<React.SetStateAction<string | undefined>>;
    affichage: string | undefined;
}) {
    const [change, setChange] = useState(true);
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
            props.setAffichage,
        );
    };

    const [filePhoto, setFilePhoto] = useState<string>();
    const token = localStorage.getItem('token');
    const [album, setAlbum] = useState<TAlbums>();
    const [description, setDescription] = useState<string>();
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
                setAlbum(response);
            })
            .catch((err) => console.error(err));
        // eslint-disable-next-line
    }, [props.albumView]);

    const photos = album?.photos.map((photo, j) => (
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
                        onClick={(e) => {
                            photoNumber(e);
                            props.setAffichage('view');
                            setDescription(photo.description);
                        }}
                    >
                        <div>
                            <a
                                href="./#"
                                key={j}
                                className="bg-image hover-zoom "
                                onClick={() => setFilePhoto(photo.file)}
                            >
                                <img
                                    key={j}
                                    className={` border border-5 img-fluid rounded mt-5`}
                                    style={{ height: 200, width: 200 }}
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

    const avis = (
        <div key={'a'} className="mt-2 text-center">
            <div className="  container d-flex  flex-wrap ">
                <div>
                    <UpdatePhoto
                        description={description!}
                        numberPhoto={numberPhoto!}
                        albumView={props.albumView}
                        setAffichage={props.setAffichage}
                        setAlbumView={props.setAlbumView}
                        setChange={setChange}
                    />
                </div>
                {change === true ? (
                    <div className="ms-2">
                        <Popconfirm
                            placement="bottom"
                            title={text}
                            onConfirm={confirm}
                            okText="Oui"
                            cancelText="Non"
                        >
                            <Button className="btn btn-danger rounded-pill bouton mb-2 ">
                                Supprimer
                            </Button>
                            <Button className="btn btn-danger rounded-pill mb-2 nobouton ">
                                <i className="bi bi-trash3"></i>
                            </Button>
                        </Popconfirm>
                    </div>
                ) : (
                    ''
                )}
                <button
                    className="btn btn-warning btn-sm rounded-pill mb-2 ms-2 bouton  "
                    onClick={() => {
                        props.setAffichage(undefined);
                    }}
                >
                    Retour album
                </button>
                <button
                    className="btn btn-warning btn-sm rounded-pill mb-2 ms-2 nobouton  "
                    onClick={() => {
                        props.setAffichage(undefined);
                    }}
                >
                    <i
                        className="bi bi-arrow-bar-left"
                        onClick={() => {
                            props.setAffichage(undefined);
                        }}
                    ></i>
                </button>
            </div>
            <div className="container  ">
                <img
                    className={` border border-5 img-fluid rounded `}
                    style={{ height: 100 + '%', width: 100 + '%' }}
                    src={`${photoUrl}/${filePhoto}`}
                    alt={filePhoto}
                />
            </div>
        </div>
    );
    return <>{props.affichage !== 'view' ? photos : avis} </>;
}
