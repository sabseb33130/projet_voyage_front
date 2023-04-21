import { useContext } from 'react';
import { UserContext } from '../../Contexts/userContext';

export default function Card() {
    const { user } = useContext(UserContext);
    /*   const [viewAlbum, setViewAlbum] = useState<TAlbums>();
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${access_token}`,
        },
    };
    useEffect(() => {
        fetch('http://localhost:8000/api/albums', options)
            .then((response) => response.json())
            .then((response) => setViewAlbum(response))
        
    }, []); */
    /* const albumView = viewAlbum?.map((data, i) => (
        <div className="card mx-auto mt-3" style={{ width: '18' + 'rem' }}>
            <div className="card-body">
                <h5 className="card-title"> {data.nom_album}</h5>
                <h6 className="card-subtitle mb-2 text-body-secondary">
                    {data.date}
                </h6>

                <h6>
                    <GetPhotos />
                </h6>
            </div>
        </div>
    )); */

    return (
        <div>
            <div>{/* {albumView} */}</div>
        </div>
    );
}
