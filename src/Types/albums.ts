import { PhotosAlbum } from './photoAlbum';
import { Photos } from './photos';

export type TAlbums = {
    id: number;
    nom_album: string;
    userId: number;
    date: string;
    photos: PhotosAlbum;
    description: string;
};
export type TGestAlbums = {
    id: number;
};
