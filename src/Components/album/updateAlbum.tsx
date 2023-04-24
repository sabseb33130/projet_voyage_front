import { useContext } from 'react';
import { UserContext } from '../../Contexts/userContext';
import { AlbumContext } from '../../Contexts/albumContext';

export default function UpdateAlbum() {
    const { user } = useContext(UserContext);
    const { albumId } = useContext(AlbumContext);
    const addBody = JSON.stringify;
    const option = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user.access_token}`,
        } /* ,body: */,
    };
    return <div></div>;
}
