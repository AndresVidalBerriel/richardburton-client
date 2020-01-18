import React from "react";

import { Button, Select } from "antd";

import FormInput from "components/utils/FormInput";

import "./style.less";
import { useTranslation } from "react-i18next";

export default function OriginalRegistrationForm({ onDone, onBack }) {
    const { t } = useTranslation();

    const AddAuthorButton = <Button icon="plus" />;
    const RemoveAuthorButton = <Button icon="close" />;

    return (
        <section className="registration-form">
            <header>
                <div className="heading">
                    <h3>Original book registration</h3>
                    <Button size="small" onClick={onBack}>
                        Back
                    </Button>
                </div>
                <p>
                    Please complete the form with the data{" "}
                    <strong>
                        about the original book of brazilian literature
                    </strong>
                    . Click on <strong>Continue</strong> when you're ready.
                </p>
            </header>

            <form>
                <Select />
                <FormInput Button={RemoveAuthorButton} />
                <FormInput placeholder="Title"></FormInput>
                <FormInput placeholder="Year"></FormInput>
                <FormInput placeholder="Publisher"></FormInput>
                <FormInput placeholder="Country"></FormInput>
            </form>
        </section>
    );
}
