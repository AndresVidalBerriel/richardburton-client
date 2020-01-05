import {
    checkNotEmpty,
    checkEmailFormat,
    checkPasswordFormat,
    checkMatchingPasswords,
    checkFullNameFormat
} from "utils/validators";

const globalRules = {
    required: {
        checker: checkNotEmpty,
        onFailure: {
            status: "error",
            feedback: "This field is required."
        }
    }
};

export const inputRules = {
    email: [
        globalRules.required,

        {
            checker: checkEmailFormat,
            onSuccess: { status: "success" },
            onFailure: {
                status: "error",
                feedback: "The provided email's format is incorrect."
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
                feedback: "The provided password's format is incorrect."
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
                feedback: "Please provide first and last names."
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
                feedback: "The provided passwords do not match."
            }
        }
    ]
};
