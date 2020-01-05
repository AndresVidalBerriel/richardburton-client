export function checkNotEmpty(string) {
    return string.length !== 0;
}

export function checkEmailFormat(email) {
    return /^[\w-\+]+(\.[\w]+)*@[\w-]+(\.[\w]+)*(\.[a-z]{2,})$/.test(email);
}

export function checkPasswordFormat(password) {
    return password.length > 8;
}

export function checkMatchingPasswords(password, confirmation) {
    return password === confirmation;
}

export function checkFullNameFormat(name) {
    return /^[a-z\.]+ [a-z]+/i.test(name);
}
