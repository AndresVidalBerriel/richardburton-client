import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router-dom";

import { Modal, Button } from "antd";

import { Trans } from "react-i18next";

import FormInput from "components/utils/FormInput";
import { useInput } from "utils/hooks";

import { signIn, resetSessionState } from "store/session/actions";

import validateForm from "utils/validators/validateForm";
import { inputRules } from "components/SignIn/rules";

import "./style.less";
import { removeWhitespaceExcess, getHash } from "utils/strings";

import { useTranslation } from "react-i18next";

export default withRouter(function SignIn({ visible, setVisible, location }) {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const { loading, error, user } = useSelector(state => state.session);

    useEffect(() => {
        setVisible(false);
    }, [location.pathname]);

    const inputs = {
        email: useInput(""),
        password: useInput("")
    };

    const closeModal = () => {
        Object.keys(inputs).forEach(name => inputs[name].setValue(""));
        dispatch(resetSessionState());
        setVisible(false);
    };

    const handleSubmit = e => {
        e.preventDefault();

        dispatch(resetSessionState());

        Object.keys(inputs).forEach(name => {
            const input = inputs[name];
            input.value = removeWhitespaceExcess(input.value);
            input.setValue(input.value);
        });

        const isValid = validateForm(inputs, inputRules);

        if (isValid)
            dispatch(
                signIn(inputs.email.value, getHash(inputs.password.value))
            );
    };

    const modalHeader = (
        <h2>
            <i className="material-icons">lock_open</i>
            <span>
                <Trans i18nKey="signIn:title">
                    Sign In title <strong>Richard Burton Platform</strong>
                </Trans>
            </span>
        </h2>
    );

    const modalFooter = (
        <>
            <span className="error">{error && t(error.message)}</span>

            <Button htmlType="submit" type="primary" form="sign-in-form">
                Sign in
            </Button>
        </>
    );

    return (
        <Modal
            className="sign-in-modal"
            title={modalHeader}
            visible={!user && visible}
            confirmLoading={loading}
            onCancel={closeModal}
            footer={modalFooter}
        >
            <form id="sign-in-form" onSubmit={handleSubmit} noValidate>
                <FormInput
                    form="sign-up-form"
                    name="email"
                    label={t("user:email")}
                    {...inputs.email}
                    required
                />
                <FormInput
                    form="sign-up-form"
                    name="password"
                    label={t("user:password")}
                    type="password"
                    {...inputs.password}
                    required
                />
            </form>
        </Modal>
    );
});
