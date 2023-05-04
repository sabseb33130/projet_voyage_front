import { useContext, useState } from 'react';
import { UserContext } from '../../Contexts/userContext';
import { photoUrl } from '../../constant/generalConst';
import { Button, Popconfirm, message } from 'antd';
import deletePhoto from '../photos/deletetPhotos';

export default function ViewPhoto(props: {
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
        deletePhoto(user, onUserChange, numberPhoto!);
    };
    const photos = user.albums.map((data, i) =>
        data.photos.map((data) => (
            <Popconfirm
                /*   className="btn btn-danger btn-sm rounded mb-2 " */
                placement="bottom"
                title={text}
                onConfirm={confirm}
                okText="Oui"
                cancelText="Non"
            >
                <div
                    className="bg-image ripple"
                    data-mdb-ripple-color="light"
                    title={data.id.toString()}
                    onClick={(e) => photoNumber(e)}
                >
                    <a>
                        <img
                            key={data.id}
                            className=" border border-5 border-dark w-100 img-fluid rounded-pill"
                            style={{ height: 300 }}
                            src={`${photoUrl}/${data.file}`}
                            alt={data.id.toString()}
                        />
                    </a>
                </div>
            </Popconfirm>
        )),
    );
    return <>{photos}</>;
}
