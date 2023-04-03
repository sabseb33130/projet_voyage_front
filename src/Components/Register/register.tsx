import { TUser } from '../../Types/users';
import React from 'react';
import { useState, useEffect } from 'react';
import { InputUser } from './inputUser';

export function Register(props: {
    setPage: React.Dispatch<React.SetStateAction<string>>;
}) {
    const newUser: TUser = {
        prenom: '',
        nom: '',
        pseudo: '',
        email: '',
        password: '',
        passwordConfirmed: '',
        adresse_line1: '',
        adresse_line2: '',
        ville: '',
        codepostal: '',
        departement: '',
        pays: '',
    };

    const [user, setUser] = useState(newUser);

    const urlAddUser = 'http://localhost:8000/api/users';

    const login = (e: React.BaseSyntheticEvent) => {
        e.preventDefault();

        if (user.password !== user.passwordConfirmed) {
            return alert('Merci de vérifier votre mot de passe !!');
        }
        async function fetchData() {
            const response = await fetch(urlAddUser, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(user),
            });

            const responseJson = await response.json();

            alert(responseJson.message);
        }
        fetchData();
    };

    /* code ajouter photo avec preview */

    const [selectedFile, setSelectedFile] = useState();
    const [preview, setPreview] = useState<string>('/default-avatar-user.jpg');
    useEffect(() => {
        if (!selectedFile) {
            setPreview('/default-avatar-user.jpg');
            return;
        }

        const objectUrl = URL.createObjectURL(selectedFile);

        setPreview(objectUrl);

        return () => URL.revokeObjectURL(objectUrl);
    }, [selectedFile]);

    const onSelectFile = (e: any) => {
        if (!e.target.files || e.target.files.length === 0) {
            setSelectedFile(undefined);
            return;
        }
        setSelectedFile(e.target.files[0]);
    };

    return (
        <div className="container-fluid">
            <div className="container card bg-light rounded  mx-auto">
                <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="card"
                    aria-label="Close"
                ></button>
                <div className="card-body">
                    <h5 className="card-title fs-2 text-center">Inscription</h5>

                    <div className="row">
                        <div className="col-md-8">
                            <InputUser
                                user={user}
                                setUser={setUser}
                            ></InputUser>
                        </div>
                        <div className="col-md-4 row custom-line">
                            <div className="container-fluid text-center mt-3 col align-self-center">
                                <img
                                    src={preview}
                                    alt="example placeholder"
                                    className="img-thumbnail"
                                    style={{
                                        height: 200,
                                        width: 200,
                                        borderRadius: 100,
                                    }}
                                />
                            </div>
                            <div className="d-flex justify-content-center">
                                <div className="btn bg-light btn-rounded ms-2">
                                    <label
                                        className="form-label text-center"
                                        htmlFor="customFile1"
                                    >
                                        <img src="addphoto64.png" alt="" />
                                    </label>
                                    <input
                                        type="file"
                                        className="form-control d-none"
                                        id="customFile1"
                                        onChange={onSelectFile}
                                    />
                                </div>
                            </div>

                            <div className="container text-center mt-3">
                                <button
                                    onClick={(e) => login(e)}
                                    className="btn bg-primary text-light btn-outline-primary"
                                    type="submit"
                                >
                                    Enregistrer
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
