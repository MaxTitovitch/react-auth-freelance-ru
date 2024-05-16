import styles from './ChangePasswordRequest.module.scss';
import {Link, useNavigate} from "react-router-dom";
import {useMemo, useState} from "react";
import {emailType, maxSize, required, validator} from "../../utils/validator";
import Input from "../../components/ui/Input/Input";
import Button from "../../components/ui/Button/Button";

function ChangePasswordRequest() {
    const navigate = useNavigate();

    // Действие запроса на сброс пароля (в т.ч. возможные ошибки сервера)
    const doAction = function () {
        if (!disabled) {
            // В 50% случаев выкинет имитацию ошибки сервера
            // Только для тестирования
            if (Math.random() < 0.5) {
                setServerErrors({
                    email: 'Email не найден (рандом - вероятность 50%)',
                })
            } else {
                navigate('/email-confirmation?mail=' + model.email)
            }
        }
    }
    const changeEmail = function (email) {
        setModel({...model, email})
        setServerErrors({email: '', password: ''})
    }


    const [model, setModel] = useState({email: null})
    const [serverErrors, setServerErrors] = useState({email: ''})

    // Сгенерированные ошибки полей
    const errors = useMemo(() => {
        const emailError = model.email !== null
            ? validator(model.email, [required(), maxSize(), emailType()]) || serverErrors.email
            : null;

        return {email: emailError}

    }, [model.email, serverErrors.email]);


    // Отключенность кнопки (из-за ошибок)
    const disabled = useMemo(() => {
        return !!errors.email || !model.email
    }, [model, errors]);


    return (
        <div className={styles.ChangePasswordRequest}>
            <div>
                <h1>Запрос на смену пароля</h1>
                <Input
                    value={model.email}
                    required
                    placeholder="Введите Email"
                    label="Email"
                    padding
                    type="email"
                    error={errors.email}
                    onChange={event => changeEmail(event.target.value)}
                />
            </div>

            <div>
                <Button
                    color="blue"
                    filled
                    disabled={disabled}
                    onClick={doAction}
                >
                    Отправить
                </Button>
            </div>
        </div>
    );
}

export default ChangePasswordRequest;
