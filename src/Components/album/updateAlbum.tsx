import { TAlbums, TGestAlbums } from '../../Types/albums';
import { TUser } from '../../Types/users';

export default function updateAlbums(
    albumUpdated: TAlbums,
    user: TUser,
    onUserChange: (value: TUser) => void,
    albumNumber: TGestAlbums,
) {
    //const [albums, setAlbums] = useState(updateAlbum);

    const id = albumNumber.toString();
    const jsonAlbum = JSON.stringify(albumUpdated);

    const urlAlbum = `http://localhost:8000/api/albums/${id}`;

    const options = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user.access_token}`,
        },
        body: jsonAlbum,
    };

    fetch(urlAlbum, options)
        .then((response) => response.json())
        .then((donnee) => {
            //  setViewNewAlbum(donnee.data);
            upAlbumToUser(donnee.data);
            alert(donnee.message);
            //   props.setPage('compte');
        })
        .catch((erreur) => `${erreur}`);
    const upAlbumToUser = (value: TAlbums) => {
        const newModif = { ...user };
        newModif.albums = [...newModif.albums.filter((elm) => elm !== value)];
        onUserChange(newModif);
    };
}
