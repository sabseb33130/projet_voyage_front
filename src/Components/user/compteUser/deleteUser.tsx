import { useContext, useState } from 'react';
import { TokenContext } from '../../../Contexts/tokenContext';
export default function DeleteUser() {
    const { token } = useContext(TokenContext);
    const [supp, setSupp]: any = useState([]);
    const urlUser = 'http://localhost:8000/api/users';

    const options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    };
    const delett = (e: React.BaseSyntheticEvent) => {
        e.preventDefault();
        async function fetchData() {
            const response = await fetch(urlUser, options);
            if (response.status === 404) {
                return alert('Votre compte est déjà supprimé');
            }

            const responseJson = await response.json();
            setSupp(responseJson);
            if (supp) {
                return alert(`${responseJson.message}`);
            }
        }
        fetchData();
    };

    return (
        <button
            onClick={(e) => delett(e)}
            type="button"
            className="btn btn-danger rounded"
        >
            <i className="bi bi-trash3"></i>
        </button>
    );
}
