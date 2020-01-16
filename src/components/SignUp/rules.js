import { globalRules } from "utils/validators/rules";

import {
    checkEmailFormat,
    checkPasswordFormat,
    checkMatchingPasswords,
    checkFullNameFormat
} from "utils/validators";

export const inputRules = {
    email: [
        globalRules.required,

        {
            checker: checkEmailFormat,
            onSuccess: { status: "success" },
            onFailure: {
                status: "error",
                feedback: "error:emailFormat"
            }
        }
    ],

    password: [
        globalRules.required,
        {
            checker: checkPasswordFormat,
            onSuccess: { status: "success" },
            onFailure: {
                status: "error",
                feedback: "error:passwordFormat"
            }
        }
    ],
    repeatPassword: [globalRules.required],
    name: [
        globalRules.required,
        {
            checker: checkFullNameFormat,
            onFailure: {
                status: "error",
                feedback: "error:fullNameFormat"
            }
        }
    ]
};

export const crossInputRules = {
    repeatPassword: [
        {
            checker: checkMatchingPasswords,
            useValuesFrom: ["password"],
            onSuccess: { status: "success" },
            onFailure: {
                status: "error",
                feedback: "error:matchingPasswords"
            }
        }
    ]
};
