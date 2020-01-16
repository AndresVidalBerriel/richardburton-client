import React from "react";
import { Link } from "react-router-dom";

import { Tooltip } from "antd";

const Field = ({ value, linkTo }) => {
    return (
        <td>
            <Tooltip title={value}>
                {linkTo ? (
                    <Link to={linkTo}>{value}</Link>
                ) : (
                    <span>{value}</span>
                )}
            </Tooltip>
        </td>
    );
};

export default function Record({ id, authors, publications, original }) {
    return (
        <tr>
            <Field value={publications[0].title} />
            <Field value={authors.map(a => a.name).join(" & ")} />
            <Field value={original.publications[0].title} />
            <Field value={original.authors.map(a => a.name).join(" & ")} />
        </tr>
    );
}
