import { IS, BELOW, ABOVE, STARTS_WITH, RESEMBLES } from "data/operators";
import { TITLE, YEAR, COUNTRY, PUBLISHER } from "data/fields/book";
import { NAME } from "data/fields/author";

export const connectors = {
    AND: "AND",
    OR: "OR"
};

export function escapeCharacters(queryString) {
    return queryString.replace(":", "\\:");
}

export function buildSingleRuleQuery({ field = "", operator, value }) {
    if (!value) return value;

    value = escapeCharacters(String(value));

    const fieldPrefix = field ? `${field}:` : "";

    switch (operator) {
        case IS:
            return `(${value
                .split(" ")
                .map(word => `${fieldPrefix}${word}`)
                .join(" AND ")})`;

        case BELOW:
            return `(${fieldPrefix}{* TO ${value}})`;

        case ABOVE:
            return `(${fieldPrefix}{${value} TO *})`;

        case STARTS_WITH:
            return `(${value
                .split(" ")
                .map(word => `${fieldPrefix}${word}*`)
                .join(" AND ")})`;

        case RESEMBLES:
            return `(${value
                .split(" ")
                .map(word => `${fieldPrefix}${word}~`)
                .join(" AND ")})`;
    }
}

export function buildQueryFromRules(rules, connector) {
    return rules
        .map(buildSingleRuleQuery)
        .filter(query => query)
        .join(` ${connector} `);
}

export function composeQueries(queries, connector) {
    return queries.map(query => `(${query})`).join(` ${connector} `);
}

export function buildBookQuery(book) {
    const publicationsQuery = composeQueries(
        book.publications.map(publication =>
            buildQueryFromRules(
                [
                    {
                        field: TITLE,
                        operator: RESEMBLES,
                        value: publication.title
                    },
                    {
                        field: PUBLISHER,
                        operator: RESEMBLES,
                        value: publication.publisher
                    }
                ],
                connectors.AND
            )
        ),
        connectors.OR
    );

    const authorsQuery = buildQueryFromRules(
        book.authors.map(author => ({
            field: NAME,
            operator: RESEMBLES,
            value: author.name
        })),
        connectors.OR
    );

    return composeQueries([publicationsQuery, authorsQuery], connectors.OR);
}
