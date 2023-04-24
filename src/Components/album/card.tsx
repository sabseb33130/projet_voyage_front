import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../Contexts/userContext';
import { UpdateAlbumsContext } from '../../Contexts/albumContext';
import { albumUpdate } from '../../constant/albumDefault';
import { response } from 'express';

export default function Card() {
    const [test, setTest] = useState<string>(); //useState pour photo.
    const { user } = useContext(UserContext);
    const [testa, setTesta]: any = useState();
    const [albumId, setAlbumId] = useState('');
    const [albumUpdated, setAlbumUpdated] = useState(albumUpdate);
    //fonction permettant de récupérer les noms et les valeurs nécessaire au fonctionnement du body update.
    const inputChange = (e: React.BaseSyntheticEvent) => {
        const { name } = e.target;

        setAlbumUpdated((albumUp) => {
            return { ...albumUp, [name]: e.target.value };
        });
    };
    //fonction changeant les boutons et devant permettre de récupérer l'id
    const albumChoice = (e: React.BaseSyntheticEvent) => {
        const { title } = e.currentTarget;

        setAlbumId(title);
        setTesta(e.isTrusted);
    };

    const urlAlbum = `http://localhost:8000/api/albums/${albumId}`;
    const updateAlb = (e: React.BaseSyntheticEvent) => {
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
            .then((donnee) =>
                /*  setAlbum(donnee.data.userUpdate) */ console.log(donnee),
            )
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
            .then((response) => alert(response.message))
            .catch((err) => console.error(err));
    };
    return (
        <div className="container">
            <img src={test} />
            {user.albums.map((data, i) => (
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
                                        {data.nom_album}
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
                                    <h4>{data.date}</h4>
                                )}
                                {testa ? (
                                    <input
                                        onChange={(e) => inputChange(e)}
                                        name="description"
                                        type="text"
                                        defaultValue={data.description}
                                    />
                                ) : (
                                    <p className="card-text">
                                        {data.description}
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
                                albumChoice(e);
                            }}
                        >
                            <i className="bi bi-trash3"></i>
                        </button>
                        {!testa ? (
                            <button
                                className="btn btn-primary rounded mb-2 ms-5"
                                title={data.id.toString()}
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
