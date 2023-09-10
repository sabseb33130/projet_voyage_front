import { useEffect, useState } from 'react';
import { TUser } from '../../Types/users';
import { TAlbums } from '../../Types/albums';

export function Search() {
    const [inputValue, setInputValue] = useState<String>('');
    const [drop, setDrop] = useState<Array<Array<TUser | TAlbums>>>([]);
    const inputChange = (e: React.BaseSyntheticEvent) => {
        const { value } = e.target;

        setInputValue(value);
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ input: inputValue }),
        };
        if (inputValue !== '') {
            fetch('http://192.168.1.176:3000/api/search', options)
                .then((response) => response.json())
                .then((response) => {
                    setDrop(response);
                    console.log(response);
                })
                .catch((err) => console.error(err));
        }
    }, [inputValue]);

    console.log(drop);

    return (
        <div className="input-group rounded-pill d-flex flex-column  ">
            <div className="p-2">
                <input
                    title="input"
                    style={{ height: 25 }}
                    type="search"
                    className="form-control rounded-pill  p-2 mt-2 "
                    aria-label="Search"
                    placeholder="Rechercher"
                    aria-describedby="search-addon"
                    onChange={(e) => inputChange(e)}
                />
            </div>
            <div className="p-2">
                {drop === undefined || inputValue === '' ? (
                    ''
                ) : (
                    <div>
                        {drop.map((innerArray, index) => (
                            <div key={index}>
                                {innerArray.map((item) => (
                                    <div key={item.id}>
                                        {isUser(item) && (
                                            <p>pseudo : {item.pseudo}</p>
                                        )}
                                        {isAlbum(item) && (
                                            <p>Album : {item.nom_album}</p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
function isUser(item: TUser | TAlbums): item is TUser {
    return (item as TUser).pseudo !== undefined;
}

function isAlbum(item: TUser | TAlbums): item is TAlbums {
    return (item as TAlbums).nom_album !== undefined;
}
