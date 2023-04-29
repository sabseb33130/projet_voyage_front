import { TAlbums } from '../../Types/albums';
import { TUser } from '../../Types/users';
/* const { user, onUserChange } = useContext(UserContext); */
export default function DeleteAlbum(
    albumId: string,
    user: TUser,
    onUserChange: (value: TUser) => void,
) {
    const urlDelete = `http://localhost:8000/api/albums/${albumId}`;
    const options = {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${user.access_token}`,
        },
    };
    console.log(options);

    fetch(urlDelete, options)
        .then((response) => response.json())
        .then((response) => {
            console.log(response);
            alert(response.message);
            delAlbumToUser(response.data);
        })

        .catch((err) => console.error(err));
    const delAlbumToUser = (value: TAlbums) => {
        const newModif = { ...user };
        newModif.albums = [
            ...newModif.albums.filter(
                (elm) => elm.nom_album !== value.nom_album,
            ),
        ];
        onUserChange(newModif);
    };
}
