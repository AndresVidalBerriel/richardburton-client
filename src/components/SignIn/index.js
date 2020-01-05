import React from "react";
import { useDispatch } from "react-redux";

import "./styles.less";

import { signIn } from "store/session/actions";

export default function SignIn() {
    const dispatch = useDispatch();

    const handleSubmit = e => {
        e.preventDefault();

        const email = e.target.email.value;
        const password = e.target.password.value;

        dispatch(signIn(email, password));
    };

    return <></>;
}
