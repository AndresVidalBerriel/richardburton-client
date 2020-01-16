import React from "react";

import "./style.less";
import { useSelector } from "react-redux";

import { Button } from "antd";
import { useTranslation } from "react-i18next";

export default function Header() {
    const { t, i18n } = useTranslation();
    const loggedUser = useSelector(state => state.session.user);

    const changeLanguage = lang => {
        i18n.changeLanguage(lang);
    };

    return (
        <header>
            <h1>Richard Burton</h1>

            {loggedUser && (
                <section className="user-info">
                    Welcome, {loggedUser.firstName}
                </section>
            )}

            <Button
                className={i18n.language == "en" ? "selected" : ""}
                onClick={() => changeLanguage("en")}
            >
                EN
            </Button>
            <Button
                className={i18n.language == "pt" ? "selected" : ""}
                onClick={() => changeLanguage("pt")}
            >
                PT
            </Button>
        </header>
    );
}
