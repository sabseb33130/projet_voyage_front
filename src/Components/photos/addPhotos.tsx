import { useContext, useState } from 'react';
import { UserContext } from '../../Contexts/userContext';
import { photoUrl } from '../../constant/generalConst';
import { AlbumContext } from '../../Contexts/albumContext';

export default function AddPhotos(props: {
    setPage: React.Dispatch<React.SetStateAction<string>>;
}) {
    const { albumNumber } = useContext(AlbumContext);
    const { user } = useContext(UserContext);
    const [files, setFiles] = useState<string>('');
    const [resultPhoto, setResultPhoto] = useState();

    const addPhotos = (e: React.BaseSyntheticEvent) => {
        const { value } = e.target;

        setFiles(value);
    };

    const postPhoto = (e: React.BaseSyntheticEvent) => {
        e.preventDefault();

        let myHeaders = new Headers();
        myHeaders.append('Authorization', `Bearer ${user.access_token}`);

        let blob = new Blob([files], { type: 'image/jpeg' });

        let formdata = new FormData();
        formdata.append('file', blob, files);
        formdata.append('albumId', `${albumNumber}`);

        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
        };

        fetch(`${photoUrl}/uploads`, requestOptions)
            .then((response) => response.json())
            .then((result) => setResultPhoto(result));
    };
    const envoiPhoto = async (e: React.BaseSyntheticEvent) => {
        alert(`${resultPhoto}`);
        props.setPage('compte');
        setFiles('');
    };
    return (
        <>
            <button
                type="button"
                className=" btn btn-primary btn-sm border border-0 mb-2 me-2 ms-2"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal1"
            >
                Ajouter des photos
            </button>
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
                                            value={files}
                                            type="file"
                                            name="file"
                                            required
                                            onChange={(e) => addPhotos(e)}
                                        />
                                    </div>
                                    <div className="mb-3 col">
                                        {/*    <label
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
                                        /> */}
                                    </div>

                                    <button
                                        type="button"
                                        className="btn btn-primary btn-sm mx-auto rounded-pill"
                                        data-bs-dismiss="modal"
                                        onClick={(e) => {
                                            postPhoto(e);
                                            envoiPhoto(e);
                                        }}
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
