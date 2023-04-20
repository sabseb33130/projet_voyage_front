import React, { useContext, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { MutableRefObject } from 'react';
import '../../App.css';
import { UserContext } from '../../Contexts/userContext';

export const Contact = () => {
    const form = useRef() as MutableRefObject<HTMLFormElement>;
    const { user } = useContext(UserContext);
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
                type="button"
                className="border border-0 me-5 mt-2  text-primary "
                /*     style={{ height: 0 }} */
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
            >
                Inviter des amis
            </a>
            <div className="container bg-light rounded mt-5" id="container">
                <div
                    className="modal fade"
                    id="exampleModal"
                    tabIndex={-1}
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                >
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1
                                    className="modal-title fs-5"
                                    id="exampleModalLabel"
                                >
                                    Invitation
                                </h1>
                                <button
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                ></button>
                            </div>
                            <div className="modal-body">
                                <form ref={form} onSubmit={sendEmail}>
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
                                            defaultValue={user?.nom}
                                            className="form-control"
                                            id="text"
                                            aria-describedby="text"
                                            title={user?.nom}
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
                                        className="btn button mb-3
                "
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
