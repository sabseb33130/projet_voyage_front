import { PhotosAlbum } from './photoAlbum';

export type TAlbums = {
    id: number;
    nom_album: string;
    userId: number;
    date_debut: string;
    date_fin: string;
    photos: PhotosAlbum;
    description: string;
};
export type TGestAlbums = {
    id: number;
};
