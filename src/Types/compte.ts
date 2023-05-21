import { TAlbums } from './albums';
import { Photos } from './photos';

export type TCompte = {
    prenom: string;
    nom: string;
    pseudo: string;
    email: string;
    albums: TAlbums[];
    photos: Photos;
};
