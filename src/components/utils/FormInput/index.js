import React from "react";

import { useTranslation } from "react-i18next";

import { Input, Icon } from "antd";

import "./style.less";

const processValidator = validator => {
    let suffix = <Icon type="blank" />;
    let feedback = {};

    if (validator) {
        feedback.value = validator.feedback;

        switch (validator.status) {
            case "success":
                suffix = (
                    <Icon
                        type="check-circle"
                        theme="filled"
                        style={{ color: "limegreen" }}
                    />
                );
                break;

            case "warning":
                suffix = (
                    <Icon
                        type="exclamation-circle"
                        theme="filled"
                        style={{ color: "orange" }}
                    />
                );
                break;

            case "error":
                suffix = (
                    <Icon
                        type="close-circle"
                        theme="filled"
                        style={{ color: "red" }}
                    />
                );
                feedback.style = { color: "red" };
                break;
            case "validating":
                suffix = (
                    <Icon type="loading" style={{ color: "dodgerblue" }} />
                );
        }
    }

    return {
        suffix,
        feedback
    };
};

export default function FormInput({
    form,
    name,
    label,
    required,
    validator,
    setValue,
    Button,
    ...input
}) {
    const { t } = useTranslation();

    const { suffix, feedback } = processValidator(validator);
    const { setValidator, validate, ...inputProps } = input;

    const InputComponent = (
        <Input
            required={required}
            id={name}
            suffix={suffix}
            {...inputProps}
            onChange={e => setValue(e.target.value)}
        />
    );

    return (
        <div className="form-input">
            {label && (
                <label required={required} htmlFor={name} form={form}>
                    {label}
                </label>
            )}

            {InputComponent}
            {Button}

            <div className="input-wrapper">
                <div className="feedback" style={feedback.style}>
                    {t(feedback.value)}
                </div>
            </div>
        </div>
    );
}
