import { useContext, useState } from 'react';
import { UserContext } from '../../Contexts/userContext';
import { updateAlbum } from '../../constant/albumDefault';
import { urlAlbum } from '../../constant/generalConst';
import { TAlbums } from '../../Types/albums';

export default function Album(props: {
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

    const addAlbum = (e: React.BaseSyntheticEvent) => {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${user.access_token}`,
            },
            body: JSON.stringify(albums),
        };
        fetch(urlAlbum, options)
            .then((response) => response.json())
            .then((response) =>
                response.statusCode === 409
                    ? alert(response.message)
                    : addAlbumToUser(response.data),
            )

            .catch((err) => console.error(err));
    };

    const addAlbumToUser = (value: TAlbums) => {
        const newModif = { ...user };
        newModif.albums = [...newModif.albums, value];
        onUserChange(newModif);
    };

    return (
        <>
            <a
                href="/#"
                type="button"
                className="border border-0 me-5 mt-2  text-primary"
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
                                    <label className="form-label me-3">
                                        Nom de l'album
                                    </label>
                                    <input
                                        type="text"
                                        name="nom_album"
                                        placeholder="nom_album"
                                        onChange={(e) => inputChange(e)}
                                    />
                                    <br />

                                    <label className="form-label me-3">
                                        Date du séjour
                                    </label>
                                    <input
                                        type="date"
                                        name="date"
                                        placeholder="date"
                                        onChange={(e) => inputChange(e)}
                                    />
                                    <br />
                                    <label className="form-label me-3">
                                        Description du séjour
                                    </label>
                                    <input
                                        type="textarea"
                                        name="description"
                                        placeholder="Description"
                                        onChange={(e) => inputChange(e)}
                                    />
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
