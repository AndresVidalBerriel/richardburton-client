import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { withRouter, Redirect } from "react-router-dom";

import { retrieveUser } from "store/users/actions";

import "./style.less";

import LoadingView from "components/LoadingView";

export default withRouter(function UserProfile({ history, location, match }) {
    const dispatch = useDispatch();
    const loggedUser = useSelector(state => state.session.user);
    const selectedUser = useSelector(state => state.users.retrieval.user);

    useEffect(() => {
        if (!selectedUser) {
            let { id } = match.params;
            if (!id && loggedUser) id = loggedUser.id;
            if (id) dispatch(retrieveUser(id));
        }
    }, [selectedUser, loggedUser, dispatch]);

    return selectedUser ? (
        <div className="user-profile">
            <header>
                <h2>
                    Profile of <strong>{selectedUser.firstName}</strong>
                </h2>
            </header>
        </div>
    ) : (
        <LoadingView />
    );
});
