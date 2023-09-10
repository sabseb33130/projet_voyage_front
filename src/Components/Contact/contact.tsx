import React, { useContext, useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { MutableRefObject } from 'react';
import { UserContext } from '../../Contexts/userContext';
import '../../App.css';
import { postInvitation } from './postInvitation';
export const Contact = (props: {
    token: string | null;
    setPage: React.Dispatch<React.SetStateAction<string>>;
}) => {
    const { user, onUserChange } = useContext(UserContext);
    const [invitation, setInvitation]: any = useState();
    const [invitationa, setInvitationa]: any = useState<string>();
    const [invitationb, setInvitationb]: any = useState<string>();
    const inputMail = (e: React.BaseSyntheticEvent) => {
        const { value } = e.target;

        setInvitation(value);
    };
    const inputNom = (e: React.BaseSyntheticEvent) => {
        const { value } = e.target;

        setInvitationa(value);
    };
    const inputMessage = (e: React.BaseSyntheticEvent) => {
        const { value } = e.target;

        setInvitationb(value);
    };

    const body = JSON.stringify({
        user_email: invitation,
        nom_invite: invitationa,
        id_invitation: invitationb,
    });

    const form = useRef() as MutableRefObject<HTMLFormElement>;

    const sendEmail = (e: React.BaseSyntheticEvent) => {
        e.preventDefault();

        emailjs
            .sendForm(
                'service_3bccldm',
                'template_uszi0ny',
                form.current,
                '5uOtouvy0TBKmZhmt',
            )
            .then(
                (result: { text: any }) => {
                    alert(result.text);
                },
                (error: { text: any }) => {
                    alert(error.text);
                },
            );
        e.target.reset();
    };

    return (
        <>
            <a
                href="./#"
                type="button"
                className="border border-0 me-4 mt-2  text-primary "
                data-bs-toggle="modal"
                data-bs-target="#emailJs"
            >
                Partager avec des amis
            </a>
            <div className="modal-dialog modal-dialog-centered">
                <div
                    className="modal fade"
                    id="emailJs"
                    tabIndex={-1}
                    aria-labelledby="emailJsLabel1"
                    aria-hidden="true"
                >
                    <div className="modal-dialog">
                        <div className="modal-content component">
                            <div className="modal-header">
                                <h1
                                    className="modal-title fs-5"
                                    id="emailJsLabel1"
                                >
                                    inviter des amis
                                </h1>
                                <button
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                ></button>
                            </div>
                            <div className="modal-body">
                                <form
                                    ref={form}
                                    onSubmit={sendEmail}
                                    id="emailJs"
                                >
                                    <div className="mb-3">
                                        <label
                                            htmlFor="InputNom"
                                            className="form-label"
                                        >
                                            Nom
                                        </label>
                                        <input
                                            type="text"
                                            name="user_name"
                                            value={`${user.nom}(${user.id})`}
                                            className="form-control"
                                            id="text"
                                            aria-describedby="text"
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label
                                            htmlFor="InputEmail"
                                            className="form-label"
                                        >
                                            Email invité
                                        </label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            id="InputEmail"
                                            name="user_email"
                                            title="invitation"
                                            onChange={(e) => inputMail(e)}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label
                                            htmlFor="nom_invite"
                                            className="form-label"
                                        >
                                            nom de l'amis invité
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="nom_invite"
                                            name="nom_invite"
                                            title="nom_invite"
                                            onChange={(e) => inputNom(e)}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label
                                            className="form-check-label"
                                            htmlFor="message"
                                        >
                                            Message
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="message"
                                            id="message"
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label
                                            className="form-check-label"
                                            htmlFor="message"
                                        >
                                            Ce nombre te permettra a ton
                                            inscription de me retrouver
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="idInvit"
                                            id="idInvit"
                                            onChange={(e) => {
                                                inputMessage(e);
                                            }}
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        value="Send"
                                        data-bs-dismiss="modal"
                                        className="btn button mb-3 border border"
                                        onClick={() => {
                                            postInvitation(
                                                body,
                                                user,
                                                onUserChange,
                                            );
                                        }}
                                    >
                                        Submit
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
