import React, { ReactElement, createContext, useState } from 'react';

import { TGestAlbums } from '../Types/albums';
import { albumDefault } from '../constant/albumDefault';

interface AlbumContextProps {
    children: ReactElement;
}
export interface AlbumContextInterface {
    albumNumber: TGestAlbums;
    setAlbum: (albumNumber: TGestAlbums) => void;
}
export const AlbumContext = createContext<AlbumContextInterface>({
    albumNumber: albumDefault,
    setAlbum: (albumNumber: TGestAlbums) => {},
});
export const AlbumContextProvider = ({ children }: AlbumContextProps) => {
    const [albumNumber, setAlbumNumber] = useState<TGestAlbums>(albumDefault);
    const handleAlbum = (albumNumber: TGestAlbums) => {
        setAlbumNumber(albumNumber);
    };
    const contextValue = {
        albumNumber: albumNumber,
        setAlbum: handleAlbum,
    };
    return (
        <AlbumContext.Provider value={contextValue}>
            {children}
        </AlbumContext.Provider>
    );
};
