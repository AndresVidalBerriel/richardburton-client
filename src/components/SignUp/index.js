import React from "react";
import { useSelector } from "react-redux";

import SignUpForm from "components/SignUp/SignUpForm";

import "./style.less";
import LoadingView from "components/LoadingView";
import { Trans } from "react-i18next";

export default function SignUp() {
    const { loading } = useSelector(state => state.session);

    return loading ? (
        <LoadingView />
    ) : (
        <div className="sign-up">
            <header>
                <h2>
                    <Trans i18nKey="signUp:title">
                        Sign Up title <strong>Richard Burton Platform</strong>
                    </Trans>
                </h2>
            </header>
            <SignUpForm />
        </div>
    );
}
