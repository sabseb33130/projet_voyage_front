import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../Contexts/userContext';

export default function Card() {
    const { user } = useContext(UserContext);
    /*   const [viewAlbum, setViewAlbum] = useState<TAlbums>();
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${access_token}`,
        },
    };
    useEffect(() => {
        fetch('http://localhost:8000/api/albums', options)
            .then((response) => response.json())
            .then((response) => setViewAlbum(response))
        
    }, []); */
    /* const albumView = viewAlbum?.map((data, i) => (
        <div className="card mx-auto mt-3" style={{ width: '18' + 'rem' }}>
            <div className="card-body">
                <h5 className="card-title"> {data.nom_album}</h5>
                <h6 className="card-subtitle mb-2 text-body-secondary">
                    {data.date}
                </h6>

                <h6>
                    <GetPhotos />
                </h6>
            </div>
        </div>
    )); */
    let myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${user.access_token}`);
    const [test, setTest] = useState<string>();

    const baseUrl = `http://localhost:8000/api/photos/file/2`;
    let requestOptions = {
        method: 'GET',
        headers: myHeaders,
    };
    useEffect(() => {
        fetch(baseUrl, requestOptions)
            .then((response) => response.blob())
            .then((result) => {
                setTest(URL.createObjectURL(result));
            });
    }, []);
    console.log(test);

    return (
        <div className="container">
            {' '}
            <img src={test} />
            {user.albums.map((data, i) => (
                <div key={i} className="">
                    <a href="/#">
                        <div className="card" style={{ width: 18 + 'rem' }}>
                            <div className="card-body">
                                <h3 className="card-title">{data.nom_album}</h3>
                                <h4>{data.date}</h4>
                                <p className="card-text">{data.description}</p>
                            </div>
                        </div>
                    </a>
                    <div className="justyfy-content-around">
                        <button className="btn btn-danger rounded mb-2 ms-3 me-5">
                            <i className="bi bi-trash3"></i>
                        </button>
                        <button className="btn btn-primary rounded mb-2 ms-5">
                        <i className="bi bi-pen"></i>
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}
