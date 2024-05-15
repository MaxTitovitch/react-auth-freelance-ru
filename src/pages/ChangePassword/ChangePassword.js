import styles from './ChangePassword.module.scss';
import {Link, useNavigate} from "react-router-dom";
import {useMemo, useState} from "react";
import {confirmationType, maxSize, passwordType, required, validator} from "../../utils/validator";
import Input from "../../components/ui/Input/Input";
import Button from "../../components/ui/Button/Button";

function ChangePassword() {
    const navigate = useNavigate();

    // Действие сброса пароля (в т.ч. возможные ошибки сервера)
    const doAction = function () {
        if (!disabled) {
            // В 50% случаев выкинет имитацию ошибки сервера
            // Только для тестирования
            if (Math.random() < 0.5) {
                setServerErrors({
                    password: 'Пароль мне просто не понравился (рандом - вероятность 50%)',
                    confirmation: 'Пароль не совпадал (рандом - вероятность 50%)',
                })
            } else {
                navigate('/login')
            }
        }
    }

    const changePassword = function (password) {
        setModel({...model, password})
        setServerErrors({password: '', confirmation: ''})
    }

    const changeConfirmation = function (confirmation) {
        setModel({...model, confirmation})
        setServerErrors({password: '', confirmation: ''})
    }


    const [model, setModel] = useState({
        password: null,
        confirmation: null,
    })
    const [serverErrors, setServerErrors] = useState({
        password: '',
        confirmation: '',
    })

    // Сгенерированные ошибки полей
    const errors = useMemo(() => {
        const passwordError = model.password !== null
            ? validator(model.password, [required(), maxSize(), passwordType()]) || serverErrors.password
            : null;

        const confirmationError = model.confirmation !== null
            ? validator(model.confirmation, [required(), maxSize(), confirmationType(model.password)]) || serverErrors.confirmation
            : null;

        return {password: passwordError, confirmation: confirmationError}

    }, [model.password, model.confirmation, serverErrors.password, serverErrors.confirmation,]);


    // Отключенность кнопки (из-за ошибок)
    const disabled = useMemo(() => {
        return !!errors.password  || !!errors.confirmation || !model.password || !model.confirmation
    }, [model, errors]);


    return (
        <div className={styles.ChangePassword}>
            <div>
                <h1>Смена пароля</h1>
                <Input
                    value={model.password}
                    required
                    placeholder="Введите пароль"
                    label="Новый пароль"
                    type="password"
                    error={errors.password}
                    onChange={event => changePassword(event.target.value)}
                />
                <Input
                    value={model.confirmation}
                    required
                    placeholder="Повторите пароль"
                    label="Повторите новый пароль"
                    type="password"
                    error={errors.confirmation}
                    onChange={event => changeConfirmation(event.target.value)}
                />
            </div>

            <div>
                <Button
                    color="blue"
                    filled
                    disabled={disabled}
                    onClick={doAction}
                >
                    Сменить пароль
                </Button>
            </div>
        </div>
    );
}

export default ChangePassword;
