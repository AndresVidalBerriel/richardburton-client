import React from "react";

import "./style.less";
import { useSelector } from "react-redux";

export default function Header() {
    const loggedUser = useSelector(state => state.session.user);

    return (
        <header>
            <h1>Richard Burton</h1>

            {loggedUser && (
                <section className="user-info">
                    Welcome, {loggedUser.firstName}
                </section>
            )}
        </header>
    );
}
