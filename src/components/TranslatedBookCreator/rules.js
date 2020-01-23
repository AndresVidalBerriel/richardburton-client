import { globalRules } from "utils/validators/rules";

export const inputRules = {
    title: [globalRules.required],
    year: [globalRules.required],
    country: [globalRules.required]
};
