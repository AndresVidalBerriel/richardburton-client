import { useState, useEffect } from "react";
import useFetch from "hooks/useFetch";

export default function useFetchPaginator(asyncFunction) {
    const {
        loading,
        error,
        response: { data },
        fetch
    } = useFetch(asyncFunction);

    const [pages, setPages] = useState([{ afterId: -1, data: undefined }]);
    const [currentPage, setCurrentPage] = useState(0);
    const [firstLoaded, setFirstLoaded] = useState(false);
    const [displayPage, setDisplayPage] = useState(undefined);

    const firstPageEmpty =
        pages[0] && pages[0].data && pages[0].data.length === 0;

    const nextPage = pages[currentPage + 1];
    const nextPageEmpty =
        nextPage && nextPage.data && nextPage.data.length === 0;

    const onLastPage = firstPageEmpty || nextPageEmpty;

    useEffect(() => {
        fetch(-1);
    }, []);

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
        if (!data) fetch(afterId);
    }, [pages]);

    useEffect(() => {
        setDisplayPage(pages[currentPage].data);
    }, [currentPage]);

    const reload = () => {
        setPages([{ afterId: -1, data: undefined }]);
        setCurrentPage(0);
        setFirstLoaded(false);
        setDisplayPage(undefined);
    };

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

    return {
        currentPage,
        displayPage,
        pageUp,
        pageDown,
        loading,
        error,
        reload,
        onLastPage
    };
}
