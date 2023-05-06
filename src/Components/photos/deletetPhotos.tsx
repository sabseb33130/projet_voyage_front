import { PhotosDelete } from '../../Types/photoAlbum';
import { TUser } from '../../Types/users';
import { photoUrl } from '../../constant/generalConst';
import { getUser } from '../user/compteUser/getUser';

export default function deletePhoto(
    token: string | null,
    user: TUser,
    onUserChange: (value: TUser) => void,
    numberPhoto: string,
) {
    const delPhoto = user.albums.map((data) =>
        data.photos.filter((elm) => elm.originalName === numberPhoto),
    );
    const idPhoto = delPhoto[0].map((data) => data.id).toString();

    const options = {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    fetch(`${photoUrl}/${idPhoto}`, options)
        .then((response) => response.json())
        .then((response) => {
            alert(response.message);
            delPhotoToUser(response.data);
            getUser(token, user, onUserChange);
        })
        .catch((err) => console.error(err));

    const delPhotoToUser = (value: PhotosDelete) => {
        const newModif = { ...user };

        newModif.albums = [
            ...newModif.albums.filter((elm) =>
                elm.photos.filter((elm) => elm !== value),
            ),
        ];
        console.log(newModif);

        onUserChange(newModif);
    };
}
