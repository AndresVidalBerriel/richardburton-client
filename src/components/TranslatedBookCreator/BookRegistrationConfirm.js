import React, { useEffect, useState } from "react";
import { Button, Modal } from "antd";
import { useTranslation } from "react-i18next";

import "./style.less";

import BookSummary from "components/TranslatedBookCreator/BookSummary";
import TranslatedBookController from "api/controllers/translation";
import usePromise from "utils/hooks/usePromise";

import { ORIGINAL_TITLE } from "data/fields/book";
import { RESEMBLES } from "data/operators";
import { NAME } from "data/fields/author";

import {
    buildBookQuery,
    connectors,
    buildQueryFromRules,
    composeQueries
} from "data/query";

import BookProfilePreview from "components/BookProfilePreview";

const BookCoincidenceDialog = ({ books }) => {
    const [selectedBook, setSelectedBook] = useState();
    const [drawerVisible, setDrawerVisible] = useState(false);

    const handleRecordClick = book => {
        setSelectedBook(book);
        setDrawerVisible(true);
    };

    return (
        <>
            <section className="book-coincidence-dialog">
                <p>
                    The books listed below are already registered in the
                    database and have some similarities to the one you are
                    registering. Please check if you are not registering a
                    duplicate.{" "}
                    <strong>
                        More information about each book is accessible by
                        clicking on them
                    </strong>
                    . Click on <strong>OK</strong> if you are sure that you are
                    providing new data.
                </p>
                <ul>
                    {books.map((book, index) => (
                        <li key={index} onClick={() => handleRecordClick(book)}>
                            {book.publications[0].title} (
                            {book.authors
                                .map(author => author.name)
                                .join(" & ")}
                            )
                        </li>
                    ))}
                </ul>
            </section>
            {selectedBook && (
                <BookProfilePreview
                    book={selectedBook}
                    visible={drawerVisible}
                    onClose={() => setDrawerVisible(false)}
                />
            )}
        </>
    );
};

export default function BookRegistrationConfirm({
    onBack,
    onDone,
    originalBook,
    translatedBook
}) {
    const { t } = useTranslation();

    const { loading, data, fetch } = usePromise(
        TranslatedBookController.retrieveTranslations
    );

    const search = () => {
        const queryString = composeQueries(
            [
                buildBookQuery(translatedBook),
                buildQueryFromRules(
                    originalBook.publications.map(publication => ({
                        field: ORIGINAL_TITLE,
                        operator: RESEMBLES,
                        value: publication.title
                    })),
                    connectors.OR
                ),
                buildQueryFromRules(
                    originalBook.authors.map(author => ({
                        field: NAME,
                        operator: RESEMBLES,
                        value: author.name
                    })),
                    connectors.OR
                )
            ],
            connectors.OR
        );
        fetch({ searchFor: queryString, pageSize: 10 });
    };

    useEffect(() => {
        if (data && data.length > 0) {
            Modal.confirm({
                title:
                    "We've found some entries similar to the one you are registering.",

                content: <BookCoincidenceDialog books={data} />,

                onOk: onDone
            });
        } else if (data) {
            onDone();
        }
    }, [data]);

    return (
        <section className="confirm-registration">
            <header>
                <div className="heading">
                    <h3>Confirm registration</h3>
                    <Button size="small" onClick={onBack}>
                        {t("back")}
                    </Button>
                </div>
                <p>
                    This is a summary of the data you provided. Please check
                    that everything is correct and click on{" "}
                    <strong>Continue</strong> when you're ready. You can go back
                    to make any corrections.
                </p>
            </header>
            <div className="content">
                <section className="summary">
                    <h3>Summary</h3>
                    <div className="content">
                        <h4>Original Book</h4>
                        <BookSummary book={originalBook} />
                        <h4>Translated Book</h4>
                        <BookSummary
                            authorAlias="translator"
                            book={translatedBook}
                        />
                    </div>
                </section>
            </div>
            <footer>
                <Button type="primary" onClick={search} loading={loading}>
                    {t("continue")}
                </Button>
            </footer>
        </section>
    );
}
