import { TAlbums, TGestAlbums } from '../../Types/albums';
import { TUser } from '../../Types/users';
import { getUser } from '../user/compteUser/getUser';

export default function updateAlbums(
    albumUpdated: TAlbums,
    user: TUser,
    onUserChange: (value: TUser) => void,
    albumNumber: TGestAlbums,
) {
    const token = localStorage.getItem('token');

    const id = albumNumber.toString();
    const jsonAlbum = JSON.stringify(albumUpdated);

    const urlAlbum = `http://localhost:8000/api/albums/${id}`;

    const options = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: jsonAlbum,
    };

    fetch(urlAlbum, options)
        .then((response) => response.json())
        .then((donnee) => {
            upAlbumToUser(donnee.data);
            alert(donnee.message);
            getUser(token, user, onUserChange);
        })
        .catch((erreur) => `${erreur}`);
    const upAlbumToUser = (value: TAlbums) => {
        const newModif = { ...user };
        newModif.albums = [...newModif.albums.filter((elm) => elm !== value)];
        onUserChange(newModif);
    };
}
