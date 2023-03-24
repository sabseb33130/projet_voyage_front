import React from 'react';
import { TUser } from '../Types/users';

export const UserContext = React.createContext({
    user: {
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
    } as TUser,
    setUser: (value: TUser) => {},
});

export const UserInit = {
    prenom: '',
    nom: '',
    pseudo: '',
    email: '',
    adresse_line1: '',
    adresse_line2: '',
    ville: '',
    codepostal: '',
    departement: '',
} as TUser;
