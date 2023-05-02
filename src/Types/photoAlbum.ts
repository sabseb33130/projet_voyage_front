export type PhotosAlbum = [
    {
        originalName: string;
        id: number;
        file: string;

        albumId: number;
    },
];
export type Blob = {
    information: Blob;
    mimetype: string;
    photo: string;
};
