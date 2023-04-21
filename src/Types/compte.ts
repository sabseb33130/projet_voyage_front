import { TAlbums } from './albums';
import { Photos } from './photos';

export type TCompte = {
    prenom: string;
    nom: string;
    pseudo: string;
    email: string;
    adresse_line1: string;
    adresse_line2: string;
    ville: string;
    codepostal: string;
    departement: string;
    pays: string;
    albums: TAlbums;
    photos: Photos;
};
