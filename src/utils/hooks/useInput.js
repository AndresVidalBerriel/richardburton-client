import { useState } from "react";

export default function useInput(initialState) {
    const [value, setValue] = useState(initialState);
    const [validator, setValidator] = useState({});

    const validate = rule => {
        const { checker, onSuccess, onFailure, useValues } = rule;
        const args = useValues ? [value, ...useValues] : [value];

        const isValid = checker(...args);
        setValidator(isValid ? onSuccess : onFailure);
        return isValid;
    };
    return {
        value,
        setValue,
        validator,
        setValidator,
        validate
    };
}
