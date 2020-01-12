import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { retrieveTranslations } from "store/translations/actions";

import { Button, Icon } from "antd";

import LoadingView from "components/LoadingView";
import Record from "components/BookBrowser/Record";
import Search from "components/BookBrowser/Search";

import "./style.less";

export default function BookBrowser({ pageSize = 15 }) {
    const dispatch = useDispatch();

    const { loading, error, data } = useSelector(
        state => state.translations.retrieval
    );

    const [pages, setPages] = useState([{ afterId: -1, data: undefined }]);
    const [currentPage, setCurrentPage] = useState(0);
    const [allConsumed, setAllConsumed] = useState(false);
    const [firstLoaded, setFirstLoaded] = useState(false);
    const [displayPage, setDisplayPage] = useState(undefined);

    const onLastPage = allConsumed && currentPage === pages.length - 1;

    console.log(onLastPage, allConsumed, pages);

    const fetchPage = afterId => dispatch(retrieveTranslations(afterId));

    useEffect(() => {
        fetchPage(-1);
    }, []);

    useEffect(() => {
        if (data && !firstLoaded) {
            pages[currentPage].data = data;
            const afterId = data[data.length - 1].id;
            setDisplayPage(data);
            setFirstLoaded(true);
            setPages([...pages, { afterId }]);
        } else if (data && data.length > 0) {
            pages[pages.length - 1].data = data;
            setPages([...pages]);
        } else if (data && data.length === 0) {
            setAllConsumed(true);
            setPages([...pages.slice(0, -1)]);
        }
    }, [data]);

    useEffect(() => {
        const { afterId, data } = pages[pages.length - 1];
        if (!data) fetchPage(afterId);
    }, [pages]);

    useEffect(() => {
        setDisplayPage(pages[currentPage].data);
    }, [currentPage]);

    const pageUp = () => {
        if (!onLastPage) {
            setCurrentPage(currentPage + 1);
            const { data } = pages[pages.length - 1];
            const afterId = data[data.length - 1].id;
            setPages([...pages, { afterId }]);
        }
    };

    const pageDown = () => {
        if (currentPage > 0) setCurrentPage(currentPage - 1);
    };

    return (
        <div className="book-browser">
            <header>
                <Search />
            </header>
            <div className="book-browser-content">
                {!displayPage || loading ? (
                    <LoadingView />
                ) : error ? (
                    <div>Error :(</div>
                ) : (
                    displayPage && (
                        <table>
                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Translators</th>
                                    <th>Original</th>
                                    <th>Author</th>
                                </tr>
                            </thead>
                            <tbody>
                                {displayPage.map(record => (
                                    <Record key={record.id} {...record} />
                                ))}
                            </tbody>
                        </table>
                    )
                )}
            </div>
            <footer>
                <Button.Group>
                    <Button
                        type="primary"
                        onClick={pageDown}
                        disabled={!currentPage}
                    >
                        <Icon type="left" />
                    </Button>
                    <Button
                        type="primary"
                        onClick={pageUp}
                        disabled={onLastPage}
                    >
                        <Icon type="right" />
                    </Button>
                </Button.Group>
            </footer>
        </div>
    );
}
