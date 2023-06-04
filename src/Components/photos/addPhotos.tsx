import { useContext, useState } from 'react';
import { UserContext } from '../../Contexts/userContext';
import { photoUrl, urlAlbum } from '../../constant/generalConst';
import { AlbumContext } from '../../Contexts/albumContext';
import { TAlbums } from '../../Types/albums';
import './../../App.css';
export default function AddPhotos(props: {
    token: string | null;
    setPage: React.Dispatch<React.SetStateAction<string>>;
    albumView: TAlbums;
    setAlbumView: React.Dispatch<React.SetStateAction<TAlbums>>;
}) {
    const { albumNumber } = useContext(AlbumContext);
    const { user } = useContext(UserContext);
    const [photoId, setPhotoId] = useState<number | undefined>();
    const [photos, setPhoto] = useState<FileList>();
    const [descriptions, setDescriptions] = useState<
        { description: string; name: string }[]
    >([]);
    const [test, setTest] = useState('');
    const inputChange = (e: React.BaseSyntheticEvent) => {
        const { value } = e.target;
        console.log(value);

        setTest(value);
    };
    console.log(test);

    //Permet de donner un format correct au body(const filePhoto,id et body)
    const filePhoto = user.albums.map((data) =>
        data.photos.find((elm) => elm.file === photos?.item(0)?.name),
    );

    const id = String(filePhoto[0]?.id);
    const body = JSON.stringify({ photoId: id });

    //const onChangeImage et onDescription permettent de récupérer les données saisies par le User
    const onChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = (e.target as HTMLInputElement).files;

        if (!file) return;

        if (file && file.length >= 0) {
            setPhoto(file);
            const testa = test;

            const result = [];
            for (const item of file) {
                result.push({ description: item.name, name: item.name });
            }
            setDescriptions(result);
        }
    };

    //fonction qui post ou update photo
    const postPhoto = async (e: React.BaseSyntheticEvent) => {
        e.preventDefault();
        for (let file of filePhoto) {
            if (file?.file === photos?.item(0)?.name) {
                setPhotoId(file?.id);
            }
        }
        const form = new FormData();
        if (photos) {
            let i = 0;
            for (const file of photos) {
                form.append(`monimage`, file, file.name);
                form.append(
                    `descriptions[${i}][description]`,
                    `${descriptions[i].description}`,
                );
                i++;
            }
            form.append('albumId', `${albumNumber}`);
        }
        photoId === undefined || filePhoto === undefined
            ? fetch(`${photoUrl}/uploads`, {
                  method: 'POST',
                  headers: { Authorization: `Bearer ${props.token}` },
                  body: form,
              })
                  .then((response) => response.json())
                  .then((response) => {
                      alert(response.message);
                      props.setPage('viewAlbum');
                      const newAlbumView = { ...props.albumView };
                      newAlbumView.photos = response.data;
                      props.setAlbumView(newAlbumView);
                  })
                  .catch((err) => alert(err))
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
                      props.setPage('viewAlbum');
                      const newAlbumView = { ...props.albumView };
                      newAlbumView.photos = response.data;
                      props.setAlbumView(newAlbumView);
                  })
                  .catch((err) => alert(err));
    };

    return (
        <>
            <button
                type="button"
                className=" btn btn-primary btn-sm rounded-pill mt-2 ms-1  bouton"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal1"
            >
                Ajouter des photos
            </button>
            <button
                type="button"
                className=" btn btn-primary btn-sm rounded-pill mt-2 mx-auto nobouton"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal1"
            >
                <i className="bi bi-camera-fill"></i>
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
                                            onChange={(e) => {
                                                onChangeImage(e);
                                            }}
                                            multiple
                                        />
                                    </div>
                                    {descriptions.map((data) => (
                                        <div key={data.name}>
                                            {' '}
                                            <label>
                                                Photo texte à modifier
                                            </label>
                                            <input
                                                type="text"
                                                name={
                                                    data.name !==
                                                    data.description
                                                        ? data.description
                                                        : data.name
                                                }
                                                defaultValue={data.name}
                                                onChange={(e) => inputChange(e)}
                                            />
                                        </div>
                                    ))}
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
