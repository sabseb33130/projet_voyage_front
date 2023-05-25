import {invitationUrl} from "../../constant/generalConst";

export function deleteInvitations(props: { id: number }) {
    const token = localStorage.getItem('token');
    const options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    };

    fetch(`${invitationUrl}/${props.id}`, options)
        .then((response) => response.json())
        .then((response) => {
            alert(response.message);
        })
        .catch((err) => console.error(err));
}
