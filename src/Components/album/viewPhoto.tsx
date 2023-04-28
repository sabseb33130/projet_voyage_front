import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../Contexts/userContext';
import { AlbumContext } from '../../Contexts/albumContext';
import { token } from '../../constant/generalConst';
import { url } from 'inspector';

export default function ViewPhoto(props: {
    setPage: React.Dispatch<React.SetStateAction<string>>;
}) {
    const { user, onUserChange } = useContext(UserContext);
    const { albumNumber, setAlbum } = useContext(AlbumContext);
    const album = user.albums.filter((elm) => elm.id === +albumNumber);

    const options = {
        headers: {
            Authorization: `Bearer ${user.access_token}`,
        },
    };

    const [test, setTest] = useState<string>();

    const baseUrl = 'http://localhost:8000/api/photos/file/34';

    useEffect(() => {
        fetch(baseUrl, options)
            .then((response) => response.blob())
            .then((result) => {
                setTest(URL.createObjectURL(result));
            });
    }, []);
    const testa = user.albums.map((data, i) =>
        data.photos.map((dato, i) => dato.photo),
    );
    console.log(testa[0].toString());
    const blob = new Blob(testa[0], { type: 'image/png' });
    const vue = URL.revokeObjectURL(testa[0].toString());
    console.log(vue);

    return (
        <div>
            <button onClick={() => props.setPage('compte')}>Retour</button>
            {test} <img src={test} alt="test" />
            {/*  {album.map((data, i) =>
                data.photos.map((dato: Blob, i) => (
                    <img src={dato.information} />
                )),
            )} */}
        </div>
    );
}
