import { baseUrl, token } from '../../../constant/generalConst';
import { TUser } from '../../../Types/users';

export function getUser(user: TUser, onUserChange: (value: TUser) => void) {
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    };

    fetch(`${baseUrl}/comptePerso`, options)
        .then((response) => response.json())
        .then((response) => onUserChange(response))
        .catch((err) => console.error(err));
}
