import { useContext, useState } from 'react';
import { UserContext } from '../../Contexts/userContext';
import { AlbumContext } from '../../Contexts/albumContext';
import deleteAlbum from './deleteAlbum';
import { TAlbums } from '../../Types/albums';
import updateAlbums from './updateAlbum';
import AddPhotos from '../photos/addPhotos';
import { message, Popconfirm } from 'antd';
import ViewPhoto from './viewPhoto';
import './../../App.css';
export default function ViewAlbum(props: {
    token: string | null;
    setPage: React.Dispatch<React.SetStateAction<string>>;
}) {
    const { user, onUserChange } = useContext(UserContext);
    const { albumNumber } = useContext(AlbumContext);
    let [choice, setChoice]: any = useState();
  
    const choicing = (e: React.BaseSyntheticEvent) => {
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
        props.setPage('compte');
    };
    const [albumView, setAlbumView] = useState(
        user.albums.filter((elm) => elm.id === +albumNumber)[0],
    );
    let verifPhoto: string;
    if (albumView.photos === undefined) {
        verifPhoto = 'undefined';
    } else if (albumView.photos.length === undefined) {
        verifPhoto = 'undefined';
    } else {
        verifPhoto = String(albumView.photos.length > 0);
    }
    return (
        <div>
            <div className="alignement">
                {choice ? (
                    <>
                        <button className="btn btn-warning btn-sm rounded-pill mt-2 me-2 nobouton">
                            <i
                                className="bi bi-arrow-bar-left"
                                onClick={() => setChoice(false)}
                            ></i>
                        </button>
                        <button
                            className="btn btn-warning btn-sm rounded-pill mt-2 me-2 ms-2 bouton"
                            onClick={() => setChoice(false)}
                        >
                            retour
                        </button>
                        <button
                            className="btn btn-success btn-sm rounded-pill mt-2 me-2 bouton"
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
                        <button
                            className="btn btn-success btn-sm rounded-pill mt-2 me-2 nobouton"
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
                            <i
                                className="bi bi-check2"
                                onClick={() => {
                                    setChoice(false);
                                    updateAlbums(
                                        albumUpdated!,
                                        user,
                                        onUserChange,
                                        albumNumber,
                                    );
                                }}
                            ></i>
                        </button>
                    </>
                ) : (
                    <>
                        <button
                            className="btn btn-warning btn-sm  rounded-pill mt-2 ms-2 me-1  bouton"
                            onClick={() => {
                                props.setPage('compte');
                            }}
                        >
                            retour
                        </button>
                        <button
                            className="btn btn-warning btn-sm  rounded-pill mt-2 ms-2 me-1 nobouton"
                            onClick={() => {
                                props.setPage('compte');
                            }}
                        >
                            <i
                                className="bi bi-arrow-bar-left"
                                onClick={() => {
                                    props.setPage('compte');
                                }}
                            ></i>
                        </button>
                        <button
                            className="btn btn-primary btn-sm rounded-pill mt-2 me-1 bouton"
                            title={albumUpdated!.id.toString()}
                            onClick={(e) => {
                                choicing(e);
                            }}
                        >
                            Modifier l'album
                        </button>
                        <button
                            className="btn btn-primary btn-sm rounded-pill mt-2  me-1 nobouton"
                            title={albumUpdated!.id.toString()}
                            onClick={(e) => {
                                choicing(e);
                            }}
                        >
                            <i
                                className="bi bi-pencil-fill "
                                onClick={(e) => {
                                    choicing(e);
                                }}
                            ></i>
                        </button>
                        <Popconfirm
                            className=" mx-auto"
                            placement="bottom"
                            title={text}
                            description={description}
                            onConfirm={confirm}
                            okText="Oui"
                            cancelText="Non"
                        >
                            <button className="btn btn-danger btn-sm rounded-pill mt-2 me-1 bouton">
                                Supprimer l'album
                            </button>
                            <button className="btn btn-danger btn-sm rounded-pill mt-2  me-1 nobouton">
                                <i className="bi bi-trash3"></i>
                            </button>
                        </Popconfirm>
                    </>
                )}
                <AddPhotos
                    token={props.token}
                    setPage={props.setPage}
                    albumView={albumView}
                    setAlbumView={setAlbumView}
                />
            </div>

            <div className="">
                {choice ? (
                    <>
                        <h3>Modification de l'album </h3>
                        <label>Nom de l'album :</label>{' '}
                        <input
                            onChange={(e) => inputChange(e)}
                            className="text-center ms-2"
                            name="nom_album"
                            type="text"
                            defaultValue={albumUpdated!.nom_album}
                        />
                        <br />
                        <label>Date de début :</label>{' '}
                        <input
                            onChange={(e) => inputChange(e)}
                            className="text-center ms-4 mt-1"
                            name="date_debut"
                            type="date"
                            defaultValue={albumUpdated!.date_debut}
                        />
                        <br />
                        <label>Date de fin :</label>{' '}
                        <input
                            onChange={(e) => inputChange(e)}
                            className="text-center mt-1 ms-5"
                            name="date_fin"
                            type="date"
                            defaultValue={albumUpdated!.date_fin}
                        />
                        <br />
                        <label>Description : </label>{' '}
                        <input
                            onChange={(e) => inputChange(e)}
                            className="text-center mb-2 mt-1 ms-4"
                            name="description"
                            type="text"
                            defaultValue={albumUpdated!.description}
                        />
                    </>
                ) : (
                    <>
                        <div className="mb-3 ms-3 mt-3">
                            <h3 className="text-center mt-4">
                                {albumUpdated!.nom_album}
                            </h3>
                            <p className="fs-6">
                                {albumUpdated?.date_debut === '1000-01-01'
                                    ? ''
                                    : `date de début : ${
                                          albumUpdated!.date_debut
                                      }`}

                                {albumUpdated?.date_fin === '1000-01-01' ? (
                                    ''
                                ) : (
                                    <div>{`date de fin: ${
                                        albumUpdated!.date_fin
                                    }`}</div>
                                )}

                                {albumUpdated!.description === null ? (
                                    ''
                                ) : (
                                    <>
                                        {`Description: ${albumUpdated?.description}`}
                                    </>
                                )}
                            </p>
                            <p className=" font">
                                cliquez sur la photo, pour la Supprimer
                                <br /> ou lui ajouter une légende
                            </p>
                        </div>
                    </>
                )}
            </div>
            <div className="d-flex justify-content-around flex-wrap">
                {verifPhoto === 'false' || verifPhoto === 'undefined' ? (
                    `Pas de photo pour l'instant dans cette album`
                ) : (
                    <ViewPhoto
                        albumView={albumView}
                        token={props.token}
                        setPage={props.setPage}
                        setAlbumView={setAlbumView}
                    />
                )}
            </div>
        </div>
    );
}
