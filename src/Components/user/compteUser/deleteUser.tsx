import { useContext, useState } from 'react';
import { UserContext } from '../../../Contexts/userContext';
import { baseUrl } from '../../../constant/generalConst';
export default function DeleteUser() {
    const { user } = useContext(UserContext);
    const [supp, setSupp]: any = useState([]);
    const optionsDelete = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user.access_token}`,
        },
    };
    const delett = (e: React.BaseSyntheticEvent) => {
        e.preventDefault();
        async function fetchData() {
            const response = await fetch(baseUrl, optionsDelete);
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
        window.location.reload();
    };

    return (
        <button
            onClick={(e) => delett(e)}
            type="button"
            className="btn btn-danger btn-lg rounded"
        >
            <i className="bi bi-trash3"></i>
        </button>
    );
}
