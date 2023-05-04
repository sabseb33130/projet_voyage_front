import { useContext } from 'react';
import { UserContext } from '../../Contexts/userContext';
import { TUpdateAlbums } from '../../Types/tUpdateAlbums';
import { AlbumContext } from '../../Contexts/albumContext';
import './card.css';
export default function Card(props: {
    setPage: React.Dispatch<React.SetStateAction<string>>;
}) {
    const { user } = useContext(UserContext);

    const { setAlbum } = useContext(AlbumContext);

    const albumCont = (e: React.BaseSyntheticEvent) => {
        const { title } = e.currentTarget;

        setAlbum(title);
    }; /* 
    const photoView = user.albums.filter((elm) => elm.id === +albumNumber);
    const verifPhoto1 = photoView.map(
        (data) => data.photos[data.photos.length - 1],
    );
    const verifPhoto = photoView
        .map((data) => data.photos.length <= 1)
        .toString();
    const photos = verifPhoto1.map((data, i) => (
        <img
            key={data.id}
            className="ms-3 border border-5 border-dark rounded-9"
            style={{ height: 200 }}
            src={`${photoUrl}/${data.file}`}
            alt={data.file}
        />
    ));
    console.log(
        user.albums.filter(
            (elm) =>
                elm.photos.filter((elm) => elm.file) ===
                verifPhoto1.filter((elm) => elm.file),
        ),
    );

    console.log(photos);
    console.log(verifPhoto1);

    console.log(verifPhoto); */
    return (
        <div className="container d-flex justify-content-between">
            <div
                className="container d-flex justify-content-between flex-wrap mb-5"
                /*  style={{ height: 300 }} */
            >
                {user.albums.map((data: TUpdateAlbums, i) => (
                    <div key={data.id}>
                        <div
                            className="card mb-2"
                            style={{ width: 18 + 'rem' }}
                        >
                            <a
                                href="./#"
                                onClick={(e) => {
                                    props.setPage('viewAlbum');
                                    albumCont(e);
                                }}
                                className=""
                                title={data.id.toString()}
                            >
                                {/*   {verifPhoto === 'true'
                                    ? `Pas de photo pour l'instants dans cette album`
                                    : photos} */}
                                <div className="card-body">
                                    <h3 className="card-title">
                                        {data.nom_album}
                                    </h3>

                                    <h4>{data.date_debut}</h4>
                                    <h4>{data.date_fin}</h4>

                                    <p className="card-text">
                                        {data.description}
                                    </p>
                                </div>
                            </a>
                        </div>
                    </div>
                ))}
            </div>
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
