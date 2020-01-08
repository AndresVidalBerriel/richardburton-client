import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, withRouter } from "react-router-dom";

import "./style.less";
import SignIn from "components/SignIn";
import { resetSessionState } from "store/session/actions";
import * as routes from "routes";

const Item = withRouter(({ icon, text, url, location, onClick }) => {
    const selected = location.pathname === url ? "selected" : "";
    const className = `nav-item ${selected}`;

    const content = (
        <span>
            <div className="icon">
                <i className="material-icons">{icon}</i>
            </div>
            <span>{text}</span>
        </span>
    );

    return url ? (
        <Link to={url} className={className}>
            {content}
        </Link>
    ) : (
        <div className={className} onClick={onClick}>
            {content}
        </div>
    );
});

export default function SideBar() {
    const dispatch = useDispatch();
    const loggedUser = useSelector(state => state.session.user);
    const [signInVisible, setSignInVisible] = useState(false);

    return (
        <>
            <nav className="sidebar">
                <Item url={routes.HOME} icon="menu_book" text="Browse" />
                {loggedUser && (
                    <Item
                        url={routes.BOOK_MANAGEMENT}
                        icon="book"
                        text="Book management"
                    />
                )}
                {!loggedUser && (
                    <Item
                        url={routes.SIGN_UP}
                        icon="account_circle"
                        text="Sign Up"
                    />
                )}
                {loggedUser && (
                    <Item
                        url={routes.USER_PROFILE_BASE}
                        icon="account_circle"
                        text="Profile"
                    />
                )}
                {!loggedUser && (
                    <Item
                        icon="lock_open"
                        text="Sign In"
                        onClick={() => setSignInVisible(true)}
                    />
                )}
                {loggedUser && (
                    <Item
                        icon="lock_outline"
                        text="Sign Out"
                        onClick={() => dispatch(resetSessionState())}
                    />
                )}
            </nav>
            <SignIn visible={signInVisible} setVisible={setSignInVisible} />
        </>
    );
}
