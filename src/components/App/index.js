import React, { Suspense } from "react";
import { Switch, Route } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { history } from "store";

import Header from "components/App/Header";
import SideBar from "components/App/Sidebar";
import SignUp from "components/SignUp";
import UserProfile from "components/UserProfile";
import * as routes from "routes";

import "./style.less";
import { useSelector } from "react-redux";
import LoadingView from "components/LoadingView";
import BookBrowser from "components/BookBrowser";
import AdvancedSearch from "components/AdvancedSearch/index";
import BookManagement from "components/BookManagement/index";

export default function App() {
    const storeReady = useSelector(state => state.root.storeReady);

    return storeReady ? (
        <Suspense fallback={<LoadingView />}>
            <Header />
            <section>
                <ConnectedRouter history={history}>
                    <SideBar />
                    <main>
                        <Switch>
                            <Route exact path={routes.HOME}>
                                <BookBrowser searchOnDefaultFields />
                            </Route>
                            <Route path={routes.ADVANCED_SEARCH}>
                                <AdvancedSearch />
                            </Route>
                            <Route path={routes.SIGN_UP}>
                                <SignUp />
                            </Route>
                            <Route path={routes.USER_PROFILE}>
                                <UserProfile />
                            </Route>
                            <Route path={routes.BOOK_PROFILE}></Route>
                            <Route path={routes.BOOK_MANAGEMENT}>
                                <BookManagement />
                            </Route>
                        </Switch>
                    </main>
                </ConnectedRouter>
            </section>
        </Suspense>
    ) : (
        <LoadingView />
    );
}
