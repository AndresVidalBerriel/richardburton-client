export function checkNotUndefined(value) {
    return value !== undefined;
}

export function checkNotEmpty(string) {
    return string !== undefined ? String(string).trim().length !== 0 : true;
}

export function checkEmailFormat(email) {
    return /^[\w-\+]+(\.[\w]+)*@[\w-]+(\.[\w]+)*(\.[a-z]{2,})$/.test(
        email.trim()
    );
}

export function checkPasswordFormat(password) {
    return password.trim().length >= 8;
}

export function checkMatchingPasswords(confirmation, password) {
    return password.trim() === confirmation.trim();
}

export function checkFullNameFormat(name) {
    return name.trim().indexOf(" ") !== -1;
}
