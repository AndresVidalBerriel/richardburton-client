import * as fields from "data/fields";

const defaultSearchFields = [
    fields.TRANSLATION_TITLE,
    fields.TRANSLATION_AUTHOR,
    fields.ORIGINAL_TITLE,
    fields.ORIGINAL_AUTHOR
];

export const operators = {
    IS: "is",
    ABOVE: "above",
    BELOW: "below"
};

export const connectors = {
    AND: "AND",
    OR: "OR"
};

export function simpleSearchQuery(string, fields = defaultSearchFields) {
    if (string) {
        const words = string.split(" ");
        const query = fields
            .map(
                field =>
                    `(${words.map(word => `${field}:${word}*`).join(" AND ")})`
            )
            .join(" OR ");

        return query;
    } else return string;
}

export function buildQueryFromRules(rules, connector) {
    const mapRuleToQuery = ({ field, operator, value }) => {
        switch (operator) {
            case operators.IS:
                return `(${value
                    .split(" ")
                    .map(word => `${field}:${word}`)
                    .join(" AND ")})`;

            case operators.BELOW:
                return `${field}:{* TO ${value}}`;

            case operators.ABOVE:
                return `${field}:{${value} TO *}`;
        }
    };

    return rules.map(mapRuleToQuery).join(` ${connector} `);
}
