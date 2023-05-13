import { useContext, useState } from 'react';
import { UserContext } from '../../../Contexts/userContext';
import { baseUrl } from '../../../constant/generalConst';
import Popconfirm from 'antd/es/popconfirm';
import { Button, message } from 'antd';
export default function DeleteUser(props: {
    setPage: React.Dispatch<React.SetStateAction<string>>;
}) {
    const { user } = useContext(UserContext);
    const [supp, setSupp]: any = useState([]);
    const token = localStorage.getItem('token');
    const optionsDelete = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    };

    const delett = () => {
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
    };
    const text = `Êtes-vous sûr de vouloir suprimer votre compte ${user.pseudo}?`;
    const description = `Propriété de ${
        user.nom
    } contenant les albums ${user.albums.map((data) => data.nom_album)}`;
    const confirm = () => {
        message.info(`Le compte de ${user.pseudo} est maintenant supprimé`);
        delett();
        props.setPage('accueil');
        localStorage.removeItem('token');
    };
    return (
        <div>
            <Popconfirm
                placement="bottom"
                title={text}
                description={description}
                onConfirm={confirm}
                okText="Oui"
                cancelText="Non"
            >
                <Button className="btn btn-danger rounded mb-2 ">
                    <i className="bi bi-trash3"></i>
                </Button>
            </Popconfirm>
        </div>
    );
}
