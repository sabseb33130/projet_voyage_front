import { Photos } from '../../Types/photos';
import { TUser } from '../../Types/users';
import { photoUrl, token } from '../../constant/generalConst';
import { getUser } from '../user/compteUser/getUser';

export default function deletePhoto(
    user: TUser,
    onUserChange: (value: TUser) => void,
    numberPhoto: string,
) {
    const options = {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    fetch(`${photoUrl}/${numberPhoto}`, options)
        .then((response) => response.json())
        .then((response) => {
            alert(response.message);
            delPhotoToUser(response.data);
            getUser(user, onUserChange);
        })
        .catch((err) => console.error(err));

    const delPhotoToUser = (value: Photos) => {
        const newModif = { ...user };
        newModif.albums = [
            ...newModif.albums.filter((elm) =>
                elm.photos.filter((elm) => elm.file !== value.file),
            ),
        ];
        onUserChange(newModif);
    };
}
