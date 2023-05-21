import { TAlbums } from '../../Types/albums';
import { photoUrl } from '../../constant/generalConst';

export default function deletePhoto(
    token: string | null,
    numberPhoto: string,
    albumView: TAlbums,
    setAlbumView: React.Dispatch<TAlbums>,
    setAffichage: React.Dispatch<React.SetStateAction<string | undefined>>,
) {
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
            const newAlbumView = { ...albumView };
            setAlbumView(newAlbumView);
            setAffichage(undefined);
        })
        .catch((err) => console.error(err));
}
