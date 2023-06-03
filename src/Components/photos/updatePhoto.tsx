import { useContext, useState } from 'react';
import { AlbumContext } from '../../Contexts/albumContext';
import { updatePhoto } from '../../Types/photos';
import { photoConstant } from '../../constant/photoContant';
import { TAlbums } from '../../Types/albums';
import { Button, Popconfirm, message } from 'antd';
import { UserContext } from '../../Contexts/userContext';
import deletePhoto from './deletetPhotos';
import './../../App.css';

export default function UpdatePhoto(props: {
    description: string;
    numberPhoto: string;
    albumView: TAlbums;
    setAlbumView: React.Dispatch<TAlbums>;
    setAffichage: React.Dispatch<React.SetStateAction<string | undefined>>;
    setChange: React.Dispatch<React.SetStateAction<boolean>>;
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
    const [change, setChange] = useState(true);
    const { albumNumber } = useContext(AlbumContext);
    const { user } = useContext(UserContext);
    const token = localStorage.getItem('token');
    const [newDescription, setNewDescription] =
        useState<updatePhoto>(photoConstant);
    const inputChange = (e: React.BaseSyntheticEvent) => {
        const { value } = e.target;
        setNewDescription(value);
    };
    const [affi, setDefaultValue] = useState(
        user.albums
            .find((elm) => elm.id === +albumNumber)
            ?.photos.find((elm) => elm.id === +props.numberPhoto)?.originalName,
    );

    const descriptions = { albumId: albumNumber, description: newDescription };
    const body = JSON.stringify(descriptions);

    const options = {
        method: 'PATCH',
        headers: {
            'Content-Type': ' application/json',
            Authorization: `Bearer ${token}`,
        },
        body: body,
    };
    const test = affi !== props.description ? props.description : '';
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

    return (
        <div className="d-flex justify-content-between">
            <div>
                {change ? (
                    <div>
                        <label className="text-center">
                            Légende de la photo : {test}
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
                            defaultValue={test}
                            onChange={(e) => inputChange(e)}
                        />
                    </>
                )}
            </div>
            <div>
                {change ? (
                    <>
                        <Button
                            className="btn btn-primary btn-sm rounded-pill mb-2  ms-5 bouton"
                            onClick={() => {
                                setChange(false);
                                props.setChange(false);
                            }}
                        >
                            Modifier
                        </Button>
                        <Button
                            className="btn btn-primary btn-sm rounded-pill mb-2  ms-5  nobouton"
                            onClick={() => {
                                setChange(false);
                                props.setChange(false);
                            }}
                        >
                            <i
                                className="bi bi-pencil-fill"
                                onClick={() => {
                                    setChange(false);
                                    props.setChange(false);
                                }}
                            ></i>
                        </Button>
                    </>
                ) : (
                    <>
                        <button
                            className="btn btn-success btn-sm rounded-pill mb-2 me-2 ms-2 bouton"
                            onClick={(e) => {
                                envoi(e);
                            }}
                        >
                            Valider
                        </button>
                        <button
                            className="btn btn-success btn-sm rounded-pill mb-2 me-2 ms-5 nobouton"
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
                            <button className="btn btn-danger btn-sm rounded-pill mb-2 me-2 bouton">
                                Supprimer
                            </button>
                            <button className="btn btn-danger btn-sm rounded-pill mb-2 me-2 nobouton">
                                <i className="bi bi-trash3"></i>
                            </button>
                        </Popconfirm>
                    </>
                )}
            </div>
        </div>
    );
}
