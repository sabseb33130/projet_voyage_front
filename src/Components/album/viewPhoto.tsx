import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../Contexts/userContext';

export default function ViewPhoto(props: {
    setPage: React.Dispatch<React.SetStateAction<string>>;
}) {
    const { user } = useContext(UserContext);
    //  const { albumNumber, setAlbum } = useContext(AlbumContext);
    //  const album = user.albums.filter((elm) => elm.id === +albumNumber);

    const options = {
        headers: {
            Authorization: `Bearer ${user.access_token}`,
        },
    };

    const [test, setTest] = useState<string>();
    //  const [blob1, setBlob1] = useState<Blob | MediaSource>();

    const baseUrl = 'http://localhost:8000/api/photos/file/50';

    /* useEffect(() => { */
    fetch(baseUrl, options)
        .then((response) => response.blob())
        .then((result) => {
            // setTest(result);

            // setBlob1(result);
            setTest(URL.createObjectURL(result));
        });
    /*  }, []); */
    // console.log(blob1);
    // const objectUrl = URL.createObjectURL(blob1!);
    //  const blob2 = objectUrl.replace('blob:', '');
    //setTest(blob2);

    /*   const testa = user.albums.map((data, i) =>
        data.photos.map((dato, i) => dato.photo),
    ); */
    // console.log(testa[0].toString());
    // const blob = new Blob(testa[0], { type: 'image/png' });
    //  const vue = URL.createObjectURL(testa[0].toString());
    //  console.log(vue);
    console.log(test);

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
