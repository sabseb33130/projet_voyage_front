export function deleteInvitations(props: { id: number }) {
    const token = localStorage.getItem('token');
    const options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    };

    fetch(`http://localhost:8000/api/Invitations/${props.id}`, options)
        .then((response) => response.json())
        .then((response) => {
            alert(response.message);
        })
        .catch((err) => console.error(err));
}
