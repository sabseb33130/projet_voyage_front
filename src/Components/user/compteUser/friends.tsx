import { useContext } from 'react';
import { UserContext } from '../../../Contexts/userContext';

export default function Friends() {
    const { user } = useContext(UserContext);

    return (
        <div className="text-center">
            <h1>Amis partageant des albums</h1>
            <div>{user.friends.map((data) => data)}</div>
        </div>
    );
}
