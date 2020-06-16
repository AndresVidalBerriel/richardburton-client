import { useState, useEffect } from "react";
import useFetch from "hooks/useFetch";
import UserController from "api/controllers/user";
import { CREATED, CONFLICT } from "utils/http-status";
import useSignIn from "hooks/useSignIn";

export default function useSignUp() {
    const [user, setUser] = useState();

    const [message, setMessage] = useState();

    const { loading, error, response, fetch, reset } = useFetch(
        UserController.signUp
    );

    const { signIn } = useSignIn();

    useEffect(() => {
        if (response.status === CREATED)
            signIn(user.email, user.authenticationString);
    }, [response]);

    useEffect(() => {
        if (error && error.response.status == CONFLICT)
            setMessage("error:emailAlreadyRegistered");
    }, [error]);

    const signUp = user => {
        setUser(user);
        fetch(user);
    };

    return { loading, message, response, signUp, reset };
}
