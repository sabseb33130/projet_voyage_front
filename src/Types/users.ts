import { TAlbums } from './albums';
import { Invitations } from './invitation';
import { Photos } from './photos';
export type TUser = {
    id: number;
    prenom: string;
    nom: string;
    pseudo: string;
    email: string;
    password: string;
    passwordConfirmed: string;
    photo_identite: string;
    albums: TAlbums[];
    photos: Photos;
    invitations: Invitations[];
    access_token: string;
    friends: [];
};
