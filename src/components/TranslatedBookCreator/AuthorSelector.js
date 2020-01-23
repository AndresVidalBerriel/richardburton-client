import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Input } from "antd";
import usePromise from "utils/hooks/usePromise";
import AuthorController from "api/controllers/author";
import { connectors, buildQueryFromRules } from "data/query";
import { NAME } from "data/fields/author";
import { RESEMBLES, STARTS_WITH } from "data/operators";
import Tag from "components/utils/Tag";
import LoadingView from "components/LoadingView/index";

export default function AuthorSelector({
    selectedAuthors,
    setSelectedAuthors,
    authorAlias
}) {
    const { t } = useTranslation();

    const { loading, data, fetch } = usePromise(
        AuthorController.retrieveAuthors
    );

    const [authors, setAuthors] = useState([]);
    const [searchedAuthor, setSearchedAuthor] = useState([]);

    const search = value => {
        if (value) {
            setSearchedAuthor(value);
            const queryString = buildQueryFromRules(
                [
                    {
                        field: NAME,
                        operator: RESEMBLES,
                        value
                    },
                    {
                        field: NAME,
                        operator: STARTS_WITH,
                        value
                    }
                ],
                connectors.OR
            );

            fetch({ searchFor: queryString, pageSize: 3 });
        }
    };

    useEffect(() => {
        if (data) {
            let author;
            let exactMatch = false;

            for (author of data)
                if (author.name === searchedAuthor) {
                    exactMatch = true;
                    break;
                }

            if (!exactMatch) setAuthors([...data, { name: searchedAuthor }]);
            else setAuthors([...data]);
        }
    }, [data]);

    const select = author => {
        let selected;
        let alreadySelected = false;

        for (selected of selectedAuthors)
            if (selected.name === author.name) {
                alreadySelected = true;
                break;
            }

        if (!alreadySelected) setSelectedAuthors([...selectedAuthors, author]);
    };

    const deselect = index => {
        selectedAuthors.splice(index, 1);
        setSelectedAuthors([...selectedAuthors]);
    };

    return (
        <div className="selector">
            <h4>{t(`book:${authorAlias}_plural`)}</h4>
            <Input.Search
                className="field"
                placeholder={t("book:placeholder/authorName")}
                onSearch={search}
                enterButton
            />

            <ul className="field">
                {loading ? (
                    <LoadingView />
                ) : authors.length > 0 ? (
                    authors.map((author, index) => (
                        <li key={index} onClick={() => select(author)}>
                            {author.name}
                            {!author.id && (
                                <Tag text="Select to add new author" />
                            )}
                        </li>
                    ))
                ) : (
                    <li className="empty">{t("search:nothingSearched")}</li>
                )}
            </ul>

            <footer className="selected-items">
                <span>
                    {t(
                        `book:placeholder/selected${authorAlias
                            .charAt(0)
                            .toUpperCase()}${authorAlias.slice(1)}_plural`
                    )}
                </span>
                <div>
                    {selectedAuthors.length > 0 ? (
                        selectedAuthors.map((author, index) => (
                            <Tag
                                key={index}
                                onClose={() => deselect(index)}
                                closable
                                text={author.name}
                            />
                        ))
                    ) : (
                        <Tag text={t("nothingSelected")} />
                    )}
                </div>
            </footer>
        </div>
    );
}
