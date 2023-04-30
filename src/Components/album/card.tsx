import { useContext } from 'react';
import { UserContext } from '../../Contexts/userContext';
import { TUpdateAlbums } from '../../Types/tUpdateAlbums';
import AddPhotos from '../photos/addPhotos';
import { AlbumContext } from '../../Contexts/albumContext';

export default function Card(props: {
    setPage: React.Dispatch<React.SetStateAction<string>>;
}) {
    // const [test, setTest] = useState<string>(); //useState pour photo.
    const { user } = useContext(UserContext);

    const { setAlbum } = useContext(AlbumContext);

    const albumCont = (e: React.BaseSyntheticEvent) => {
        const { title } = e.currentTarget;

        setAlbum(title);
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
                        <a
                            href="./#"
                            onClick={(e) => {
                                props.setPage('viewAlbum');
                                albumCont(e);
                            }}
                            className=""
                            title={data.id.toString()}
                        >
                            <div className="card-body">
                                <h3 className="card-title">{data.nom_album}</h3>

                                <h4>{data.date}</h4>

                                <p className="card-text">{data.description}</p>
                            </div>
                        </a>
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
