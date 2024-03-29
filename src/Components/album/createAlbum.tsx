import { useContext, useState } from 'react';
import { UserContext } from '../../Contexts/userContext';
import { urlAlbum } from '../../constant/generalConst';
import { TAlbums } from '../../Types/albums';
import { getUser } from '../user/compteUser/getUser';
import './../../App.css';
export default function Album(props: {
    token: string | null;
    setPage: React.Dispatch<React.SetStateAction<string>>;
}) {
    //Récupération des données du formulaire
    const { user, onUserChange } = useContext(UserContext);
    const [nameAlbum, setNameAlbum] = useState<string>();
    const [albums, setAlbums] = useState<string>();
    const [dateDebut, setDateDebut] = useState<string>();
    const [dateFin, setDateFin] = useState<string>();
    const inputChangeAlbum = (e: React.BaseSyntheticEvent) => {
        const { value } = e.target;

        setNameAlbum(value);
    };
    const inputChange = (e: React.BaseSyntheticEvent) => {
        const { value } = e.target;

        setAlbums(value);
    };

    const inputChangeDate_debut = (e: React.BaseSyntheticEvent) => {
        const { value } = e.target;

        setDateDebut(value);
    };

    const inputChangeDate_fin = (e: React.BaseSyntheticEvent) => {
        const { value } = e.target;
        setDateFin(value);
    };

    //Evite la casse en cas ou la date n'est pas renseignée
    let newDate: string;
    if (dateDebut === undefined) {
        newDate = '2023-01-01';
    } else {
        newDate = dateDebut;
    }

    let endDate: string;
    if (dateFin === undefined) {
        endDate = '2023-01-01';
    } else {
        endDate = dateFin;
    }

    const addAlbum = (e: React.BaseSyntheticEvent) => {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${user.access_token || props.token}`,
            },
            body: JSON.stringify({
                nom_album: `${nameAlbum}`,
                description: `${albums}`,
                date_debut: `${newDate}`,
                date_fin: `${endDate}`,
            }),
        };

        fetch(urlAlbum, options)
            .then((response) => response.json())
            .then((response) => {
                response.statusCode === 409
                    ? alert(response.message)
                    : addAlbumToUser(response.data);
            })
            .catch((err) => console.error(err));
    };
    const addAlbumToUser = (value: TAlbums) => {
        const newModif = { ...user };
        newModif.albums = [...newModif.albums, value];
        onUserChange(newModif);
        getUser(newModif, onUserChange);
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
                Créer un album
            </a>
            <div
                className="modal fade "
                id="exampleModal"
                tabIndex={-1}
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog ">
                    <div className="modal-content component">
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
                                <div className="">
                                    <div className="d-flex justify-content-around mb-2">
                                        <label className="form-label me-4">
                                            Nom de l'album
                                        </label>
                                        <input
                                            className=""
                                            type="text"
                                            name="nom_album"
                                            placeholder=""
                                            onChange={(e) =>
                                                inputChangeAlbum(e)
                                            }
                                        />
                                    </div>
                                    <div className="d-flex justify-content-around mb-2">
                                        <label className="form-label me-4">
                                            Date de début du séjour
                                        </label>
                                        <input
                                            className=""
                                            type="date"
                                            name="date_debut"
                                            onChange={(e) =>
                                                inputChangeDate_debut(e)
                                            }
                                        />
                                    </div>
                                    <div className="d-flex justify-content-around mb-2">
                                        <label className="form-label me-5 ">
                                            Date de fin du séjour
                                        </label>
                                        <input
                                            className=""
                                            type="date"
                                            name="date_fin"
                                            onChange={(e) =>
                                                inputChangeDate_fin(e)
                                            }
                                        />
                                    </div>

                                    <div className="d-flex justify-content-around mb-2">
                                        <label className="form-label ">
                                            Description du séjour
                                        </label>
                                        <input
                                            className=""
                                            type="textarea"
                                            name="description"
                                            placeholder=""
                                            onChange={(e) => inputChange(e)}
                                        />
                                    </div>
                                </div>
                                <button
                                    type="button"
                                    className="btn btn-primary text-center border border"
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
