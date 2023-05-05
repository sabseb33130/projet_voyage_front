export const albumDefault = {
    id: 0,
};

export const album = {
    id: 0,
    nom_album: 'rien',
    date_debut: '2022-12-12',
    date_fin: '2022-12-12',
    description: 'rien',
    photos: [
        {
            information: '',
            mimetype: '',
            photo: '',

            albumId: 0,
        },
    ],
};

//penser à la supprimer
export const updateAlbum = {
    nom_album: '',
    date_debut: '',
    date_fin: '',
    description: '',
    photos: [
        {
            information: '',
            mimetype: '',
            photo: '',

            albumId: 0,
        },
    ],
};
