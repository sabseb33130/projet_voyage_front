import { useContext, useState } from 'react';
import { UserContext } from '../../Contexts/userContext';
import { photoUrl } from '../../constant/generalConst';
import { Popconfirm, message } from 'antd';
import deletePhoto from '../photos/deletetPhotos';
import { TAlbums } from '../../Types/albums';

export default function ViewPhoto(props: {
    albumView: TAlbums;
    token: string | null;
    setPage: React.Dispatch<React.SetStateAction<string>>;
}) {
    const { user, onUserChange } = useContext(UserContext);
    const [numberPhoto, setNumberPhoto] = useState<string>();
    const photoNumber = (e: React.BaseSyntheticEvent) => {
        const { title } = e.currentTarget;
        setNumberPhoto(title);
    };

    const text = `Êtes-vous sûr de vouloir suprimer cette photo ?`;
    const confirm = () => {
        message.info(`Cette photo vient d'être supprimée`);
        deletePhoto(
            props.token,
            user,
            onUserChange,
            numberPhoto!,
            props.albumView,
        );
    };

    const photos = props.albumView.photos.map((photo, j) => (
        <Popconfirm
            key={j}
            placement="bottom"
            title={text}
            onConfirm={confirm}
            okText="Oui"
            cancelText="Non"
        >
            <div
                className="bg-image ripple"
                data-mdb-ripple-color="light"
                title={
                    photo.id === undefined ? photo.file : photo.id.toString()
                }
                onClick={(e) => photoNumber(e)}
            >
                <a href="./#">
                    <img
                        className=" border border-5 border-dark w-100 img-fluid rounded-pill"
                        style={{ height: 300 }}
                        src={`${photoUrl}/${photo.file}`}
                        alt={photo.file}
                    />
                    <p className="text-center">{photo.description}</p>
                </a>
            </div>
        </Popconfirm>
    ));
    return <>{photos}</>;
}
