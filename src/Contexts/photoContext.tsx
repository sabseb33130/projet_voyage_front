import { createContext } from 'react';
import { Photos } from '../Types/photos';

export const PhotosContext = createContext({
    photos: {
        file: '',
        albumId: 0,
    },
    setPhotos: (value: Photos) => {},
});
