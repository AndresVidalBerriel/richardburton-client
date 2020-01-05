import React from "react";

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
    ...input
}) {
    const { suffix, feedback } = processValidator(validator);

    const { setValidator, validate, ...inputProps } = input;

    return (
        <div className="form-input">
            <label required={required} htmlFor={name} form={form}>
                {label}
            </label>
            <div className="input-wrapper">
                <Input
                    required={required}
                    id={name}
                    suffix={suffix}
                    {...inputProps}
                    onChange={e => setValue(e.target.value)}
                />
                <footer style={feedback.style}>{feedback.value}</footer>
            </div>
        </div>
    );
}
