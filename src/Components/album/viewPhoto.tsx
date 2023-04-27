import { useContext } from 'react';
import { UserContext } from '../../Contexts/userContext';
import { AlbumContext } from '../../Contexts/albumContext';

export default function ViewPhoto(props: {
    setPage: React.Dispatch<React.SetStateAction<string>>;
}) {
    const { user, onUserChange } = useContext(UserContext);
    const { albumNumber, setAlbum } = useContext(AlbumContext);
    const album = user.albums.filter((elm) => elm.id === +albumNumber);
    console.log(album);
    console.log(user);
    console.log(albumNumber);

    return (
        <div>
            <button onClick={() => props.setPage('compte')}>Retour</button>
            {album.map((data, i) =>
                data.photos.map((dato, i) => <p>{dato.photo}</p>),
            )}
        </div>
    );
}
