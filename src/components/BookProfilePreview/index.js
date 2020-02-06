import React from "react";

import { Drawer, Divider } from "antd";

import "./style.less";
import { useTranslation } from "react-i18next";

export default function BookProfilePreview({ book, visible, onClose }) {
    const { t } = useTranslation();

    const { publications, authors, original } = book;

    const drawerHeader = (
        <>
            <div>{publications[0].title}</div>
            <div className="subtitle">{original.publications[0].title}</div>
        </>
    );

    return (
        <Drawer
            className="book-profile"
            visible={visible}
            onClose={onClose}
            getContainer={false}
            title={drawerHeader}
            width={520}
        >
            <section>
                <ul>
                    <li>
                        <span className="label">{t("book:originalTitle")}</span>
                        <span className="field">
                            {original.publications[0].title}
                        </span>
                    </li>
                    <li>
                        <span className="label">
                            {t("book:author", {
                                count: original.authors.length
                            })}
                        </span>
                        <span className="field">
                            {original.authors
                                .map(author => author.name)
                                .join(" & ")}
                        </span>
                    </li>
                    <li>
                        <span className="label">
                            {t("book:translator", { count: authors.length })}
                        </span>
                        <span className="field">
                            {authors.map(author => author.name).join(" & ")}
                        </span>
                    </li>
                </ul>
            </section>

            <Divider />

            <section>
                <header>
                    <h3>Publications</h3>
                </header>
                <ul>
                    {publications.map(
                        ({ title, year, country, publisher }, index) => (
                            <li key={index} className="publication">
                                <span className="field">{title}</span>
                                <span className="field">{year}</span>
                                <span className="field">{country}</span>
                                <span className="field">{publisher}</span>
                            </li>
                        )
                    )}
                </ul>
            </section>

            <Divider />
        </Drawer>
    );
}
