import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";

import { retrieveUser } from "store/users/actions";

import "./style.less";

import LoadingView from "components/LoadingView";

import * as routes from "routes";

export default withRouter(function UserProfile({ history, match }) {
    const dispatch = useDispatch();
    const loggedUser = useSelector(state => state.session.user);

    const { loading, error, user } = useSelector(
        state => state.users.retrieval
    );

    useEffect(() => {
        let { id } = match.params;
        if (!id) {
            if (loggedUser) id = loggedUser.id;
            else history.push(routes.HOME);
        }

        dispatch(retrieveUser(id));
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
