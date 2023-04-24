import { useContext } from 'react';
import { UserContext } from '../../Contexts/userContext';
import { AlbumContext } from '../../Contexts/albumContext';

export default function DeleteAlbum() {
    const { user } = useContext(UserContext);
    const { albumId } = useContext(AlbumContext);
    console.log(albumId);
    const urlAlbum = `http://localhost:8000/api/albums/${albumId}`;

    const optionsDelete = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user.access_token}`,
        },
    };

    async function fetchData() {
        const response = await fetch(urlAlbum, optionsDelete);
        if (response.status === 404) {
            return alert('Votre compte est déjà supprimé');
        }

        const responseJson = await response.json();
        console.log(responseJson);
        /*  if (supp) {
                return alert(`${responseJson.message}`);
            } */
    }
    fetchData();

    return <div></div>;
}
