import React from "react";

import { Button } from "antd";

import FormInput from "components/utils/FormInput";

import { useInput } from "utils/hooks";
import validateForm from "utils/validators/validateForm";
import * as validatorRules from "components/SignUp/Form/validatorRules";

import "./style.less";

export default function SignUpForm() {
    const inputs = {
        email: useInput(""),
        password: useInput(""),
        repeatPassword: useInput(""),
        name: useInput(""),
        nationality: useInput(""),
        affiliation: useInput(""),
        occupation: useInput("")
    };

    const handleSubmit = () => {
        const { inputRules, crossInputRules } = validatorRules;
        validateForm(inputs, inputRules, crossInputRules);
    };

    return (
        <form id="sign-up-form">
            <FormInput
                form="sign-up-form"
                name="email"
                label="Email"
                {...inputs.email}
                required
            />
            <FormInput
                form="sign-up-form"
                name="name"
                label="Full name"
                {...inputs.name}
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
            <FormInput
                form="sign-up-form"
                name="repeatPassword"
                label="Repeat password"
                type="password"
                {...inputs.repeatPassword}
                required
            />
            <FormInput
                form="sign-up-form"
                name="nationality"
                label="Nationality"
                {...inputs.nationality}
            />
            <FormInput
                form="sign-up-form"
                name="affiliation"
                label="Affiliation"
                {...inputs.affiliation}
            />
            <FormInput
                form="sign-up-form"
                name="occupation"
                label="Occupation"
                {...inputs.occupation}
            />

            <Button onClick={handleSubmit}>Submit</Button>
        </form>
    );
}
