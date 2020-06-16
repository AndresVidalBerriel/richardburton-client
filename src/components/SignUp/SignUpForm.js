import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

import { Button } from "antd";

import FormInput from "components/utils/FormInput";

import validateForm from "utils/validators/validateForm";
import * as validatorRules from "components/SignUp/rules";

import "./style.less";

import { signUp, resetUserCreationState } from "store/users/actions";
import { removeWhitespaceExcess, getHash } from "utils/strings";

import * as routes from "routes";
import { useTranslation } from "react-i18next";
import useInput from "hooks/useInput";

export default function SignUpForm() {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    useEffect(() => () => dispatch(resetUserCreationState()), []);

    const inputs = {
        email: useInput(""),
        password: useInput(""),
        repeatPassword: useInput(""),
        name: useInput(""),
        nationality: useInput(""),
        affiliation: useInput(""),
        occupation: useInput("")
    };

    const handleSubmit = e => {
        e.preventDefault();

        dispatch(resetUserCreationState());

        Object.keys(inputs).forEach(name => {
            const input = inputs[name];
            input.value = removeWhitespaceExcess(input.value);
            input.setValue(input.value);
        });

        const { inputRules, crossInputRules } = validatorRules;
        const isValid = validateForm(inputs, inputRules, crossInputRules);

        if (isValid) {
            const data = {};
            Object.keys(inputs).forEach(name => {
                const input = inputs[name];

                if (name === "name") {
                    const idx = input.value.indexOf(" ");
                    data.firstName = input.value.substring(0, idx);
                    data.lastName = input.value.substring(idx + 1);
                } else if (name === "password") {
                    data.authenticationString = getHash(input.value);
                } else if (name !== "repeatPassword" && input.value) {
                    data[name] = input.value;
                }
            });

            dispatch(signUp(data));
        }
    };

    const user = useSelector(state => state.session.user);

    const error = useSelector(state => state.users.creation.error);

    return user !== undefined ? (
        <Redirect to={routes.USER_PROFILE_BASE} />
    ) : (
        <form id="sign-up-form" onSubmit={handleSubmit} noValidate>
            <FormInput
                form="sign-up-form"
                name="email"
                label={t("user:email")}
                {...inputs.email}
                required
            />
            <FormInput
                form="sign-up-form"
                name="name"
                label={t("user:fullName")}
                {...inputs.name}
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
            <FormInput
                form="sign-up-form"
                name="repeatPassword"
                label={t("user:repeatPassword")}
                type="password"
                {...inputs.repeatPassword}
                required
            />
            <FormInput
                form="sign-up-form"
                name="nationality"
                label={t("user:nationality")}
                {...inputs.nationality}
            />
            <FormInput
                form="sign-up-form"
                name="affiliation"
                label={t("user:affiliation")}
                {...inputs.affiliation}
            />
            <FormInput
                form="sign-up-form"
                name="occupation"
                label={t("user:occupation")}
                {...inputs.occupation}
            />
            <footer>
                <span className="error">{error && t(error.message)}</span>
                <Button htmlType="submit">{t("submit")}</Button>
            </footer>
        </form>
    );
}
