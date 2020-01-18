export const operators = {
    IS: "is",
    ABOVE: "above",
    BELOW: "below",
    STARTS_WITH: "startsWith"
};

export const connectors = {
    AND: "AND",
    OR: "OR"
};

export function buildSingleRuleQuery({ field = "", operator, value }) {
    if (!value) return value;

    const fieldPrefix = field ? `${field}:` : "";

    switch (operator) {
        case operators.IS:
            return `(${value
                .split(" ")
                .map(word => `${fieldPrefix}${word}`)
                .join(" AND ")})`;

        case operators.BELOW:
            return `${fieldPrefix}{* TO ${value}}`;

        case operators.ABOVE:
            return `${fieldPrefix}{${value} TO *}`;

        case operators.STARTS_WITH:
            return `(${value
                .split(" ")
                .map(word => `${fieldPrefix}${word}*`)
                .join(" AND ")})`;
    }
}

export function buildQueryFromRules(rules, connector) {
    return rules.map(buildSingleRuleQuery).join(` ${connector} `);
}
