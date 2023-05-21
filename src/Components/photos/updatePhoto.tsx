import { useContext, useState } from 'react';
import { AlbumContext } from '../../Contexts/albumContext';
import { updatePhoto } from '../../Types/photos';
import { photoConstant } from '../../constant/photoContant';
import { TAlbums } from '../../Types/albums';
import { Button, Popconfirm, message } from 'antd';
import { UserContext } from '../../Contexts/userContext';
import deletePhoto from './deletetPhotos';
import './card.css';
export default function UpdatePhoto(props: {
    description: string;
    numberPhoto: string;
    albumView: TAlbums;
    setAlbumView: React.Dispatch<TAlbums>;
    setAffichage: React.Dispatch<React.SetStateAction<string | undefined>>;
    setTest: React.Dispatch<React.SetStateAction<boolean>>;
}) {
    const text = `Êtes-vous sûr de vouloir suprimer cette photo ?`;
    const confirm = () => {
        message.info(`Cette photo vient d'être supprimée`);
        deletePhoto(
            token,
            props.numberPhoto!,
            props.albumView,
            props.setAlbumView,
            props.setAffichage,
        );
    };
    const { albumNumber } = useContext(AlbumContext);
    const { user } = useContext(UserContext);
    const token = localStorage.getItem('token');
    const [newDescription, setNewDescription] =
        useState<updatePhoto>(photoConstant);
    const inputChange = (e: React.BaseSyntheticEvent) => {
        const { value } = e.target;
        setNewDescription(value);
    };
    const [defaultValue, setDefaultValue] = useState(
        user.albums
            .find((elm) => elm.id === +albumNumber)
            ?.photos.find((elm) => elm.id === +props.numberPhoto)?.description,
    );

    const test = JSON.stringify({
        albumId: albumNumber,
        description: newDescription,
    });

    const options = {
        method: 'PATCH',
        headers: {
            'Content-Type': ' application/json',
            Authorization: `Bearer ${token}`,
        },
        body: test,
    };

    const envoi = (e: React.BaseSyntheticEvent) => {
        e.preventDefault();
        fetch(`http://localhost:8000/api/photos/${props.numberPhoto}`, options)
            .then((response) => response.json())
            .then((response) => {
                alert(
                    `La modification de la légende : ${response.data.description} vient d'être effectuée`,
                );
                const newAlbumView = { ...props.albumView };
                newAlbumView.photos.push(response.data);
                props.setAlbumView(newAlbumView);
                setDefaultValue(response.data.description);
            });
    };

    const [testa, setTesta] = useState(true);

    return (
        <div className="d-flex justify-content-between">
            <div>
                {testa ? (
                    <div>
                        <label className="text-center">
                            Légende de la photo :{' '}
                            {defaultValue !== props.description
                                ? defaultValue
                                : props.description}
                        </label>
                    </div>
                ) : (
                    <>
                        <span>Légende</span>
                        <input
                            className="ms-2"
                            type="text"
                            name="description"
                            title="description"
                            defaultValue={defaultValue}
                            onChange={(e) => inputChange(e)}
                        />
                    </>
                )}
            </div>
            <div>
                {testa ? (
                    <>
                        <Button
                            className="btn btn-primary btn-sm rounded mb-2  ms-3 bouton"
                            onClick={() => {
                                setTesta(false);
                                props.setTest(false);
                            }}
                        >
                            Modifier
                        </Button>
                        <Button
                            className="btn btn-primary btn-sm rounded mb-2  ms-3 nobouton"
                            onClick={() => {
                                setTesta(false);
                                props.setTest(false);
                            }}
                        >
                            <i
                                className="bi bi-pencil-fill"
                                onClick={() => {
                                    setTesta(false);
                                    props.setTest(false);
                                }}
                            ></i>
                        </Button>
                    </>
                ) : (
                    <>
                        <button
                            className="btn btn-success btn-sm rounded mb-2 ms-2 me-2 bouton"
                            onClick={(e) => {
                                envoi(e);
                            }}
                        >
                            Valider
                        </button>
                        <button
                            className="btn btn-success btn-sm rounded mb-2 ms-2 me-2 nobouton"
                            onClick={(e) => {
                                envoi(e);
                            }}
                        >
                            <i className="bi bi-check2"></i>
                        </button>
                        <Popconfirm
                            placement="bottom"
                            title={text}
                            onConfirm={confirm}
                            okText="Oui"
                            cancelText="Non"
                        >
                            <button className="btn btn-danger btn-sm rounded mb-2 me-2 bouton">
                                Supprimer
                            </button>
                            <button className="btn btn-danger btn-sm rounded mb-2 me-2 nobouton">
                                <i className="bi bi-trash3"></i>
                            </button>
                        </Popconfirm>{' '}
                        <button
                            className="btn btn-warning btn-sm rounded mb-2  bouton  "
                            onClick={() => {
                                props.setAffichage(undefined);
                                props.setTest(true);
                            }}
                        >
                            Retour album
                        </button>
                        <button
                            className="btn btn-warning btn-sm rounded mb-2  nobouton  "
                            onClick={() => {
                                props.setAffichage(undefined);
                                props.setTest(true);
                            }}
                        >
                            <i
                                className="bi bi-arrow-bar-left"
                                onClick={() => {
                                    props.setAffichage(undefined);
                                    props.setTest(true);
                                }}
                            ></i>
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}
