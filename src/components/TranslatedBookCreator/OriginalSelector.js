import React, { useState } from "react";
import { Input, Checkbox, Button, Modal } from "antd";
import { useTranslation } from "react-i18next";

import "./style.less";

import useFetch from "hooks/useFetch";

import OriginalBookController from "api/controllers/original";
import { buildQueryFromRules, connectors } from "data/query";
import { RESEMBLES, STARTS_WITH } from "data/operators";
import { TITLE } from "data/fields/book";
import LoadingView from "components/LoadingView";
import Tag from "components/utils/Tag";

export default function OriginalSelector({
    registerOriginal,
    setRegisterOriginal,
    onDone,
    originalBook,
    setOriginalBook
}) {
    const { t } = useTranslation();

    const {
        loading,
        response: { data: books },
        fetch
    } = useFetch(OriginalBookController.retrieveOriginals);

    const [errorMessage, setErrorMessage] = useState();

    const handleContinue = () => {
        if (originalBook) onDone();
        else if (registerOriginal) {
            setOriginalBook({ authors: [], publications: [] });
            onDone();
        } else setErrorMessage("error:mustSelectOriginalBook");
    };

    const search = value => {
        if (value) {
            const queryString = buildQueryFromRules(
                [
                    {
                        field: TITLE,
                        operator: RESEMBLES,
                        value
                    },
                    {
                        field: TITLE,
                        operator: STARTS_WITH,
                        value
                    }
                ],
                connectors.OR
            );

            fetch({ searchFor: queryString, pageSize: 8 });
        }
    };

    const select = book => {
        setOriginalBook(book);
    };

    const handleCheckBoxChange = e => {
        const { checked } = e.target;

        const cleanBookUp = () => {
            setOriginalBook(undefined);
            setRegisterOriginal(checked);
        };

        if (checked) cleanBookUp();
        else {
            Modal.confirm({
                title: "Did you find the original book?",
                content:
                    "If you uncheck this, you will lose any data you may have registered about a new original book.",

                onOk: cleanBookUp
            });
        }
    };

    return (
        <section className="original-book-selector">
            <header>
                <div className="heading">
                    <h3>Original book selector</h3>
                </div>
                <p>
                    Please search by title and select an original book of
                    brazilian literature from the resulting list below. In case
                    you don't find the book, mark the checkbox at the bottom of
                    the list to be prompted to register a new original book in
                    the platform. Click on <strong>Continue</strong> when you're
                    ready.
                </p>
            </header>
            <div className="content">
                <div className="selector">
                    <Input.Search
                        className="field"
                        placeholder="Insert the original book's title."
                        onSearch={search}
                        enterButton
                    />
                    <ul className="field">
                        {loading ? (
                            <LoadingView />
                        ) : books && books.length > 0 ? (
                            books.map((book, index) => (
                                <li key={index} onClick={() => select(book)}>
                                    {`${
                                        book.publications[0].title
                                    } (${book.authors
                                        .map(author => author.name)
                                        .join(" & ")})`}
                                </li>
                            ))
                        ) : (
                            <li className="empty">
                                {t("search:nothingSearched")}
                            </li>
                        )}
                    </ul>
                    <footer>
                        <Checkbox
                            checked={registerOriginal}
                            onChange={handleCheckBoxChange}
                        >
                            The book i'm looking for is not in the list.
                        </Checkbox>
                        {!registerOriginal && (
                            <span className="selected-items">
                                <span>Selected book:</span>
                                {originalBook ? (
                                    <Tag
                                        onClose={() => select(undefined)}
                                        closable
                                        text={
                                            originalBook.publications[0].title
                                        }
                                    />
                                ) : (
                                    <Tag text={t("nothingSelected")} />
                                )}
                            </span>
                        )}
                    </footer>
                </div>
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
