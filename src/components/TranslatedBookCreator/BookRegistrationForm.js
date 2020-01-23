import React, { useState } from "react";
import { Button, Collapse } from "antd";
import { useTranslation } from "react-i18next";

import AuthorSelector from "components/TranslatedBookCreator/AuthorSelector";
import Publications from "components/TranslatedBookCreator/Publications";

import "./style.less";

export default function BookRegistrationForm({
    title,
    introduction,
    authorAlias,
    onDone,
    onBack,
    publications,
    setPublications,
    authors,
    setAuthors
}) {
    const { t } = useTranslation();

    const [errorMessage, setErrorMessage] = useState();

    const handleContinue = () => {
        if (authors.length === 0)
            setErrorMessage("error:mustSelectAtLeastOneAuthor");
        else if (publications.length === 0)
            setErrorMessage("error:mustRegisterAtLeastOnePublication");
        else {
            onDone();
        }
    };

    return (
        <section className="registration-form">
            <header>
                <div className="heading">
                    <h3>{title}</h3>
                    <Button size="small" onClick={onBack}>
                        {t("back")}
                    </Button>
                </div>
                <p>{introduction}</p>
            </header>
            <div className="content">
                <AuthorSelector
                    authorAlias={authorAlias}
                    selectedAuthors={authors}
                    setSelectedAuthors={setAuthors}
                />
                <Publications
                    publications={publications}
                    setPublications={setPublications}
                />
            </div>

            <footer>
                <span className="error">{t(errorMessage)}</span>
                <Button type="primary" onClick={handleContinue}>
                    {t("continue")}
                </Button>
            </footer>
        </section>
    );
}
