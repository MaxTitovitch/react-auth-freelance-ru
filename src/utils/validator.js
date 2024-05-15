

// Валидатор - валидирует поле field по массиву правил rules
// Вернет либо текст ошибки, либо null
export const validator = (field, rules) => {
    let errors = [];

    rules.forEach(rule => {
        const error = rule(field);

        if (error) {
            errors.push(error);
        }
    })

    return errors.length ? errors[0] : null;
}

// Правило обязательности заполнения поля
export const required = () => {
    return field => {
        return !field ? 'Поле не может быть пустым' : null
    }
}

// Правило максимальной длинны 60 символов
export const maxSize = () => {
    return field => {
        return field?.toString()?.length > 60 ? 'Поле не должно быть длиннее 60 символов' : null
    }
}

// Правило валидации пароля по регуляркам
export const passwordType = () => {
    const regexNumbers = /(?=.*[0-9])/g
    const regexSmallLetters = /(?=.*[a-z])/g
    const regexBigLetters = /(?=.*[A-Z])/g
    const regexOthers =/[a-z0-9A-Z!@#$%^&*]$/


    return field => {
        const password = field?.toString() || ''

        if (!regexOthers.test(password)) {
            return 'Пароль может содержать цифры, латинские буквы и символы !@#$%^&*';
        }

        if (password.length < 8) {
            return 'Пароль должен быть длинной от 8-ми символов';
        }

        if (!regexNumbers.test(password)) {
            return 'Пароль должен содержать хотя бы одну цифру';
        }

        if (!regexSmallLetters.test(password)) {
            return 'Пароль должен содержать хотя бы одну прописную латинскую букву';
        }

        if (!regexBigLetters.test(password)) {
            return 'Пароль должен содержать хотя бы одну строчную латинскую букву';
        }

        return null;
    }
}

// Правило валидации email по регулярке
export const emailType = () => {
    const regex = /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i

    return field => {
        const email = field?.toString() || ''

        if (!regex.test(email)) {
            return 'Поле должно соответствовать формату email';
        }

        return null;
    }
}

// Правило валидации подтверждения пароля ("Введите ещё раз")
export const confirmationType = (compare) => {
    return field => {
        return field !== compare ? 'Пароли должны совпадать' : null
    }
}