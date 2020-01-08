import React from "react";
import { Switch, Route } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { history } from "store";

import Header from "components/Header";
import SideBar from "components/Sidebar";
import SignUp from "components/SignUp";
import UserProfile from "components/UserProfile";

import "./style.less";

export default function App() {
    return (
        <>
            <Header />
            <section>
                <ConnectedRouter history={history}>
                    <SideBar />
                    <main>
                        <Switch>
                            <Route exact path="/">
                                Browse!
                            </Route>
                            <Route path="/sign-up">
                                <SignUp />
                            </Route>
                            <Route path="/profile/:id?">
                                <UserProfile />
                            </Route>
                        </Switch>
                    </main>
                </ConnectedRouter>
            </section>
        </>
    );
}
