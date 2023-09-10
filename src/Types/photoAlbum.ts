export type PhotosAlbum = [
    {
        id: number;
        file: string;
        originalName: string;
        description: string;
        mimetype: string;
        albumId: number;
    },
];
export type PhotosDelete = {
    id: number;
    file: string;
    originalName: string;
    description: string;
    mimetype: string;
    albumId: number;
};
