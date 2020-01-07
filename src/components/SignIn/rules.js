import { globalRules } from "utils/validators/rules";
import { checkEmailFormat } from "utils/validators";

export const inputRules = {
    email: [
        globalRules.required,
        {
            checker: checkEmailFormat,
            onFailure: {
                status: "error",
                feedback: "The provided email's format is incorrect."
            }
        }
    ],
    password: [globalRules.required]
};
