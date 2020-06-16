import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { setSessionSuccess } from "store/session/actions";
import SessionController from "api/controllers/session";
import { OK, UNAUTHORIZED } from "utils/http-status";
import useFetch from "utils/hooks/useFetch";

export default function useSignIn() {
    const dispatch = useDispatch();

    const [message, setMessage] = useState();

    const { loading, error, response, fetch, reset } = useFetch(
        SessionController.signIn
    );

    useEffect(() => {
        if (response.status === OK) {
            const { data: user, headers } = response;
            dispatch(setSessionSuccess(user, headers["rb-authorization"]));
        }
    }, [response]);

    useEffect(() => {
        if (error !== undefined) {
            switch (error.response.status) {
                case UNAUTHORIZED: {
                    setMessage("error:incorrectEmailOrPassword");
                }
            }
        }
    }, [error]);

    return { loading, message, user: response.data, signIn: fetch, reset };
}
