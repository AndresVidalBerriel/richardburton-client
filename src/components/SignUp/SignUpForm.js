import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

import { inputRules, crossInputRules } from "components/SignUp/rules";

import "./style.less";

import { getHash } from "utils/strings";

import * as routes from "routes";
import { useTranslation } from "react-i18next";
import useSignUp from "hooks/useSignUp";
import Form from "components/utils/Form";

export default function SignUpForm() {
    const { t } = useTranslation();

    const user = useSelector(state => state.session.user);

    const { message, signUp, reset } = useSignUp();

    const inputs = [
        { name: "email", label: t("user:email"), required: true },
        { name: "name", label: t("user:fullName"), required: true },
        {
            name: "password",
            label: t("user:password"),
            type: "password",
            required: true
        },
        {
            name: "repeatPassword",
            label: t("user:repeatPassword"),
            type: "password",
            required: true
        },
        { name: "nationality", label: t("user:nationality") },
        { name: "affiliation", label: t("user:affiliation") },
        { name: "occupation", label: t("user:occupation") }
    ];

    const serialize = inputs => {
        const data = {};

        inputs.forEach(({ name, state: { value } }) => {
            if (name === "name") {
                const idx = value.indexOf(" ");
                data.firstName = value.substring(0, idx);
                data.lastName = value.substring(idx + 1);
            } else if (name === "password") {
                data.authenticationString = getHash(value);
            } else if (name !== "repeatPassword" && value) {
                data[name] = value;
            }
        });

        return data;
    };

    return user !== undefined ? (
        <Redirect to={routes.USER_PROFILE_BASE} />
    ) : (
        <Form
            id="sign-up-form"
            inputs={inputs}
            onSubmit={signUp}
            message={message && t(message)}
            serialize={serialize}
            inputRules={inputRules}
            crossInputRules={crossInputRules}
        />
    );
}
