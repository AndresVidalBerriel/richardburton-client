import React from "react";
import { useDispatch } from "react-redux";

import { Modal } from "antd";

import FormInput from "components/utils/FormInput";
import { useInput } from "utils/hooks";

import { signIn } from "store/session/actions";

import "./style.less";

export default function SignIn({ visible, setVisible }) {
    const dispatch = useDispatch();

    const inputs = {
        email: useInput(""),
        password: useInput("")
    };

    const closeModal = () => {
        setVisible(false);
    };

    const handleSubmit = e => {
        e.preventDefault();

        const email = e.target.email.value;
        const password = e.target.password.value;

        dispatch(signIn(email, password));
    };

    const modalHeader = (
        <h2>
            <i className="material-icons">lock_open</i>
            <span>
                Sign in to de <strong>Richard Burton Platform!</strong>
            </span>
        </h2>
    );

    return (
        <Modal
            className="sign-in-modal"
            title={modalHeader}
            visible={visible}
            onOk={closeModal}
            confirmLoading={false}
            onCancel={closeModal}
        >
            <form id="sign-in-form">
                <FormInput
                    form="sign-up-form"
                    name="email"
                    label="Email"
                    {...inputs.email}
                    required
                />
                <FormInput
                    form="sign-up-form"
                    name="password"
                    label="Password"
                    type="password"
                    {...inputs.password}
                    required
                />
            </form>
        </Modal>
    );
}
