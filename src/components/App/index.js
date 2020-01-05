import React from "react";
import SignUp from "components/SignUp";

import "./style.less";
import SideBar from "components/Sidebar";

export default () => (
    <>
        <header>
            <h1>Richard Burton</h1>
        </header>
        <section>
            <SideBar />
            <main>
                <SignUp></SignUp>
            </main>
        </section>
    </>
);
