import { useState } from "react";

export default function useInput(initialValue) {
    const [value, setValue] = useState(initialValue);
    const [validator, setValidator] = useState({});

    const validate = rule => {
        const { checker, onSuccess, onFailure, useValues } = rule;
        const args = useValues ? [value, ...useValues] : [value];

        const isValid = Array.isArray(checker)
            ? checker
                  .map(check => check(...args))
                  .reduce((acc, current) => acc && current)
            : checker(...args);

        setValidator(isValid ? onSuccess : onFailure);
        return isValid;
    };

    const reset = () => setValue(initialValue);

    return {
        value,
        setValue,
        validator,
        setValidator,
        validate,
        reset
    };
}
