import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";

import { retrieveUser } from "store/users/actions";

import "./style.less";

import LoadingView from "components/LoadingView";

import * as routes from "routes";
import useFetch from "hooks/useFetch";
import UserController from "api/controllers/user";

export default withRouter(function UserProfile({ history, match }) {
    const loggedUser = useSelector(state => state.session.user);

    const {
        loading,
        error,
        response: { data: user },
        fetch
    } = useFetch(UserController.retrieveUser);

    useEffect(() => {
        let { id } = match.params;

        if (!id && loggedUser) id = loggedUser.id;

        if (id) fetch(id);
        else history.push(routes.HOME);
    }, [loggedUser]);

    return !user && loading ? (
        <LoadingView />
    ) : error ? (
        <div>Error :(</div>
    ) : user ? (
        <div className="user-profile">
            <header>
                <h2>
                    <strong>{`${user.firstName} ${user.lastName}`}</strong>
                </h2>
            </header>
        </div>
    ) : null;
});
