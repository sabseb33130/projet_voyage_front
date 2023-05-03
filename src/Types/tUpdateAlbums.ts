import { PhotosAlbum } from './photoAlbum';

export type TUpdateAlbums = {
    id: number;
    nom_album: string;
    date_debut: string;
    date_fin: string;
    description: string;
    photos: PhotosAlbum;
};
