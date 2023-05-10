import { TUser } from '../Types/users';

export const userDefault: TUser = {
    id: 0,
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
    albums: [],
    photos: { file: '', albumId: 0 },
    invitations: [{ id: 0, invitation: '' }],
    access_token: '',
    friends: [],
};
