import { checkNotEmpty } from "utils/validators";

export const globalRules = {
    required: {
        checker: checkNotEmpty,
        onFailure: {
            status: "error",
            feedback: "error:requiredField"
        }
    }
};
