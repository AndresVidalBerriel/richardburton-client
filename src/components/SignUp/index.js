import React from "react";
import { useSelector } from "react-redux";

import SignUpForm from "components/SignUp/SignUpForm";

import "./style.less";
import LoadingView from "components/LoadingView";

export default function SignUp() {
    const { loading } = useSelector(state => state.session);

    return loading ? (
        <LoadingView />
    ) : (
        <div className="sign-up">
            <header>
                <h2>
                    Sign up to the <strong>Richard Burton Platform!</strong>
                </h2>
            </header>
            <SignUpForm />
        </div>
    );
}
