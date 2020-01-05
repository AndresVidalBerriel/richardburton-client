import React from "react";

import { Input } from "antd";

import "./style.less";

const FormInput = ({ label, required, ...input }) => (
    <section className="form-input">
        <label required={required}>{label}</label>
        <Input required={required} {...input} />
    </section>
);

export default function SignUpForm() {
    return (
        <form>
            <FormInput label="Email" required />
            <FormInput label="Full name" required />
            <FormInput label="Password" required type="password" />
            <FormInput label="Repeat password" required type="password" />
            <FormInput label="Nationality" />
            <FormInput label="Affiliation" />
            <FormInput label="Occupation" />
        </form>
    );
}
