import { useContext } from 'react';

import { urlAlbum } from '../../constant/generalConst';
import { AlbumContext } from '../../Contexts/albumContext';
import { TGestAlbums } from '../../Types/albums';
export default function getAlbums(albumNumber: TGestAlbums) {
    const token = localStorage.getItem('token');

    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `bearer ${token}`,
        },
    };

    fetch(`${urlAlbum}/${albumNumber}`, options)
        .then((response) => response.json())
        .then((response) => console.log(response))
        .catch((err) => console.error(err));
}
