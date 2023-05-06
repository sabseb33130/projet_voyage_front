import { TAlbums } from '../../Types/albums';
import { PhotosDelete } from '../../Types/photoAlbum';
import { TUser } from '../../Types/users';
import { photoUrl } from '../../constant/generalConst';
import { getUser } from '../user/compteUser/getUser';

export default function deletePhoto(
    token: string | null,
    user: TUser,
    onUserChange: (value: TUser) => void,
    numberPhoto: string,
    albumView: TAlbums,
) {
    console.log(user);
    console.log(numberPhoto);

    const options = {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    fetch(`${photoUrl}/${+numberPhoto}`, options)
        .then((response) => response.json())
        .then((response) => {
            alert(response.message);

            delPhotoToUser(response.data);
        })
        .catch((err) => console.error(err));

    const delPhotoToUser = (value: PhotosDelete) => {
        const newModif = { ...user };

        const test = albumView.photos;
        newModif.albums = [
            ...newModif.albums.filter((elm) => elm.photos !== test),
        ];

        getUser(token, user, onUserChange);
    };
}
