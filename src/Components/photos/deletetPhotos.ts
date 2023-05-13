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

            albumView.photos.filter((elm) => elm.id !== response.data.id);
            console.log(
                albumView.photos.filter((elm) => elm.id !== response.data.id),
            );
            delPhotoToUser(response.data);
            getUser(token, user, onUserChange);
        })
        .catch((err) => console.error(err));
    console.log(albumView);

    const delPhotoToUser = (value: PhotosDelete) => {
        const newUser = { ...user };
        const newModif = { ...albumView };
        const teast = {
            ...newModif.photos.filter((elm) => elm.id !== value.id),
        };
        newUser.albums = [
            ...newUser.albums
                .filter((elm) => elm === albumView)
                .filter((elm) => elm.photos === teast),
        ];
        onUserChange(newUser);
        //
        console.log(user);
    };
}
