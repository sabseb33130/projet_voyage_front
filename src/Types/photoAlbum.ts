export type PhotosAlbum = [
    {
        id: number;
        file: string;
        originalName: string;
        albumId: number;
    },
];
export type Blob = {
    information: Blob;
    mimetype: string;
    photo: string;
};
