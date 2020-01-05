import React from "react";

import SignUpForm from "components/SignUp/Form";

import "antd/dist/antd.less";
import "./style.less";

export default function SignUp() {
    return (
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
