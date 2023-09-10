import { TAlbums, TGestAlbums } from '../../Types/albums';
import { TUser } from '../../Types/users';
import { getUser } from '../user/compteUser/getUser';
import { urlAlbum } from '../../constant/generalConst';
export default function updateAlbums(
    albumUpdated: TAlbums,
    user: TUser,
    onUserChange: (value: TUser) => void,
    albumNumber: TGestAlbums,
) {
    const token = localStorage.getItem('token');
    const id = albumNumber.toString();
    const jsonAlbum = JSON.stringify(albumUpdated);

    const options = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: jsonAlbum,
    };

    fetch(`${urlAlbum}/${id}`, options)
        .then((response) => response.json())
        .then((donnee) => {
            upAlbumToUser(donnee.data);
            alert(donnee.message);
            getUser(user, onUserChange);
        })
        .catch((erreur) => `${erreur}`);
    const upAlbumToUser = (value: TAlbums) => {
        const newModif = { ...user };
        newModif.albums = [...newModif.albums.filter((elm) => elm !== value)];
        onUserChange(newModif);
    };
}
