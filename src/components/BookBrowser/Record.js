import React from "react";

export default function Record({ id, authors, year, publications, original }) {
    return (
        <tr>
            <td>{publications[0].title}</td>
            <td>{authors.map(a => a.name).join(" & ")}</td>
            <td>{original.publications[0].title}</td>
            <td>{original.authors.map(a => a.name).join(" & ")}</td>
        </tr>
    );
}
