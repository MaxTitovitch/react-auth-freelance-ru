import styles from './Register.module.scss';
import {Link, useNavigate} from "react-router-dom";
import {useMemo, useState} from "react";
import {confirmationType, emailType, maxSize, passwordType, required, validator} from "../../utils/validator";
import Input from "../../components/ui/Input/Input";
import Button from "../../components/ui/Button/Button";

function Register() {
    const navigate = useNavigate();

    // Действие регистрации (в т.ч. возможные ошибки сервера)
    const doAction = function () {
        if (!disabled) {
            // В 50% случаев выкинет имитацию ошибки сервера
            // Только для тестирования
            if (Math.random() < 0.5) {
                setServerErrors({
                    name: 'Название почему-то не подходит (рандом - вероятность 50%)',
                    email: 'Email уже занят (рандом - вероятность 50%)',
                    password: 'Пароль мне просто не понравился (рандом - вероятность 50%)',
                    confirmation: 'Пароль не совпадал (рандом - вероятность 50%)',
                })
            } else {
                navigate('/email-confirmation?mail=' + model.email)
            }
        }
    }
    
    const changeName = function (name) {
        setModel({...model, name})
        setServerErrors({name: '', email: '', password: '', confirmation: ''})
    }
    
    const changeEmail = function (email) {
        setModel({...model, email})
        setServerErrors({name: '', email: '', password: '', confirmation: ''})
    }

    const changePassword = function (password) {
        setModel({...model, password})
        setServerErrors({name: '', email: '', password: '', confirmation: ''})
    }

    const changeConfirmation = function (confirmation) {
        setModel({...model, confirmation})
        setServerErrors({name: '', email: '', password: '', confirmation: ''})
    }


    const [model, setModel] = useState({
        name: null, 
        email: null, 
        password: null,
        confirmation: null,
    })
    const [serverErrors, setServerErrors] = useState({
        name: '',
        email: '',
        password: '',
        confirmation: '',
    })

    // Сгенерированные ошибки полей
    const errors = useMemo(() => {
        const nameError = model.name !== null
            ? validator(model.name, [maxSize()]) || serverErrors.name
            : null;
        
        const emailError = model.email !== null
            ? validator(model.email, [required(), maxSize(), emailType()]) || serverErrors.email
            : null;

        const passwordError = model.password !== null
            ? validator(model.password, [required(), maxSize(), passwordType()]) || serverErrors.password
            : null;

        const confirmationError = model.confirmation !== null
            ? validator(model.confirmation, [required(), maxSize(), confirmationType(model.password)]) || serverErrors.confirmation
            : null;

        return {name: nameError, email: emailError, password: passwordError, confirmation: confirmationError}

    }, [
        model.name, model.email, model.password, model.confirmation,
        serverErrors.name, serverErrors.email, serverErrors.password, serverErrors.confirmation,
    ]);


    // Отключенность кнопки (из-за ошибок)
    const disabled = useMemo(() => {
        return !!errors.name || !!errors.email || !!errors.password  || !!errors.confirmation
            || !model.email || !model.password || !model.confirmation
    }, [model, errors]);


    return (
        <div className={styles.Register}>
            <div>
                <h1>Регистрация</h1>
                <Input
                    value={model.name}
                    placeholder="Введите название учебного заведения (не обязательно)"
                    label="Название"
                    error={errors.name}
                    onChange={event => changeName(event.target.value)}
                />
                <Input
                    value={model.email}
                    required
                    placeholder="Введите эл.почту"
                    label="Email"
                    type="email"
                    error={errors.email}
                    onChange={event => changeEmail(event.target.value)}
                />
                <Input
                    value={model.password}
                    required
                    placeholder="Введите пароль"
                    label="Пароль"
                    type="password"
                    error={errors.password}
                    onChange={event => changePassword(event.target.value)}
                />
                <Input
                    value={model.confirmation}
                    required
                    placeholder="Введите пароль ещё раз"
                    label="Подтверждение пароля"
                    type="password"
                    error={errors.confirmation}
                    onChange={event => changeConfirmation(event.target.value)}
                />
                <div className={styles.RegisterLinks}>
                    <span>Есть аккаунт?</span>
                    <Link to="/login">Войти</Link>
                </div>
            </div>

            <div>
                <Button
                    color="blue"
                    filled
                    disabled={disabled}
                    onClick={doAction}
                >
                    Продолжить
                </Button>
            </div>
        </div>
    );
}

export default Register;
