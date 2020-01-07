export default function validateForm(inputs, inputRules, crossInputRules = []) {
    let isValid = true;

    Object.keys(inputs).forEach(name => {
        const input = inputs[name];

        if (crossInputRules.hasOwnProperty(name)) {
            crossInputRules[name].forEach(rule => {
                rule.useValues = rule.useValuesFrom.map(
                    name => inputs[name].value
                );
            });
        } else crossInputRules[name] = [];

        if (!inputRules.hasOwnProperty(name)) inputRules[name] = [];

        const rules = [...inputRules[name], ...crossInputRules[name]];

        let rule;
        for (rule of rules)
            if (!input.validate(rule)) {
                isValid = false;
                break;
            }
    });

    return isValid;
}
