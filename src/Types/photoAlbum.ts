export type PhotosAlbum = [
    {
        id: number;
        file: string;
        originalName: string;
        albumId: number;
    },
];
export type PhotosDelete = {
    id: number;
    file: string;
    originalName: string;
    albumId: number;
};
