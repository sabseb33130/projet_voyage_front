import React, { FormHTMLAttributes, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { MutableRefObject } from 'react';

export const Contact = () => {
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
        <div className="container component mt-5 rounded">
            <form ref={form} onSubmit={sendEmail}>
                <div className="mb-3">
                    <label htmlFor="InputNom" className="form-label">
                        Nom
                    </label>
                    <input
                        type="text"
                        name="user_name"
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="InputEmail" className="form-label">
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
                    <label className="form-check-label" htmlFor="message">
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
            {/* <form ref={form} className="mb-2" onSubmit={sendEmail}>
                <div className="mt-2 mb-3">
                    <label className="me-4">Name</label>
                    <input
                        className="mt-3 rounded"
                        type="text"
                        name="user_name"
                    />
                </div>
                <div className="mt-3 mb-3">
                    <label className="me-4">Email</label>
                    <input
                        className="mt-3 rounded"
                        type="email"
                        name="user_email"
                    />
                </div>
                <div className="mt-3 mb-3">
                    <label className="me-2">Message</label>
                    <textarea className="rounded" name="message" />
                    <div className="ms-4">
                        <input className="mt-3" type="submit" value="Send" />
                    </div>
                </div>
            </form> */}
        </div>
    );
};
