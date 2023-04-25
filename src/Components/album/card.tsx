import { useContext, useState } from 'react';
import { UserContext } from '../../Contexts/userContext';

import { album, albumDefault, updateAlbum } from '../../constant/albumDefault';

import { TAlbums } from '../../Types/albums';
import { TUpdateAlbums } from '../../Types/tUpdateAlbums';
import { response } from 'express';

export default function Card() {
    /*  type PartialAlbum = Partial<TAlbums>; */
    type WithoutId = Omit<TAlbums, 'userId'>;
    const [test, setTest] = useState<string>(); //useState pour photo.
    const { user, onUserChange } = useContext(UserContext);
    const [viewNewAlbum, setViewNewAlbum] = useState(album);

    const [testb, setTestb]: any = useState();
    const [testa, setTesta]: any = useState();
    const [albumId, setAlbumId] = useState('');
    const [albumUpdated, setAlbumUpdated] = useState(
        user.albums.filter((elm) => elm.id === +albumId)[0],
    );
    /*     const [albums, setAlbum] = useState<PartialAlbum>(); */

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
    const albumsdelete = (e: React.BaseSyntheticEvent) => {
        const { title } = e.currentTarget;
        setAlbumId(title);
        setTestb(e.isTrusted);
    };

    //Update Album fonction.
    const urlAlbum = `http://localhost:8000/api/albums/${albumId}`;
    console.log(albumId);

    const updateAlb = async (e: React.BaseSyntheticEvent) => {
        e.preventDefault();

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
            })
            .catch((erreur) => `${erreur}`);

        setTesta(false); //reviens à l'affichage classique des albums.
    };

    const albumDelete = (e: React.BaseSyntheticEvent) => {
        e.preventDefault();
        const urlDelete = `http://localhost:8000/api/albums/${albumId}`;
        const options = {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${user.access_token}`,
            },
        };

        fetch(urlDelete, options)
            .then((response) => response.json())
            .then((response) => {
                alert(response.message);

                onUserChange({
                    ...user,
                    albums: user.albums.filter(
                        (elm) => elm.id !== response.data.id,
                    ),
                });
            })

            .catch((err) => console.error(err));
    };

    console.log(user);

    return (
        <div className="container">
            {/*   <img src={test} /> */}
            {user.albums.map((data: TUpdateAlbums, i) => (
                <div key={i} className="">
                    <a href="/#">
                        <div className="card" style={{ width: 18 + 'rem' }}>
                            <div className="card-body">
                                {testa ? (
                                    <input
                                        onChange={(e) => inputChange(e)}
                                        name="nom_album"
                                        type="text"
                                        defaultValue={data.nom_album}
                                    />
                                ) : (
                                    <h3 className="card-title">
                                        {viewNewAlbum.id !== data.id
                                            ? data.nom_album
                                            : viewNewAlbum.nom_album}
                                    </h3>
                                )}
                                {testa ? (
                                    <input
                                        onChange={(e) => inputChange(e)}
                                        name="date"
                                        type="text"
                                        defaultValue={data.date}
                                    />
                                ) : (
                                    <h4>
                                        {viewNewAlbum.id !== data.id
                                            ? data.date
                                            : viewNewAlbum.date}
                                    </h4>
                                )}
                                {testa ? (
                                    <input
                                        onChange={(e) => inputChange(e)}
                                        name="description"
                                        type="text"
                                        defaultValue={
                                            viewNewAlbum.id !== data.id
                                                ? data.description
                                                : viewNewAlbum.description
                                        }
                                    />
                                ) : (
                                    <p className="card-text">
                                        {viewNewAlbum.id !== data.id
                                            ? data.description
                                            : viewNewAlbum.description}
                                    </p>
                                )}
                            </div>
                        </div>
                    </a>
                    <div className="justyfy-content-around">
                        <button
                            className="btn btn-danger rounded mb-2 ms-3 me-5"
                            title={data.id.toString()}
                            onClick={(e) => {
                                albumDelete(e);
                                albumsdelete(e);
                            }}
                        >
                            <i className="bi bi-trash3"></i>
                        </button>
                        {!testa ? (
                            <button
                                className="btn btn-primary rounded mb-2 ms-5"
                                title={data.id!.toString()}
                                onClick={(e) => albumChoice(e)}
                            >
                                <i className="bi bi-pen"></i>
                            </button>
                        ) : (
                            <button
                                className="btn btn-success rounded mb-2 ms-5"
                                onClick={(e) => updateAlb(e)}
                            >
                                Valider
                            </button>
                        )}
                    </div>
                </div>
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
