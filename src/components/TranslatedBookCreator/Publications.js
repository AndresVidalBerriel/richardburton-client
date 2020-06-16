import React, { useState, useEffect } from "react";
import { Button, InputNumber, Select, Modal, Tooltip } from "antd";
import { useTranslation } from "react-i18next";
import countries from "i18n-iso-countries";
import FormInput from "components/utils/FormInput";
import useInput from "hooks/useInput";
import validateForm from "utils/validators/validateForm";
import { inputRules } from "components/TranslatedBookCreator/rules";

const PublicationsForm = ({ visible, setVisible, onDone, formInit }) => {
    const { t, i18n } = useTranslation();

    const countryOptions = Object.keys(countries.getAlpha2Codes()).map(key => (
        <Select.Option key={key}>
            {countries.getName(key, i18n.language)}
        </Select.Option>
    ));

    const inputs = {
        title: useInput(""),
        year: useInput(""),
        country: useInput(),
        publisher: useInput(""),
        isbn: useInput("")
    };

    useEffect(() => {
        if (formInit) {
            Object.keys(formInit).forEach(key => {
                inputs[key].setValue(formInit[key]);
            });
        } else {
            Object.keys(inputs).forEach(key => {
                inputs[key].reset();
            });
        }
    }, [formInit]);

    const handleSubmit = () => {
        const isValid = validateForm(inputs, inputRules);
        if (isValid) {
            const publication = {};

            Object.keys(inputs)
                .filter(key => inputs[key].value)
                .forEach(key => {
                    publication[key] = inputs[key].value;
                });

            onDone(publication);
        }
    };

    return (
        <Modal
            title={<h2>{t("book:placeholder/addPublication")}</h2>}
            footer={
                <Button type="primary" onClick={handleSubmit}>
                    {t("done")}
                </Button>
            }
            visible={visible}
            onCancel={() => setVisible(false)}
            width="400px"
        >
            <form className="publications-form" noValidate>
                <FormInput
                    label={t("book:title")}
                    placeholder={t("book:placeholder/publication/title")}
                    required
                    {...inputs.title}
                />
                <FormInput
                    label={t("book:year")}
                    required
                    {...inputs.year}
                    placeholder={t("book:placeholder/publication/year")}
                    style={{ width: "100%" }}
                    parser={value => value.replace(/[^0-9]/g, "")}
                    max={new Date().getFullYear()}
                    min={0}
                    InputComponent={InputNumber}
                />

                <FormInput
                    label={t("book:country")}
                    placeholder={t("book:placeholder/publication/country")}
                    required
                    InputComponent={Select}
                    {...inputs.country}
                >
                    {countryOptions}
                </FormInput>

                <FormInput
                    label={t("book:publisher")}
                    placeholder={t("book:placeholder/publication/publisher")}
                    {...inputs.publisher}
                />
                <FormInput
                    label="ISBN"
                    placeholder={t("book:placeholder/publication/isbn")}
                    {...inputs.isbn}
                />
            </form>
        </Modal>
    );
};

const EDIT = "EDIT";
const ADD = "ADD";

export default function Publications({ publications, setPublications }) {
    const { t } = useTranslation();

    const [formVisible, setFormVisible] = useState();
    const [formMode, setFormMode] = useState({ action: ADD, index: undefined });

    const handleEdit = index => {
        setFormMode({ action: EDIT, index });
        setFormVisible(true);
    };

    const handleRemove = index => {
        publications.splice(index, 1);
        setPublications([...publications]);
    };

    const handleDone = publication => {
        const { action, index } = formMode;

        switch (action) {
            case ADD:
                setPublications([...publications, publication]);
                break;
            case EDIT:
                publications[index] = publication;
                setPublications([...publications]);
                setFormMode({ action: ADD, index: undefined });
                break;
        }

        setFormVisible(false);
    };

    return (
        <section className="publications">
            <header>
                <h4>Publications</h4>
                <Button
                    icon="plus"
                    shape="round"
                    size="small"
                    onClick={() => setFormVisible(true)}
                >
                    {t("book:placeholder/addPublication")}
                </Button>
            </header>
            <ul>
                {publications.length > 0 ? (
                    publications.map((publication, index) => (
                        <li key={index}>
                            <span>
                                {Object.keys(publication)
                                    .map(key => publication[key])
                                    .join(", ")}
                            </span>
                            <Tooltip title={t("edit")}>
                                <Button
                                    size="small"
                                    icon="edit"
                                    shape="circle"
                                    onClick={() => handleEdit(index)}
                                ></Button>
                            </Tooltip>
                            <Tooltip title={t("delete")}>
                                <Button
                                    size="small"
                                    icon="close"
                                    shape="circle"
                                    onClick={() => handleRemove(index)}
                                ></Button>
                            </Tooltip>
                        </li>
                    ))
                ) : (
                    <li className="empty">
                        {t("book:placeholder/noPublications")}
                    </li>
                )}
            </ul>

            <PublicationsForm
                visible={formVisible}
                setVisible={setFormVisible}
                onDone={handleDone}
                formInit={
                    formMode.index !== undefined
                        ? publications[formMode.index]
                        : undefined
                }
            />
        </section>
    );
}
