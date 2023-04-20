import { useContext, useState } from 'react';
import { TokenContext } from '../../Contexts/tokenContext';

export default function Album() {
    const { access_token } = useContext(TokenContext);
    const baseUrl = 'http://localhost:8000/api/albums';
    const dataAlbum = {
        nom_album: '',
        date: '',
    };

    const [nom_album, setAlbum] = useState('');
    const [date, setAlbumDate] = useState('');

    const inputChangeAlbum = (e: React.BaseSyntheticEvent) => {
        const { value } = e.target;
        setAlbum(value);
    };
    const inputChangeDate = (e: React.BaseSyntheticEvent) => {
        const { value } = e.target;
        setAlbumDate(value);
    };
    const addAlbum = (e: React.BaseSyntheticEvent) => {
        /*     const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorisation: `Bearer ${access_token}`,
            },
            body: JSON.stringify({ nom_album, date }),
        };
        console.log(options);
        console.log(access_token);

        fetch(baseUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorisation: `Bearer ${access_token}`,
            },
            body: JSON.stringify({ nom_album, date }),
        })
            .then((response) => response.json())
            .then((response) => console.log(response))
            .catch((err) => console.log(err));
     */
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization:
                    'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImplYW5zZWIxIiwic3ViIjoxLCJpYXQiOjE2ODE0ODk1MjB9.4HWKtm421Jkzy877AKbneGaNm4rQycUot9XvEWJ8-bA',
            },
            body: '{"nom_album":"noumea","date":"2023-08-15"}',
        };

        fetch('http://localhost:8000/api/albums', options)
            .then((response) => response.json())
            .then((response) => console.log(response))
            .catch((err) => console.error(err));
    };
    return (
        <>
            <a
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
                                <div className="mb-3">
                                    <label className="form-label">
                                        Nom de l'album
                                    </label>
                                    <input
                                        type="text"
                                        name="nom_album"
                                        placeholder="nom_album"
                                        onChange={(e) => inputChangeAlbum(e)}
                                    />
                                    <label className="date">
                                        Date du séjour
                                    </label>
                                    <input
                                        type="date"
                                        name="date"
                                        placeholder="date"
                                        onChange={(e) => inputChangeDate(e)}
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
