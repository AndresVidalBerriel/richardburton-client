import React, { useEffect } from "react";
import useInput from "hooks/useInput";
import { Button } from "antd";
import FormInput from "components/utils/FormInput";
import { useTranslation } from "react-i18next";
import { removeWhitespaceExcess } from "utils/strings";
import validateForm from "utils/validators/validateForm";

export default function Form({
    id,
    inputs,
    onSubmit: submit,
    message,
    serialize,
    inputRules,
    crossInputRules
}) {
    inputs.forEach(input => (input.state = useInput(input.initialState)));

    const { t } = useTranslation();

    const handleSubmit = e => {
        e.preventDefault();

        inputs.forEach(({ state: { value, setValue } }) =>
            setValue(removeWhitespaceExcess(value))
        );

        const isValid = validateForm(inputs, inputRules, crossInputRules);

        if (isValid) submit(serialize(inputs));
    };

    return (
        <form id={id} onSubmit={handleSubmit} noValidate>
            {inputs.map(input => {
                const { state, ...props } = input;

                return (
                    <FormInput
                        key={input.name}
                        form={id}
                        {...props}
                        {...state}
                    />
                );
            })}
            <footer>
                <span className="error">{message}</span>
                <Button htmlType="submit">{t("submit")}</Button>
            </footer>
        </form>
    );
}
