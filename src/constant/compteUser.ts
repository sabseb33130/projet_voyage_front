import { TCompte } from '../Types/compte';

export const compteUser: TCompte = {
    prenom: '',
    nom: '',
    pseudo: '',
    email: '',
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
