import React from "react";
import { Divider } from "antd";
import { useTranslation } from "react-i18next";

import "./style.less";

export default function BookSummary({ authorAlias = "author", book }) {
    const { t } = useTranslation();
    return (
        <section className="book-summary">
            <div>
                <label>
                    {t(`book:${authorAlias}`, { count: book.authors.length })}
                </label>
                <span>
                    {book.authors.map(author => author.name).join(" & ")}
                </span>
            </div>
            <Divider />
            <section className="publications">
                <span>Publications</span>
                <ul>
                    {book.publications.map((publication, index) => (
                        <li key={index}>
                            {Object.keys(publication)
                                .map(key => publication[key])
                                .join(", ")}
                        </li>
                    ))}
                </ul>
            </section>
        </section>
    );
}
