import React from 'react';
import { TUpdateAlbums } from '../Types/tUpdateAlbums';

export const AlbumContext = React.createContext({
    albumId: '',
    setAlbumId: (value: string) => {},
});

export const UpdateAlbumsContext = React.createContext({
    album: { id: 0, nom_album: '', date: '', description: '' },
    setAlbum: (value: TUpdateAlbums) => {},
});
