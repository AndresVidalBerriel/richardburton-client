import React, { useState, useEffect } from "react";

import { Button, Icon } from "antd";

import LoadingView from "components/LoadingView";
import Record from "components/BookBrowser/Record";
import Search from "components/BookBrowser/Search";
import BookProfilePreview from "components/BookProfilePreview";

import "./style.less";
import { useTranslation } from "react-i18next";
import { buildSingleRuleQuery } from "data/query";
import { STARTS_WITH } from "data/operators";
import TranslatedBookController from "api/controllers/translation";

import useFetchPaginator from "hooks/useFetchPaginator";

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

    const [searchFor, setSearchFor] = useState(searchQuery);

    const {
        currentPage,
        displayPage,
        pageUp,
        pageDown,
        loading,
        error,
        onLastPage,
        reload
    } = useFetchPaginator(afterId =>
        TranslatedBookController.retrieveTranslations({
            afterId,
            pageSize,
            searchFor,
            searchOnDefaultFields
        })
    );

    useEffect(() => {
        reload();
    }, [searchFor]);

    const handleSearch = value => {
        const query = buildSingleRuleQuery({
            operator: STARTS_WITH,
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
