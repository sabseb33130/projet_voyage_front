import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../Contexts/userContext';
import { TokenContext } from '../../Contexts/tokenContext';
import { TAlbums } from '../../Types/albums';
import { PhotosAlbum } from '../../Types/photoAlbum';

export default function Card() {
    const { token } = useContext(TokenContext);
    const [viewAlbum, setViewAlbum] = useState<TAlbums>();
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    };
    useEffect(() => {
        fetch('http://localhost:8000/api/albums', options)
            .then((response) => response.json())
            .then((response) => setViewAlbum(response))
            .catch((err) => console.error(err));
    }, [token]);
    console.log(viewAlbum);

    const albumView = viewAlbum?.map((data, i) => (
        <div className="card mx-auto mt-3" style={{ width: '18' + 'rem' }}>
            <div className="card-body">
                <h5 className="card-title"> {data.nom_album}</h5>
                <h6 className="card-subtitle mb-2 text-body-secondary">
                    {data.date}
                </h6>
                {/*   <h6>
                    {data.photos.map((dato: PhotosAlbum) => dato.information)}</h6>
                    <h6>
                        {' '}
                        {data.photos.map((dato: PhotosAlbum) => dato.mimetype)}
                    </h6> */}
                <h6>{data.photos.map((dato: PhotosAlbum) => dato.photo)}</h6>
            </div>
        </div>
    ));

    return (
        <div>
            <div>{albumView}</div>
        </div>
    );
}
