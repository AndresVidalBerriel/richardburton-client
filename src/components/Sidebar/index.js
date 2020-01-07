import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, withRouter } from "react-router-dom";

import "./style.less";
import SignIn from "components/SignIn";
import { clearSession } from "store/session/actions";

const Item = withRouter(({ icon, text, url, location, params, onClick }) => {
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
        <Link to={{ pathname: url, state: params }} className={className}>
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
            <nav>
                <Item url="/" icon="menu_book" text="Browse" />
                <Item url="/books" icon="book" text="Book management" />
                {!loggedUser && (
                    <Item url="/sign-up" icon="account_circle" text="Sign Up" />
                )}
                {loggedUser && (
                    <Item
                        url="/profile"
                        icon="account_circle"
                        text="Profile"
                        params={{ email: loggedUser.email }}
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
                        onClick={() => dispatch(clearSession())}
                    />
                )}
            </nav>
            <SignIn visible={signInVisible} setVisible={setSignInVisible} />
        </>
    );
}
