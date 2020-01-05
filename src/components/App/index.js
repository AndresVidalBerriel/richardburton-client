import React from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";

import SideBar from "components/Sidebar";
import SignUp from "components/SignUp";
import SignIn from "components/SignIn";

import "./style.less";

export default () => (
    <>
        <header>
            <h1>Richard Burton</h1>
        </header>
        <section>
            <BrowserRouter>
                <SideBar />
                <main>
                    <Switch>
                        <Route exact path="/">
                            Browse!
                        </Route>
                        <Route path="/sign-up">
                            <SignUp />
                        </Route>
                    </Switch>
                </main>
            </BrowserRouter>
        </section>
    </>
);
