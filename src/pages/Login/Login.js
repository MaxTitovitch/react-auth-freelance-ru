import styles from './Login.module.scss';
import Button from "../../components/ui/Button/Button";
import Input from "../../components/ui/Input/Input";
import {Link, useNavigate} from "react-router-dom";
import {useMemo, useState} from "react";
import {emailType, maxSize, passwordType, required, validator} from "../../utils/validator";

// Компонент страницы Входа
function Login() {
    const navigate = useNavigate();

    // Действие логина (в т.ч. возможные ошибки сервера)
    const doAction = function () {
        if (!disabled) {
            // В 50% случаев выкинет имитацию ошибки сервера
            // Только для тестирования
            if (Math.random() < 0.5) {
                setServerErrors({
                    email: 'Email уже занят (рандом - вероятность 50%)',
                    password: 'Пароль мне просто не понравился (рандом - вероятность 50%)',
                })
            } else {
                navigate('/email-confurmed?mail=' + model.email)
            }
        }
    }
    const changeEmail = function (email) {
        setModel({...model, email})
        setServerErrors({email: '', password: ''})
    }

    const changePassword = function (password) {
        setModel({...model, password})
        setServerErrors({email: '', password: ''})
    }


    const [model, setModel] = useState({email: null, password: null})
    const [serverErrors, setServerErrors] = useState({email: '', password: ''})

    // Сгенерированные ошибки полей
    const errors = useMemo(() => {
        const emailError = model.email !== null
            ? validator(model.email, [required(), maxSize(), emailType()]) || serverErrors.email
            : null;

        const passwordError = model.password !== null
            ? validator(model.password, [required(), maxSize(), passwordType()]) || serverErrors.password
            : null;

        return {email: emailError, password: passwordError}

    }, [model.email, model.password, serverErrors.email, serverErrors.password]);


    // Отключенность кнопки (из-за ошибок)
    const disabled = useMemo(() => {
        return !!errors.email || !!errors.password || !model.email || !model.password
    }, [model, errors]);


    return (
        <div className={styles.Login}>
            <div>
                <h1>Вход</h1>
                <Input
                    value={model.email}
                    required
                    placeholder="Введите эл.почту"
                    label="Email"
                    padding
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
                <div className={styles.LoginLinks}>
                    <Link to="/change-password-request">Забыли пароль?</Link>
                    <div className={styles.LoginLinksBlue}>
                        <span>Еще нет аккаунта?</span>
                        <Link to="/register">Создать аккаунт?</Link>
                    </div>
                </div>
            </div>

            <div>
                <Button
                    color="blue"
                    filled
                    disabled={disabled}
                    onClick={doAction}
                >
                    Войти
                </Button>
            </div>
        </div>
    );
}

export default Login;
