import { useContext, useState } from 'react';
import { UserContext } from '../../Contexts/userContext';
import { TAlbums } from '../../Types/albums';
import { AlbumContext } from '../../Contexts/albumContext';
import { album } from '../../constant/albumDefault';
import { log } from 'console';
import deleteAlbum from './deleteAlbum';

export default function UpdateAlbum(props: {
    setPage: React.Dispatch<React.SetStateAction<string>>;
}) {
    /*  const { user, onUserChange } = useContext(UserContext);
    const { albumNumber } = useContext(AlbumContext);
    const [viewNewAlbum, setViewNewAlbum] = useState(album);
    let [testa, setTesta]: any = useState();
    const [albumUpdated, setAlbumUpdated] = useState<TAlbums>(
        user.albums.filter((elm) => elm.id === +albumNumber)[0],
    );
    console.log(albumUpdated);

    const inputChange = (e: React.BaseSyntheticEvent) => {
        const { name } = e.target;

        setAlbumUpdated((albumUpdated) => {
            return { ...albumUpdated, [name]: e.target.value };
        });
    };
    const updateAlb = async (e: React.BaseSyntheticEvent) => {
        e.preventDefault();
        const urlAlbum = `http://localhost:8000/api/albums/${albumUpdated.id}`;
        const jsonAlbum = JSON.stringify(albumUpdated);

        const options = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${user.access_token}`,
            },
            body: jsonAlbum,
        };

        fetch(urlAlbum, options)
            .then((response) => response.json())
            .then((donnee) => {
                setViewNewAlbum(donnee.data);
                alert(donnee.message);
                props.setPage('compte');
            })
            .catch((erreur) => `${erreur}`);

        setTesta(false); //reviens à l'affichage classique des albums.
    };
    console.log(viewNewAlbum);
    console.log(albumNumber.id);

    return (
        <div>
            {testa ? (
                <>
                    <div>
                        <input
                            onChange={(e) => inputChange(e)}
                            name="nom_album"
                            type="text"
                            defaultValue={
                                albumUpdated === undefined
                                    ? 'rien'
                                    : albumUpdated.date
                            }
                        />
                    </div>
                    <div>
                        <input
                            onChange={(e) => inputChange(e)}
                            name="nom_album"
                            type="text"
                            defaultValue={
                                albumUpdated === undefined
                                    ? 'rien'
                                    : albumUpdated.description
                            }
                        />
                    </div>
                    <button
                        className="btn btn-danger rounded mb-2 mx-auto "
                        title={albumUpdated.id.toString()}
                        onClick={async () => {
                            deleteAlbum(
                                albumNumber.id.toString(),
                                user,
                                onUserChange,
                            );
                        }}
                    >
                        <i className="bi bi-trash3"></i>
                    </button>
                    <button
                        className="btn btn-success rounded mb-2 ms-3 me-2"
                        onClick={(e) => {
                            updateAlb(e);
                        }}
                    >
                        Valider
                    </button>
                    <button className="btn btn-warning rounded mb-2 ms-3 me-2">
                        <i
                            className="bi bi-arrow-counterclockwise"
                            onClick={() => setTesta(false)}
                        ></i>
                    </button>
                </>
            ) : (
                <div>
                    <button
                        className="btn btn-primary rounded mb-2 mx-auto"
                        title={albumNumber.toString()}
                        onClick={(e) => {
                            setTesta(e.isTrusted);
                        }}
                    >
                        <i className="bi bi-pen"></i>
                    </button>
                </div>
            )}
        </div>
    ); */
}
