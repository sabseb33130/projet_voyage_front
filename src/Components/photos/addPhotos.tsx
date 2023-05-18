import { useContext, useState } from 'react';
import { UserContext } from '../../Contexts/userContext';
import { photoUrl, urlAlbum } from '../../constant/generalConst';
import { AlbumContext } from '../../Contexts/albumContext';
import { getUser } from '../user/compteUser/getUser';
import { TAlbums } from '../../Types/albums';

export default function AddPhotos(props: {
    token: string | null;
    setPage: React.Dispatch<React.SetStateAction<string>>;
    albumView: TAlbums;
    setAlbumView: React.Dispatch<React.SetStateAction<TAlbums>>;
}) {
    const { albumNumber } = useContext(AlbumContext);
    const { user, onUserChange } = useContext(UserContext);
    const [photoId, setPhotoId] = useState<number | undefined>();
    const [photo, setPhoto] = useState<FileList>();
    const [description, setDescription] = useState();
    //Permet de donner un format correct au body(const filePhoto,id et body)
    const filePhoto = user.albums.map((data) =>
        data.photos.find((elm) => elm.file === photo?.item(0)?.name),
    );
    console.log('test', filePhoto);

    const id = String(filePhoto[0]?.id);
    const body = JSON.stringify({ photoId: id });

    //const onChangeImage et onDescription permettent de récupérer les données saisies par le User
    const onChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = (e.target as HTMLInputElement).files;
        console.log(file);

        if (!file) return;

        if (file && file.length > 0) {
            setPhoto(file);
        }
    };
    const onDescription = (e: React.BaseSyntheticEvent) => {
        const { value } = e.target;
        setDescription(value);
    };

    //fonction qui post ou update photo
    const postPhoto = async (e: React.BaseSyntheticEvent) => {
        e.preventDefault();

        for (let file of filePhoto) {
            if (file?.file === photo?.item(0)?.name) {
                setPhotoId(file?.id);
            }
        }

        const form = new FormData();
        if (photo) {
            for (const file of photo) {
                form.append('monimage', file, file.name);
            }
            form.append('albumId', `${albumNumber}`);
            form.append('description', `${description}`);
        }

        photoId === undefined || filePhoto === undefined
            ? fetch(`${photoUrl}/uploads`, {
                  method: 'POST',
                  headers: {
                      Authorization: `Bearer ${props.token}`,
                  },

                  body: form,
              })
                  .then((response) => response.json())
                  .then((response) => {
                      alert(response.message);
                      //  getUser(props.token, user, onUserChange);
                      props.setPage('viewAlbum');
                      const newAlbumView = { ...props.albumView };
                      newAlbumView.photos = response.data;
                      props.setAlbumView(newAlbumView);
                  })
                  .catch((err) => console.error(err))
            : fetch(`${urlAlbum}/${albumNumber}`, {
                  method: 'PATCH',
                  headers: {
                      'Content-Type': 'application/json',
                      Authorization: `Bearer ${props.token}`,
                  },

                  body: body,
              })
                  .then((response) => response.json())
                  .then((response) => {
                      alert(`${response.message},${response.data}`);
                      //  getUser(props.token, user, onUserChange);
                      props.setPage('viewAlbum');
                      const newAlbumView = { ...props.albumView };
                      newAlbumView.photos = response.data;
                      console.log(response.data);

                      props.setAlbumView(newAlbumView);
                      //props.albumView.photos.push(response.data);
                  })
                  .catch((err) => console.error(err));
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
                                        <br />
                                        <label>Description de la photo</label>
                                        <input
                                            className="ms-3"
                                            type="text"
                                            name="description"
                                            onChange={(e) => onDescription(e)}
                                        />
                                    </div>

                                    <button
                                        type="button"
                                        className="btn btn-primary btn-sm mx-auto rounded-pill"
                                        data-bs-dismiss="modal"
                                        onClick={(e) => {
                                            postPhoto(e);
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
