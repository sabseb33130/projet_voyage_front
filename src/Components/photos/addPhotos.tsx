import {
    MutableRefObject,
    useContext,
    useReducer,
    useRef,
    useState,
} from 'react';
import { UserContext } from '../../Contexts/userContext';
import { photoUrl } from '../../constant/generalConst';
import { AlbumContext } from '../../Contexts/albumContext';
import { getUser } from '../user/compteUser/getUser';
import { log } from 'console';

export default function AddPhotos(props: {
    setPage: React.Dispatch<React.SetStateAction<string>>;
}) {
    const { albumNumber } = useContext(AlbumContext);
    const { user, onUserChange } = useContext(UserContext);
    const [files, setFiles] = useState<string>('');
    const [resultPhoto, setResultPhoto] = useState();
    const [fileInput, setFileInput] = useState<FileList>();
    const [test, setTest] = useState<File>();

    const onChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        /*    const file = (e.target as HTMLInputElement).files;
        if (file && file.length > 0) {
            setFileInput(file);
        } */
        const { files } = e.target;
        if (!files) return;

        setTest(files[0]);
    };

    const postPhoto = async (e: React.BaseSyntheticEvent) => {
        e.preventDefault();
        const form = new FormData();
        if (test) {
            /*  for (const file of test.current?.files!) {
            console.log('boucle fichier', file); */

            form.append('monimage', test, test.name);
            /*       } */
            form.append('albumId', `${albumNumber}`);
            console.log('input_file', fileInput);
            console.log('formData', form);

            const options = {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${user.access_token}`,
                },
                body: form,
            };
            /*   const response = await fetch(`${photoUrl}/uploads`, options);
            const responseJson = await response.blob();
            console.log(responseJson); */
            fetch(`${photoUrl}/uploads`, options)
                .then((response) => response.json())
                .then((response) => console.log(response))
                .catch((err) => console.error(err));
        }
    };
    const envoiPhoto = async (e: React.BaseSyntheticEvent) => {
        alert(`${resultPhoto}`);
        props.setPage('compte');
        setFiles('');
        //  getUser(user, onUserChange);
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
                                    action={`${photoUrl}/uploads`}
                                >
                                    <div className="mb-3 col">
                                        <label htmlFor="file" className="file">
                                            Téléchargez vos photos (min.1 max.
                                            8)
                                        </label>
                                        <input
                                            id="file"
                                            type="file"
                                            name="file"
                                            required
                                            onChange={(e) => onChangeImage(e)}
                                            multiple
                                        />
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
