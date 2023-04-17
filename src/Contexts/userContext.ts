import React from 'react';
import { TUser } from '../Types/users';

export const UserContext = React.createContext({
    user: {
        prenom: '',
        nom: '',
        pseudo: '',
        email: '',

        adresse_line1: '',
        adresse_line2: '',
        ville: '',
        codepostal: '',
        departement: '',
        album: [],
        photo: [],
    } as unknown as TUser,
    setUser: (value: TUser) => {},
});
