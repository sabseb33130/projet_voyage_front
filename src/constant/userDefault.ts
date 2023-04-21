import { TUser } from '../Types/users';

export const userDefault: TUser = {
    prenom: '',
    nom: '',
    pseudo: '',
    email: '',
    password: '',
    passwordConfirmed: '',
    adresse_line1: '',
    adresse_line2: '',
    ville: '',
    codepostal: '',
    departement: '',
    pays: '',
    albums: [
        {
            nom_album: '',
            userId: 0,
            date: '',
            photos: [],
            description: '',
        },
    ],
    photos: { file: '', albumId: 0 },
    invitations: '',
    access_token: '',
};
