import { useContext } from 'react';
import { UserContext } from '../../Contexts/userContext';
import { TUpdateAlbums } from '../../Types/tUpdateAlbums';
import { AlbumContext } from '../../Contexts/albumContext';
import './card.css';
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

    return (
        <div className="container d-flex justify-content-between">
            <div className="container d-flex justify-content-between flex-wrap mb-5 inner">
                {user.albums.map((data: TUpdateAlbums, i) => (
                    <div key={data.id}>
                        <div
                            className="card mb-2"
                            style={{ width: 10 + 'rem' }}
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
                                <div className="card-body">
                                    <h5 className="card-title">
                                        {data.nom_album}
                                    </h5>

                                    <h6>{data.date_debut}</h6>
                                    <h6>{data.date_fin}</h6>

                                    <p className="card-text fs-6">
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
