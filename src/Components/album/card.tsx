import { useContext } from 'react';
import { UserContext } from '../../Contexts/userContext';
import { TUpdateAlbums } from '../../Types/tUpdateAlbums';
import { AlbumContext } from '../../Contexts/albumContext';
import './../../App.css';
import { photoUrl } from '../../constant/generalConst';

export default function Card(props: {
    token: string | null;
    setPage: React.Dispatch<React.SetStateAction<string>>;
}) {
    const { user } = useContext(UserContext);
    const { setAlbum } = useContext(AlbumContext);
    const albumCont = (e: React.BaseSyntheticEvent) => {
        const { title } = e.currentTarget;
        setAlbum(title);
    };

    console.log(user);

    return (
        <div className="container d-flex justify-content-around flex-wrap mb-5 ms-3 ">
            {user.albums.map((data: TUpdateAlbums) => (
                <div className="text-center">
                    {' '}
                    <h5 className="card-title text-dark">{data.nom_album}</h5>
                    <div
                        key={data.id}
                        className="card mb-2 ms-4 mt-1"
                        style={{
                            backgroundSize: 300,
                            backgroundImage:
                                data.photos[0] && data.photos[0].originalName
                                    ? `url(${photoUrl}/${data.photos[0].originalName})`
                                    : '',
                        }}
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
                            <div className="card-body ">
                                {data.date_debut === '1000-01-01' ? (
                                    ''
                                ) : (
                                    <h6 className="text-light">
                                        {data.date_debut}
                                    </h6>
                                )}
                                {data.date_fin === '1000-01-01' ? (
                                    ''
                                ) : (
                                    <h6 className="text-light">
                                        {data.date_fin}
                                    </h6>
                                )}
                                {data.description === null ? (
                                    ''
                                ) : (
                                    <p className="card-text fs-6 text-light">
                                        {data.description === 'undefined'
                                            ? ''
                                            : data.description}
                                    </p>
                                )}
                            </div>
                        </a>
                    </div>
                </div>
            ))}
        </div>
    );
}
