import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";

import "./style.less";
import SignIn from "components/SignIn";

const Item = withRouter(({ icon, text, url, location, onClick }) => {
    const selected = location.pathname === url ? "selected" : "";

    const content = (
        <span>
            <div className="icon">
                <i className="material-icons">{icon}</i>
            </div>
            <span>{text}</span>
        </span>
    );

    return url ? (
        <Link to={url} className={`nav-item ${selected}`}>
            {content}
        </Link>
    ) : (
        <div className={`nav-item ${selected}`} onClick={onClick}>
            {content}
        </div>
    );
});

export default function SideBar() {
    const [signInVisible, setSignInVisible] = useState(false);

    return (
        <>
            <nav>
                <Item
                    location={location}
                    url="/"
                    icon="menu_book"
                    text="Browse"
                />
                <Item
                    location={location}
                    url="/books"
                    icon="book"
                    text="Book management"
                />
                <Item
                    location={location}
                    url="/sign-up"
                    icon="account_circle"
                    text="Sign Up"
                />
                <Item
                    location={location}
                    icon="lock_open"
                    text="Sign In"
                    onClick={() => setSignInVisible(true)}
                />
            </nav>
            <SignIn visible={signInVisible} setVisible={setSignInVisible} />
        </>
    );
}
