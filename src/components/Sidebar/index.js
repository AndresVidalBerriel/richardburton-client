import React from "react";

import "./style.less";

const Item = ({ icon, text }) => (
    <div className="nav-item">
        <span>
            <div className="icon">
                <i className="material-icons">{icon}</i>
            </div>
            <span>{text}</span>
        </span>
    </div>
);

export default function SideBar() {
    return (
        <nav>
            <Item icon="menu_book" text="Browse" />
            <Item icon="book" text="Book management" />
            <Item icon="account_circle" text="Sign Up" />

            <Item icon="lock_open" text="Sign In" />
        </nav>
    );
}
