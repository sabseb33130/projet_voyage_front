import { useEffect, useContext, useState } from 'react';
import { TokenContext } from '../../Contexts/tokenContext';

export default function AddPhotos() {
    const [files, setFiles] = useState('');
    const [albumId, setalbumId] = useState(0);
    const baseUrl = 'http://localhost:8000/api/photos/uploads';

    const { token } = useContext(TokenContext);

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
        myHeaders.append('Authorization', `Bearer ${token}`);
        var blob = new Blob([files], { type: 'application/octet-binary' });
        var formdata = new FormData();
        formdata.append('file', blob, `${files}`);
        formdata.append('albumId', `${albumId}`);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
        };
        console.log(formdata);

        fetch(baseUrl, requestOptions)
            .then((response) => response.text())
            .then((result) => console.log(result))
            .catch((error) => console.log('error', error));
    };
    return (
        <div className="container bg-light rounded mt-5" id="container">
            <form className="row" encType="multipart/form-data" method="post">
                <button
                    type="button"
                    className="btn-close"
                    aria-label="Close"
                ></button>
                <div className="mb-3 col">
                    <label htmlFor="file" className="form-label">
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
                    <label htmlFor="nomAlbum" className="form-label">
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
                    className="btn"
                    onClick={(e) => postPhoto(e)}
                >
                    valider
                </button>
            </form>
        </div>
    );
}
