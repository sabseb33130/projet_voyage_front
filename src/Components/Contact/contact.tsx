import React, { useContext, useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { MutableRefObject } from 'react';
import { UserContext } from '../../Contexts/userContext';
import '../../App.css';
import { Invitations } from '../../Types/invitation';

import { defaultInvitation } from '../../constant/invitationDefault';
import { postInvitation } from './postInvitation';
export const Contact = (props: {
    token: string | null;
    setPage: React.Dispatch<React.SetStateAction<string>>;
}) => {
    const { user, onUserChange } = useContext(UserContext);
    const [invitation, setInvitation] =
        useState<Invitations>(defaultInvitation);
    const test = (e: React.BaseSyntheticEvent) => {
        const { value } = e.target;
        setInvitation(value);
    };

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
                    console.log(result.text);
                },
                (error: { text: any }) => {
                    console.log(error.text);
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
                Inviter des amis
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
                        <div className="modal-content">
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
                                            defaultValue={`${user.nom}(${user.id})`}
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
                                            onChange={(e) => test(e)}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="message"
                                            id="message"
                                        />
                                        <label
                                            className="form-check-label"
                                            htmlFor="message"
                                        >
                                            Message
                                        </label>
                                    </div>
                                    <button
                                        type="submit"
                                        value="Send"
                                        data-bs-dismiss="modal"
                                        className="btn button mb-3"
                                        onClick={() => {
                                            postInvitation(
                                                invitation,
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
