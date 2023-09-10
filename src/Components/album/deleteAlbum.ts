import { TAlbums } from '../../Types/albums';
import { TUser } from '../../Types/users';
import { urlAlbum } from '../../constant/generalConst';

export default function DeleteAlbum(
    albumId: string | undefined,
    user: TUser,
    onUserChange: (value: TUser) => void,
) {
    const token = localStorage.getItem('token');
    const urlDelete = `${urlAlbum}/${+albumId!}`;
    const options = {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    fetch(urlDelete, options)
        .then((response) => response.json())
        .then((response) => {
            delAlbumToUser(response.data);
        })
        .catch((err) => console.error(err));

    const delAlbumToUser = (value: TAlbums) => {
        const newModif = { ...user };
        newModif.albums = [
            ...newModif.albums.filter((elm) => elm.id !== +albumId!),
        ];
        onUserChange(newModif);
    };
}
