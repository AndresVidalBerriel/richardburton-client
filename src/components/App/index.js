import React from "react";
import { Switch, Route } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { history } from "store";

import Header from "components/Header";
import SideBar from "components/Sidebar";
import SignUp from "components/SignUp";
import UserProfile from "components/UserProfile";
import * as routes from "routes";

import "./style.less";
import { useSelector } from "react-redux";
import LoadingView from "components/LoadingView/index";

export default function App() {
    const storeReady = useSelector(state => state.root.storeReady);

    return storeReady ? (
        <>
            <Header />
            <section>
                <ConnectedRouter history={history}>
                    <SideBar />
                    <main>
                        <Switch>
                            <Route exact path={routes.HOME}>
                                Browse!
                            </Route>
                            <Route path={routes.SIGN_UP}>
                                <SignUp />
                            </Route>
                            <Route path={routes.USER_PROFILE}>
                                <UserProfile />
                            </Route>
                        </Switch>
                    </main>
                </ConnectedRouter>
            </section>
        </>
    ) : (
        <LoadingView />
    );
}
