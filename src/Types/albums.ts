import { PhotosAlbum } from './photoAlbum';

export type TAlbums = [
    {
        nom_album: string;
        userId: number;
        date: string;
        photos: PhotosAlbum;
        description: string;
    },
];
