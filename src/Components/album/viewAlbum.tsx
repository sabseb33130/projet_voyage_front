import { useContext, useState } from 'react';
import { UserContext } from '../../Contexts/userContext';
import { AlbumContext } from '../../Contexts/albumContext';
import deleteAlbum from './deleteAlbum';
import { TAlbums } from '../../Types/albums';
import updateAlbums from './updateAlbum';
import AddPhotos from '../photos/addPhotos';
import { Button, message, Popconfirm } from 'antd';
export default function ViewAlbum(props: {
    setPage: React.Dispatch<React.SetStateAction<string>>;
}) {
    const { user, onUserChange } = useContext(UserContext);
    const { albumNumber } = useContext(AlbumContext);
    let [choice, setChoice]: any = useState();

    const test = (e: React.BaseSyntheticEvent) => {
        setChoice(e.isTrusted);
    };

    const [albumUpdated, setAlbumUpdated] = useState<TAlbums>(
        user.albums.filter((elm) => elm.id === +albumNumber)[0],
    );
    //fonction permettant de récupérer les noms et les valeurs nécessaire au fonctionnement du body update.
    const inputChange = (e: React.BaseSyntheticEvent) => {
        const { name } = e.target;
        setAlbumUpdated((albumUpdated) => {
            return { ...albumUpdated, [name]: e.target.value };
        });
    };

    //pop confirm suppr album

    const text = `Êtes-vous sûr de vouloir suprimer l'album ${albumUpdated.nom_album}?`;
    const description = `${albumUpdated.date} ${albumUpdated.description}`;

    const confirm = () => {
        message.info(`${albumUpdated.nom_album} supprimé`);
        deleteAlbum(albumUpdated.id.toString(), user, onUserChange);
    };
    return (
        <div>
            <button
                className="btn btn-warning btn-sm mb-2 ms-3 mt-3 me-2"
                onClick={(e) => {
                    props.setPage('compte');
                }}
            >
                retour
            </button>
            {choice ? (
                <>
                    <button
                        className="btn btn-success btn-sm rounded mb-2 ms-3  mt-3 me-2"
                        onClick={() => {
                            setChoice(false);
                            updateAlbums(
                                albumUpdated,
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
                        className="btn btn-primary btn-sm rounded mb-2 me-2"
                        title={albumUpdated.id.toString()}
                        onClick={(e) => {
                            test(e);
                        }}
                    >
                        Modifier
                        {/* <i className="bi bi-pen"></i> */}
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
                    {/*     <button
                        className="btn btn-danger rounded mb-2 "
                        title={albumUpdated.id.toString()}
                        onClick={async () => {
                            deleteAlbum(
                                albumUpdated.id.toString(),
                                user,
                                onUserChange,
                            );
                        }}
                    >
                        <i className="bi bi-trash3"></i>
                    </button> */}
                </>
            )}
            <AddPhotos setPage={props.setPage} />
            {choice ? (
                <>
                    <h3>Modification de l'album</h3>
                    <label>Nom de l'album</label>
                    <input
                        onChange={(e) => inputChange(e)}
                        className="text-center"
                        name="nom_album"
                        type="text"
                        defaultValue={albumUpdated.nom_album}
                    />
                    <br />
                    <label>Date</label>
                    <input
                        onChange={(e) => inputChange(e)}
                        className="text-center"
                        name="date"
                        type="date"
                        defaultValue={albumUpdated.date}
                    />
                    <br />
                    <label>Description</label>
                    <input
                        onChange={(e) => inputChange(e)}
                        className="text-center"
                        name="description"
                        type="text"
                        defaultValue={albumUpdated.description}
                    />
                </>
            ) : (
                <>
                    <h3 className="text-center">
                        Nom de l'album : {albumUpdated.nom_album}
                    </h3>
                    <h5>date : {albumUpdated.date}</h5>
                    <h5>Description : {albumUpdated.description}</h5>
                </>
            )}
            {albumUpdated.photos.map((data, j) => (
                <img key={j} src={data.photo} alt={data.photo} />
            ))}
        </div>
    );
}