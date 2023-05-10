import { Invitations } from '../../Types/invitation';
import { invitationUrl } from '../../constant/generalConst';
import { TUser } from '../../Types/users';

export function postInvitation(
    invitation: Invitations,
    user: TUser,
    onUserChange: (value: TUser) => void,
) {
    const prepBody = { invitation: invitation };
    const body = JSON.stringify(prepBody);
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user.access_token}`,
        },
        body: body,
    };

    fetch(invitationUrl, options)
        .then((response) => response.json())
        .then((response) => {
            response.statusCode === 400
                ? alert('Veuillez saisir une adresse mail correcte')
                : addInvitationToUser(response.data);
        })
        .catch((err) => console.error(err));

    const addInvitationToUser = (value: Invitations) => {
        const newModif = { ...user };
        newModif.invitations = [...newModif.invitations, value];
        onUserChange(newModif);
    };
}
