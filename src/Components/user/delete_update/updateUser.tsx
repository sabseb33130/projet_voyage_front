import { useState, useContext } from 'react';

import { UserContext } from '../../../Contexts/userContext';
import { baseUrl } from '../../../constant/generalConst';

export default function UpdateUsers(props: {
    setPage: React.Dispatch<React.SetStateAction<string>>;
    token: string | null;
}) {
    const { user, onUserChange } = useContext(UserContext);
    // const [selectedFile, setSelectedFile] = useState();
    //  const [preview, setPreview] = useState<string>('/default-avatar-user.jpg');

    //const [files, setFiles] = useState('');
    const { access_token, albums, photos, invitations, ...newUSer } = user;
    const [userUpdated, setUserUpdated] = useState(newUSer);
    const inputChange = (e: React.BaseSyntheticEvent) => {
        const { name } = e.target;

        setUserUpdated((userUpdate) => {
            return { ...userUpdate, [name]: e.target.value };
        });
    };

    const update = (e: React.BaseSyntheticEvent) => {
        e.preventDefault();

        const jsonUser = JSON.stringify(userUpdated);

        const options = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${props.token}`,
            },
            body: jsonUser,
        };
        console.log(options);

        fetch(baseUrl, options)
            .then((response) => response.json())
            .then((donnee) => onUserChange(donnee.data.userUpdate))
            .catch((erreur) => `${erreur}`);
    };

    /* useEffect(() => {
        if (!selectedFile) {
            setPreview('/default-avatar-user.jpg');
            return;
        }

        const objectUrl = URL.createObjectURL(selectedFile);

        setPreview(objectUrl);

        return (
            //commande permettant d'enregistrer une modif de la photo de profil
            localStorage.setItem('photoprofil', objectUrl),
            () => URL.revokeObjectURL(objectUrl)
        );
    }, [selectedFile]);

    const onSelectFile = (e: any) => {
        if (!e.target.files || e.target.files.length === 0) {
            setSelectedFile(undefined);
            return;
        }
        setSelectedFile(e.target.files[0]);
    }; */

    /*   let myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${user.access_token}`);
    let blob = new Blob([files], { type: 'image/png' });
    let formdata = new FormData();
    formdata.append('file', blob, `${files}`);

    let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
    };

    useEffect(() => {
        fetch(baseUrl1, requestOptions)
            .then((response) => response.json())
            .then((result) => setFiles(result));
    }, []); */
    return (
        <div className="container-fluid">
            <form className="row g-3 needs-validation" noValidate>
                <button
                    type="button"
                    className="btn-close"
                    aria-label="Close"
                    onClick={() => {
                        props.setPage('compte');
                    }}
                ></button>
                <div className="col-md-3">
                    <label htmlFor="validationCustom01" className="form-label">
                        Prénom
                    </label>
                    <input
                        onChange={(e) => inputChange(e)}
                        type="text"
                        className="form-control"
                        id="validationCustom01"
                        name="prenom"
                        defaultValue={user?.prenom}
                        required
                    />
                    <div className="valid-feedback">Looks good!</div>
                </div>
                <div className="col-md-3">
                    <label htmlFor="validationCustom02" className="form-label">
                        Nom
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="validationCustom02"
                        name="nom"
                        defaultValue={user?.nom}
                        onChange={(e) => inputChange(e)}
                        required
                    />
                    <div className="valid-feedback">Looks good!</div>
                </div>
                <div className="col-md-4">
                    <label
                        htmlFor="validationCustomUsername"
                        className="form-label"
                    >
                        Email
                    </label>
                    <div className="input-group has-validation">
                        <span
                            className="input-group-text"
                            id="inputGroupPrepend"
                        >
                            @
                        </span>
                        <input
                            name="email"
                            defaultValue={user?.email}
                            type="email"
                            className="form-control"
                            id="validationCustomUsername"
                            aria-describedby="inputGroupPrepend"
                            onChange={(e) => inputChange(e)}
                            required
                        />
                        <div className="invalid-feedback">
                            Veuillez choisir un email correct !!!
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <label htmlFor="validationCustom03" className="form-label">
                        Adresse
                    </label>
                    <input
                        name="adresse_line1"
                        defaultValue={user?.adresse_line1}
                        placeholder="N°, type de rue, nom de rue"
                        type="text"
                        className="form-control"
                        id="validationCustom03"
                        onChange={(e) => inputChange(e)}
                        required
                    />
                    <div className="invalid-feedback">
                        Renseignez une adresse existante, svp.
                    </div>
                </div>
                <div className="col-md-4">
                    <label htmlFor="validationCustom04" className="form-label">
                        Complément d'adresse
                    </label>
                    <input
                        name="adresse_line2"
                        defaultValue={user?.adresse_line2}
                        type="text"
                        className="form-control"
                        id="validationCustom04"
                        onChange={(e) => inputChange(e)}
                        required
                    />
                    <div className="invalid-feedback"></div>
                </div>
                <div className="col-md-3">
                    <label htmlFor="validationCustom05" className="form-label">
                        Ville
                    </label>
                    <input
                        name="ville"
                        defaultValue={user?.ville}
                        type="text"
                        className="form-control"
                        id="validationCustom05"
                        onChange={(e) => inputChange(e)}
                        required
                    />
                    <div className="invalid-feedback">
                        Renseignez votre ville, svp.
                    </div>
                </div>
                <div className="col-md-3">
                    <label htmlFor="validationCustom06" className="form-label">
                        departement
                    </label>
                    <input
                        name="departement"
                        defaultValue={user?.departement}
                        type="text"
                        className="form-control"
                        id="validationCustom06"
                        onChange={(e) => inputChange(e)}
                        required
                    />
                    <div className="invalid-feedback">
                        Renseignez votre département correct, svp.
                    </div>
                </div>
                <div className="col-md-3">
                    <label htmlFor="validationCustom07" className="form-label">
                        Code Postal
                    </label>
                    <input
                        name="codepostal"
                        defaultValue={user?.codepostal}
                        type="text"
                        className="form-control"
                        id="validationCustom07"
                        onChange={(e) => inputChange(e)}
                        required
                    />
                    <div className="invalid-feedback">
                        Renseignez votre code postal, svp.
                    </div>
                </div>
                <div className="col-md-3">
                    <label htmlFor="validationCustom08" className="form-label">
                        Pays
                    </label>
                    <input
                        onChange={(e) => inputChange(e)}
                        defaultValue={user?.pays}
                        type="text"
                        name="pays"
                        className="form-control"
                        id="validationCustom08"
                        required
                    />
                    <div className="invalid-feedback">
                        Renseignez votre Pays, svp.
                    </div>
                </div>
                <div className="col-md-3">
                    <label htmlFor="validationCustom09" className="form-label">
                        Pseudo
                    </label>
                    <input
                        onChange={(e) => inputChange(e)}
                        name="pseudo"
                        defaultValue={user.pseudo}
                        type="text"
                        placeholder="Veuillez saisir 5 caractères minimum"
                        className="form-control"
                        id="validationCustom09"
                        required
                    />
                    <div className="invalid-feedback">
                        Renseignez un pseudo valide, svp.
                    </div>
                </div>
                <div className="col-12">
                    <button
                        className="btn btn-primary"
                        type="submit"
                        onClick={(e) => {
                            update(e);
                            props.setPage('compte');
                        }}
                    >
                        Modifier
                    </button>
                </div>
            </form>
        </div>
    );
}
