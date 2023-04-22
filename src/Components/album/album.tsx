import { useContext, useState } from 'react';
import { UserContext } from '../../Contexts/userContext';
import { albumDefault } from '../../constant/albumDefault';

export default function Album(props: {
    setPage: React.Dispatch<React.SetStateAction<string>>;
}) {
    const { user } = useContext(UserContext);
    const baseUrl = 'http://localhost:8000/api/albums';

    const [album, setAlbum] = useState(albumDefault);

    console.log('access', user.access_token);

    const inputChange = (e: React.BaseSyntheticEvent) => {
        const { name } = e.target;
        setAlbum((newAlbum) => {
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
            body: JSON.stringify(album),
        };

        fetch(baseUrl, options)
            .then((response) => response.json())
            .then((response) =>
                /*  response.statusCode === 409
                    ? alert(response.message)
                    : props.setPage('compte'),
            )  */
                console.log(response),
            )
            .catch((err) => console.error(err));
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
                                    onClick={(e) => addAlbum(e)}
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
