import { useContext, useState } from 'react';
import { UserContext } from '../../Contexts/userContext';
import { album } from '../../constant/albumDefault';
import { TUpdateAlbums } from '../../Types/tUpdateAlbums';
import { TAlbums } from '../../Types/albums';
import deleteAlbum from './deleteAlbum';
import AddPhotos from '../photos/addPhotos';
import { AlbumContext } from '../../Contexts/albumContext';
import UpdateAlbum from './updateAlbum';

export default function Card(props: {
    setPage: React.Dispatch<React.SetStateAction<string>>;
}) {
    // const [test, setTest] = useState<string>(); //useState pour photo.
    const { user, onUserChange } = useContext(UserContext);

    const [viewNewAlbum, setViewNewAlbum] = useState(album);
    const { setAlbum } = useContext(AlbumContext);
    let [testa, setTesta]: any = useState();
    const [albumId, setAlbumId] = useState('');
    const [albumUpdated, setAlbumUpdated] = useState<TAlbums>(
        user.albums.filter((elm) => elm.id === +albumId)[0],
    );

    //fonction permettant de récupérer les noms et les valeurs nécessaire au fonctionnement du body update.
    const inputChange = (e: React.BaseSyntheticEvent) => {
        const { name } = e.target;

        setAlbumUpdated((albumUpdated) => {
            return { ...albumUpdated, [name]: e.target.value };
        });
    };
    //fonction changeant les boutons et devant permettre de récupérer l'id
    const albumChoice = (e: React.BaseSyntheticEvent) => {
        const { title } = e.currentTarget;

        setAlbumId(title);
        setTesta(e.isTrusted);
    };

    const albumCont = (e: React.BaseSyntheticEvent) => {
        const { title } = e.currentTarget;

        setAlbum(title);
    };

    const updateAlb = async (e: React.BaseSyntheticEvent) => {
        e.preventDefault();
        const urlAlbum = `http://localhost:8000/api/albums/${albumId}`;
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

    return (
        <div className="container">
            {/*   <img src={test} /> */}
            {user.albums.map((data: TUpdateAlbums, i) => (
                <>
                    <AddPhotos
                        setPage={props.setPage}
                        albumId={data.id.toString()}
                    />
                    <div className="card" key={i} style={{ width: 18 + 'rem' }}>
                        {/*  <a
                            href="./#"
                            onClick={(e) => {
                                props.setPage('photos');
                                albumCont(e);
                            }}
                            key={i}
                            className=""
                            title={data.id.toString()}
                        > */}
                        <div className="card-body">
                            {testa && albumId ? (
                                <input
                                    onChange={(e) => inputChange(e)}
                                    name="nom_album"
                                    type="text"
                                    defaultValue={
                                        data.id! !== viewNewAlbum.id!
                                            ? data.nom_album
                                            : viewNewAlbum.nom_album
                                    }
                                />
                            ) : (
                                <h3 className="card-title">
                                    {data.id !== viewNewAlbum.id
                                        ? data.nom_album
                                        : viewNewAlbum.nom_album}
                                </h3>
                            )}
                            {testa && albumId ? (
                                <input
                                    onChange={(e) => inputChange(e)}
                                    name="date"
                                    type="text"
                                    defaultValue={
                                        data.id! !== viewNewAlbum.id!
                                            ? data.date
                                            : viewNewAlbum.date
                                    }
                                />
                            ) : (
                                <h4>
                                    {data.id !== viewNewAlbum.id
                                        ? data.date
                                        : viewNewAlbum.date}
                                </h4>
                            )}
                            {testa && albumId ? (
                                <input
                                    onChange={(e) => inputChange(e)}
                                    name="description"
                                    type="text"
                                    defaultValue={
                                        data.id! !== viewNewAlbum.id!
                                            ? viewNewAlbum.description
                                            : data.description
                                    }
                                />
                            ) : (
                                <p className="card-text">
                                    {data.id! !== viewNewAlbum.id!
                                        ? data.description
                                        : viewNewAlbum.description}
                                </p>
                            )}
                        </div>
                        {/*  </a>{' '} */}
                    </div>{' '}
                    <div
                        className="d-flex justify-content-start"
                        style={{ width: 18 + 'rem' }}
                    >
                        <button
                            className="btn btn-danger rounded mb-2 mx-auto "
                            title={data.id.toString()}
                            onClick={async () => {
                                deleteAlbum(
                                    data.id.toString(),
                                    user,
                                    onUserChange,
                                );
                            }}
                        >
                            <i className="bi bi-trash3"></i>
                        </button>
                        {!testa ? (
                            <>
                                <button
                                    className="btn btn-primary rounded mb-2 mx-auto"
                                    title={data.id!.toString()}
                                    onClick={(e) => {
                                        albumChoice(e);
                                        albumCont(e);
                                    }}
                                >
                                    <i className="bi bi-pen"></i>
                                </button>
                            </>
                        ) : (
                            <>
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
                        )}
                    </div>
                </>
            ))}
        </div>
    );
}
/*   let myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${user.access_token}`);
  

    const baseUrl = `http://localhost:8000/api/photos/file/2`;
    let requestOptions = {
        method: 'GET',
        headers: myHeaders,
    };
    useEffect(() => {
        fetch(baseUrl, requestOptions)
            .then((response) => response.blob())
            .then((result) => {
                setTest(URL.createObjectURL(result));
            });
    }, []);
    console.log(test);
 */
