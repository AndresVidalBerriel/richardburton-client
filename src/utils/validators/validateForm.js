export default function validateForm(inputs, inputRules, crossInputRules = []) {
    let isValid = true;

    inputs.forEach(({ name, state: { value, validate } }) => {
        if (crossInputRules.hasOwnProperty(name)) {
            crossInputRules[name].forEach(rule => {
                rule.useValues = rule.useValuesFrom.map(() => value);
            });
        } else crossInputRules[name] = [];

        if (!inputRules.hasOwnProperty(name)) inputRules[name] = [];

        const rules = [...inputRules[name], ...crossInputRules[name]];

        let rule;
        for (rule of rules)
            if (!validate(rule)) {
                isValid = false;
                break;
            }
    });

    return isValid;
}
