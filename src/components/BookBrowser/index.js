import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
    retrieveTranslations,
    resetTranslationRetrievalState
} from "store/translations/actions";

import { Button, Icon } from "antd";

import LoadingView from "components/LoadingView";
import Record from "components/BookBrowser/Record";
import Search from "components/BookBrowser/Search";
import BookProfilePreview from "components/BookProfilePreview";

import "./style.less";
import { useTranslation } from "react-i18next";
import { operators, buildSingleRuleQuery } from "data/query";

const PageButton = ({ page, type, disabled }) => (
    <Button type={type} className="page-button" disabled={disabled}>
        {page}
    </Button>
);

export default function BookBrowser({
    pageSize = 13,
    searchQuery,
    searchOnDefaultFields,
    hideSearchBar
}) {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const { loading, error, data } = useSelector(
        state => state.translations.retrieval
    );

    const [pages, setPages] = useState([{ afterId: -1, data: undefined }]);
    const [currentPage, setCurrentPage] = useState(0);
    const [firstLoaded, setFirstLoaded] = useState(false);
    const [displayPage, setDisplayPage] = useState(undefined);
    const [searchFor, setSearchFor] = useState(searchQuery);

    const firstPageEmpty =
        pages[0] && pages[0].data && pages[0].data.length === 0;

    const nextPage = pages[currentPage + 1];
    const nextPageEmpty =
        nextPage && nextPage.data && nextPage.data.length === 0;

    const onLastPage = firstPageEmpty || nextPageEmpty;

    const fetchPage = afterId => {
        dispatch(
            retrieveTranslations(
                afterId,
                pageSize,
                searchFor,
                searchOnDefaultFields
            )
        );
    };

    useEffect(() => {
        fetchPage(-1);
    }, []);

    useEffect(() => () => dispatch(resetTranslationRetrievalState()), []);

    useEffect(() => {
        dispatch(resetTranslationRetrievalState());
        setPages([{ afterId: -1, data: undefined }]);
        setCurrentPage(0);
        setFirstLoaded(false);
        setDisplayPage(undefined);
    }, [searchFor]);

    useEffect(() => {
        if (data && !firstLoaded) {
            pages[currentPage].data = data;

            if (data.length > 0) {
                const afterId = data[data.length - 1].id;
                setPages([...pages, { afterId }]);
            }

            setDisplayPage(data);
            setFirstLoaded(true);
        } else if (data) {
            pages[pages.length - 1].data = data;
            setPages([...pages]);
        }
    }, [data]);

    useEffect(() => {
        const { afterId, data } = pages[pages.length - 1];
        if (!data) fetchPage(afterId);
    }, [pages]);

    useEffect(() => {
        dispatch(resetTranslationRetrievalState());
    }, [pages[pages.length - 1].data]);

    useEffect(() => {
        setDisplayPage(pages[currentPage].data);
    }, [currentPage]);

    const pageUp = () => {
        if (!onLastPage) {
            setCurrentPage(currentPage + 1);
            const { data } = pages[pages.length - 1];
            if (data.length > 0) {
                const afterId = data[data.length - 1].id;
                setPages([...pages, { afterId }]);
            }
        }
    };

    const pageDown = () => {
        if (currentPage > 0) setCurrentPage(currentPage - 1);
    };

    const handleSearch = value => {
        const query = buildSingleRuleQuery({
            operator: operators.STARTS_WITH,
            value
        });
        setSearchFor(query);
    };

    const [selectedBook, setSelectedBook] = useState();
    const [drawerVisible, setDrawerVisible] = useState(false);

    const handleRecordClick = index => {
        setSelectedBook(displayPage[index]);
        setDrawerVisible(true);
    };

    return (
        <div className="book-browser">
            {!hideSearchBar && (
                <header>
                    <Search onSearch={handleSearch} />
                </header>
            )}
            <div className="book-browser-content">
                {!displayPage && loading ? (
                    <LoadingView />
                ) : error ? (
                    <div>Error :(</div>
                ) : displayPage && displayPage.length > 0 ? (
                    <table>
                        <thead>
                            <tr>
                                <th>{t("book:title")}</th>
                                <th>{t("book:translator")}</th>
                                <th>{t("book:original")}</th>
                                <th>{t("book:author")}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {displayPage.map((record, index) => (
                                <Record
                                    key={index}
                                    {...record}
                                    onClick={() => handleRecordClick(index)}
                                />
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <div>{t("search:noResults")}</div>
                )}
            </div>
            <footer>
                <Button.Group>
                    <Button
                        className="page-button"
                        type="primary"
                        onClick={pageDown}
                        disabled={!currentPage}
                    >
                        <Icon type="left" />
                    </Button>

                    <PageButton page={currentPage} disabled />

                    <Button
                        className="page-button"
                        type="primary"
                        onClick={pageUp}
                        disabled={loading || onLastPage}
                    >
                        <Icon type="right" />
                    </Button>
                </Button.Group>
            </footer>

            {selectedBook && (
                <BookProfilePreview
                    book={selectedBook}
                    visible={drawerVisible}
                    onClose={() => setDrawerVisible(false)}
                />
            )}
        </div>
    );
}
