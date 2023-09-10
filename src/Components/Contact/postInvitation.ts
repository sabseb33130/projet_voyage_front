import { Invitations } from '../../Types/invitation';
import { TUser } from '../../Types/users';

export function postInvitation(
    body: string,
    user: TUser,
    onUserChange: (value: TUser) => void,
) {
    const token = localStorage.getItem('token');
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: body,
    };
    console.log(body);

    fetch('http://localhost:8000/api/Invitations', options)
        .then((response) => response.json())
        .then((response) => {
            alert(response);

            response.statusCode !== 201
                ? alert(response.message)
                : addInvitationToUser(response.data);
            alert(response.message);
        })
        .catch((err) => console.error(err));

    const addInvitationToUser = (value: Invitations) => {
        const newModif = { ...user };
        newModif.invitations = [...newModif.invitations, value];
        onUserChange(newModif);
    };
}
