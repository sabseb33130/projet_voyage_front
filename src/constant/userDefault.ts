import { TUser } from '../Types/users';

export const userDefault: TUser = {
    id: 0,
    prenom: '',
    nom: '',
    pseudo: '',
    email: '',
    password: '',
    passwordConfirmed: '',
    photo_identite: '',
    albums: [],
    photos: { file: '', albumId: 0 },
    invitations: [{ id: 0, user_email: '', nom_invite: '' }],
    access_token: '',
    friends: [],
};
