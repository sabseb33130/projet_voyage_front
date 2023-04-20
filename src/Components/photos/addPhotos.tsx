import { useEffect, useContext, useState } from 'react';
import { TokenContext } from '../../Contexts/tokenContext';

export default function AddPhotos() {
    const [files, setFiles] = useState('');
    const [albumId, setalbumId] = useState(0);
    const baseUrl = 'http://localhost:8000/api/photos/uploads';

    const { access_token } = useContext(TokenContext);

    const handleMouseUp = (e: MouseEvent) => {
        const container = document.getElementById('container') as HTMLElement;
        if (!container.contains(e.target as Node)) {
            container.style.display = 'none';
        }
    };

    useEffect(() => {
        document.addEventListener('mouseup', handleMouseUp);
        return () => {
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, []);

    const addPhotos = (e: React.BaseSyntheticEvent) => {
        const { value } = e.target;

        setFiles(value);
    };

    const addAlbumId = (e: React.BaseSyntheticEvent) => {
        const { value } = e.target;

        setalbumId(value);
    };
    console.log(albumId);

    const postPhoto = (e: React.BaseSyntheticEvent) => {
        e.preventDefault();
        var myHeaders = new Headers();
        myHeaders.append('Authorization', `Bearer ${access_token}`);
        var blob = new Blob([files], { type: 'image/png' });
        var formdata = new FormData();
        formdata.append('file', blob, `${files}`);
        formdata.append('albumId', `${albumId}`);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
        };

        fetch(baseUrl, requestOptions)
            .then((response) => response.json())
            .then((result) => console.log(result))
            .catch((error) => console.log('error', error));
    };
    return (
        <>
            <a
                type="button"
                className="border border-0 me-5 mt-2  text-primary"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal1"
            >
                Ajouter des photos
            </a>
            <div className="modal-dialog modal-dialog-centered">
                <div
                    className="modal fade"
                    id="exampleModal1"
                    tabIndex={-1}
                    aria-labelledby="exampleModalLabel1"
                    aria-hidden="true"
                >
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1
                                    className="modal-title fs-5"
                                    id="exampleModalLabel1"
                                >
                                    Ajout de photo
                                </h1>
                                <button
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                ></button>
                            </div>
                            <div className="modal-body">
                                <form
                                    className="row"
                                    encType="multipart/form-data"
                                    method="post"
                                >
                                    <div className="mb-3 col">
                                        <label
                                            htmlFor="file"
                                            className="form-label"
                                        >
                                            choisir un dossier
                                        </label>
                                        <input
                                            className="mt-5"
                                            type="file"
                                            name="file"
                                            required
                                            onChange={(e) => addPhotos(e)}
                                        />
                                    </div>
                                    <div className="mb-3 col">
                                        <label
                                            htmlFor="nomAlbum"
                                            className="form-label"
                                        >
                                            Nom de l'album
                                        </label>
                                        <input
                                            className="mt-5"
                                            type="text"
                                            id="mon album"
                                            onChange={(e) => addAlbumId(e)}
                                        />
                                    </div>

                                    <button
                                        type="button"
                                        className="btn btn-primary btn-sm mx-auto rounded-pill"
                                        onClick={(e) => postPhoto(e)}
                                    >
                                        valider
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
