import { useEffect, useState } from 'react';
import { TUser } from '../../Types/users';

export function Search() {
    const [inputValue, setInputValue] = useState<String>('');
    const [drop, setDrop] = useState([]);
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
            fetch('http://localhost:8000/api/search', options)
                .then((response) => response.json())
                .then((response) => {
                    setDrop(response);
                    console.log(response);
                })
                .catch((err) => console.error(err));
        }
    }, [inputValue]);

    return (
        <div className="input-group rounded-pill d-flex flex-column  ">
            <div className="p-2">
                <input
                    title="input"
                    type="search"
                    className="form-control rounded-pill  p-2 "
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
                    <ul className="list-group">
                        {drop.map((data: TUser, i: any) => (
                            <li
                                className="list-group-item rounded-pill text-danger"
                                key={i}
                            >
                                {data.nom}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}
