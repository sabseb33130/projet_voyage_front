import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../Contexts/userContext';
import { AlbumContext } from '../../Contexts/albumContext';
import deleteAlbum from './deleteAlbum';
import { TAlbums } from '../../Types/albums';
import updateAlbums from './updateAlbum';
import AddPhotos from '../photos/addPhotos';
import { Button, message, Popconfirm } from 'antd';

import './card.css';
import ViewPhoto from './viewPhoto';
export default function ViewAlbum(props: {
    token: string | null;
    setPage: React.Dispatch<React.SetStateAction<string>>;
}) {
    const { user, onUserChange } = useContext(UserContext);
    const { albumNumber } = useContext(AlbumContext);
    let [choice, setChoice]: any = useState();
    let [choice1, setChoice1]: any = useState();
    const testa = (e: React.BaseSyntheticEvent) => {
        setChoice1(e.isTrusted);
    };
    const test = (e: React.BaseSyntheticEvent) => {
        setChoice(e.isTrusted);
    };

    const [albumUpdated, setAlbumUpdated] = useState<TAlbums | undefined>(
        user.albums.filter((elm) => elm.id === +albumNumber)[0],
    );
    //fonction permettant de récupérer les noms et les valeurs nécessaire au fonctionnement du body update.
    const inputChange = (e: React.BaseSyntheticEvent) => {
        const { name } = e.target;
        setAlbumUpdated((albumUpdated) => {
            return { ...albumUpdated!, [name]: e.target.value };
        });
    };

    //pop confirm suppr album

    const text = `Êtes-vous sûr de vouloir suprimer l'album ${albumUpdated?.nom_album}?`;
    const description = `du ${albumUpdated?.date_debut} au ${albumUpdated?.date_fin},
     ${albumUpdated?.description}`;

    const confirm = () => {
        message.info(`${albumUpdated?.nom_album} supprimé`);
        deleteAlbum(albumUpdated!.id.toString(), user, onUserChange);
    };

    const [albumView, setAlbumView] = useState(
        user.albums.filter((elm) => elm.id === +albumNumber)[0],
    );
    useEffect(() => {
        setAlbumView(user.albums.filter((elm) => elm.id === +albumNumber)[0]);
    }, [user]);
    const verifPhoto = String(albumView.photos.length >= 1);
    console.log(verifPhoto);

    return (
        <div>
            {!choice1 ? (
                <div>
                    <button
                        className="btn btn-warning btn-sm mb-2 ms-3 mt-3 me-2"
                        onClick={(e) => {
                            props.setPage('compte');
                        }}
                    >
                        retour
                    </button>
                    <button
                        className="btn btn-success btn-sm mb-2 ms-3 mt-3 me-2"
                        onClick={(e) => testa(e)}
                    >
                        Gérer mon album
                    </button>
                </div>
            ) : (
                <div>
                    {choice ? (
                        <>
                            <button
                                className="btn btn-success btn-sm rounded mb-2 ms-3  mt-3 me-2"
                                onClick={() => {
                                    setChoice(false);
                                    updateAlbums(
                                        albumUpdated!,
                                        user,
                                        onUserChange,
                                        albumNumber,
                                    );
                                }}
                            >
                                Valider
                            </button>
                            <button className="btn btn-warning btn-sm rounded mb-2 ms-3   mt-3 me-2">
                                <i
                                    className="bi bi-arrow-counterclockwise"
                                    onClick={() => setChoice(false)}
                                ></i>
                            </button>
                        </>
                    ) : (
                        <>
                            <button
                                className="btn btn-warning btn-sm mb-2 ms-3 mt-3 me-2"
                                onClick={() => setChoice1(false)}
                            >
                                retour
                            </button>
                            <button
                                className="btn btn-primary btn-sm rounded mb-2 me-2"
                                title={albumUpdated!.id.toString()}
                                onClick={(e) => {
                                    test(e);
                                }}
                            >
                                Modifier
                            </button>
                            <Popconfirm
                                className="btn btn-danger btn-sm rounded mb-2 "
                                placement="bottom"
                                title={text}
                                description={description}
                                onConfirm={confirm}
                                okText="Oui"
                                cancelText="Non"
                            >
                                <Button className="btn btn-danger btn-sm rounded mb-2 ">
                                    Supprimer
                                </Button>
                            </Popconfirm>
                        </>
                    )}
                    <AddPhotos token={props.token} setPage={props.setPage} />
                </div>
            )}
            <div className="mb-3">
                {choice ? (
                    <>
                        <h3>Modification de l'album</h3>
                        <label>Nom de l'album</label>
                        <input
                            onChange={(e) => inputChange(e)}
                            className="text-center"
                            name="nom_album"
                            type="text"
                            defaultValue={albumUpdated!.nom_album}
                        />
                        <br />
                        <label>Date de début</label>
                        <input
                            onChange={(e) => inputChange(e)}
                            className="text-center"
                            name="date_debut"
                            type="date"
                            defaultValue={albumUpdated!.date_debut}
                        />
                        <br />
                        <label>Date de fin</label>
                        <input
                            onChange={(e) => inputChange(e)}
                            className="text-center"
                            name="date_fin"
                            type="date"
                            defaultValue={albumUpdated!.date_fin}
                        />
                        <br />
                        <label>Description</label>
                        <input
                            onChange={(e) => inputChange(e)}
                            className="text-center"
                            name="description"
                            type="text"
                            defaultValue={albumUpdated!.description}
                        />
                    </>
                ) : (
                    <>
                        <h3 className="text-center">
                            Nom de l'album : {albumUpdated!.nom_album}
                        </h3>
                        <h5>date de début : {albumUpdated!.date_debut}</h5>
                        <h5>date de fin: {albumUpdated!.date_fin}</h5>
                        <h5>Description : {albumUpdated!.description}</h5>
                    </>
                )}
            </div>
            <div className="d-flex justify-content-around">
                {verifPhoto !== 'true' ? (
                    `Pas de photo pour l'instants dans cette album`
                ) : (
                    <ViewPhoto
                        albumView={albumView}
                        token={props.token}
                        setPage={props.setPage}
                    />
                )}
            </div>
        </div>
    );
}
