import { TCompte } from '../Types/compte';

export const compteUser: TCompte = {
    prenom: '',
    nom: '',
    pseudo: '',
    email: '',
    adresse_line1: '',
    adresse_line2: '',
    ville: '',
    codepostal: '',
    departement: '',
    pays: '',
    albums: [],
    photos: { file: '', albumId: 0 },
};
/*  {
            id: 0,
            nom_album: '',
            userId: 0,
            date: '',
            photos: [
                {
                    information: '',
                    mimetype: '',
                    photo: '',

                    albumId: 0,
                },
            ],
            description: '',
        }, */
