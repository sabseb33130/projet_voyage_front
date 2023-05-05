import { useContext, useState } from 'react';
import { UserContext } from '../../Contexts/userContext';
import { updateAlbum } from '../../constant/albumDefault';
import { urlAlbum } from '../../constant/generalConst';
import { TAlbums } from '../../Types/albums';
import { getUser } from '../user/compteUser/getUser';

export default function Album(props: {
    token: string | null;
    setPage: React.Dispatch<React.SetStateAction<string>>;
}) {
    const { user, onUserChange } = useContext(UserContext);
    const [albums, setAlbums] = useState(updateAlbum);

    const inputChange = (e: React.BaseSyntheticEvent) => {
        const { name } = e.target;
        setAlbums((newAlbum) => {
            return { ...newAlbum, [name]: e.target.value };
        });
    };
    console.log(albums);

    const addAlbum = (e: React.BaseSyntheticEvent) => {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${user.access_token || props.token}`,
            },
            body: JSON.stringify(albums),
        };
        fetch(urlAlbum, options)
            .then((response) => response.json())
            .then((response) => {
                response.statusCode === 409
                    ? alert(response.message)
                    : addAlbumToUser(response.data);
                console.log(response);
            })

            .catch((err) => console.error(err));
    };

    const addAlbumToUser = (value: TAlbums) => {
        const newModif = { ...user };
        newModif.albums = [...newModif.albums, value];
        onUserChange(newModif);
        getUser(props.token, user, onUserChange);
    };

    return (
        <>
            <a
                href="/#"
                type="button"
                className="border border-0 me-4 mt-2  text-primary"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
            >
                Création d'un album
            </a>
            <div
                className="modal fade"
                id="exampleModal"
                tabIndex={-1}
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1
                                className="modal-title fs-5"
                                id="exampleModalLabel"
                            >
                                Ajout d'un album
                            </h1>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-5">
                                    <p>
                                        <label className="form-label me-3">
                                            Nom de l'album
                                        </label>
                                        <input
                                            className="ms-1"
                                            type="text"
                                            name="nom_album"
                                            placeholder="nom_album"
                                            onChange={(e) => inputChange(e)}
                                        />
                                    </p>
                                    <br />
                                    <p>
                                        <label className="form-label me-2">
                                            Date de début du séjour
                                        </label>
                                        <input
                                            className="ms-1"
                                            type="date"
                                            name="date_debut"
                                            placeholder="facultative"
                                            onChange={(e) => inputChange(e)}
                                        />
                                    </p>
                                    <br />
                                    <p>
                                        <label className="form-label me-3">
                                            Date de fin du séjour
                                        </label>
                                        <input
                                            className="ms-1"
                                            type="date"
                                            name="date_fin"
                                            placeholder="facultative"
                                            onChange={(e) => inputChange(e)}
                                        />
                                    </p>
                                    <br />
                                    <p>
                                        <label className="form-label me-3">
                                            Description du séjour
                                        </label>
                                        <input
                                            className="ms-1"
                                            type="textarea"
                                            name="description"
                                            placeholder="Description"
                                            onChange={(e) => inputChange(e)}
                                        />
                                    </p>
                                </div>
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    data-bs-dismiss="modal"
                                    onClick={(e) => {
                                        addAlbum(e);
                                        props.setPage('compte');
                                    }}
                                >
                                    Ajouter
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
