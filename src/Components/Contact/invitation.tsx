import { useContext } from 'react';
import { UserContext } from '../../Contexts/userContext';
import { deleteInvitations } from './deleteInvitations';
import { baseUrl } from '../../constant/generalConst';

export default function Invitations() {
    const { user } = useContext(UserContext);
    const token = localStorage.getItem('token');
    fetch(`${baseUrl}/friend`, {
        method: 'GET',
        headers: {
            // 'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    })
        .then((response) => response.json())
        .then((response) => console.log(response));

    return (
        <div className="text-center container">
            <h1>Invitations envoyées</h1>
            <div className="container d-flex justify-content-around flex-wrap mt-5 ">
                <div>
                    <p>
                        invitation en attente :
                        {user.invitations.map((data, i) => (
                            <div
                                key={i}
                                className="container d-flex justify-content-space-around mt-3"
                            >
                                {data.nom_invite}
                                <div>
                                    <button
                                        className="btn btn-danger btn-sm ms-5"
                                        onClick={() =>
                                            deleteInvitations({ id: data.id })
                                        }
                                    >
                                        X
                                    </button>
                                </div>
                            </div>
                        ))}
                    </p>
                </div>
                <div>Invitations acceptées:</div>
            </div>
        </div>
    );
}
