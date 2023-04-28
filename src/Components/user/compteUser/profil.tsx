import { useContext } from 'react';
import { UserContext } from '../../../Contexts/userContext';

export default function Profil() {
    const { user } = useContext(UserContext);

    return (
        <div>
            {user.invitations.map((data, i) => data.invitation)}{' '}
            {user.access_token}
        </div>
    );
}
