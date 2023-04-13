import { TAlbums } from './albums';
export type TUser = {
    prenom: string;
    nom: string;
    pseudo: string;
    email: string;
    password: string;
    passwordConfirmed: string;
    adresse_line1: string;
    adresse_line2: string;
    ville: string;
    codepostal: string;
    departement: string;
    pays: string;
    albums: TAlbums;
    photos: [{ nom_photo: string; id: number }];
};
