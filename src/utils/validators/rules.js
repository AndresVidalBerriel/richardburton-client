import { checkNotEmpty, checkNotUndefined } from "utils/validators";

export const globalRules = {
    required: {
        checker: [checkNotUndefined, checkNotEmpty],
        onFailure: {
            status: "error",
            feedback: "error:requiredField"
        }
    }
};
