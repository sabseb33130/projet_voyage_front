import { useContext } from 'react';
import { UserContext } from '../../Contexts/userContext';

export default function Invitations() {
    const { user } = useContext(UserContext);

    return (
        <div className="text-center">
            <h1>Invitations envoyées</h1>
            <div>
                <p>
                    invitation lancée:{'    '}
                    {user.invitations.map((data) => data.invitation)}
                </p>
            </div>
        </div>
    );
}
