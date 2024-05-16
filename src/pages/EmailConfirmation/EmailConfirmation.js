import styles from './EmailConfirmation.module.scss';
import {useNavigate, useSearchParams} from "react-router-dom";
import Button from "../../components/ui/Button/Button";
import {useEffect, useState} from "react";

let timer = null;
function EmailConfirmation() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const mail = searchParams.get("mail")

    const [time, setTime] = useState(60)

    useEffect(() => {
        timer && clearInterval(timer);
        return () => timer && clearInterval(timer);
    }, []);

    useEffect(()=> {
        if ( time === 60 ) timer = setInterval(()=> setTime(time => --time), 1000)
        else if ( time === 0 ) clearInterval(timer)
    }, [time])

    const updateTimer = function () {
        setTime(60)
    }

    const formatTime =  time => {
        return `${Math.floor(time / 60)}:${ Math.floor(time % 60).toString().padStart(2, '0') }`
    }

    return (
        <div className={styles.EmailConfirmation}>
            <div>
                <h1>Письмо отправлено на почту</h1>

                <div className={styles.EmailConfirmationText}>
                    <div>
                       <span>
                            Письмо с подтверждением создания аккаунта отправлено на почту
                        </span>
                        <a href={`mailto:${mail}`} target="_blank">{mail}</a>
                    </div>
                    <div>
                        <span>
                            Если письмо не пришло проверьте вкладку Спам
                        </span>
                    </div>
                    <div>
                        { time
                            ? <span><span>Отправить письмо повторно через </span><span> {formatTime(time)} </span><span>секунд</span></span>
                            : <span className={styles.EmailConfirmationSend} onClick={updateTimer}>Отправить письмо повторно</span>
                        }

                    </div>
                </div>
            </div>

            <div>
                <Button color="blue" filled onClick={() => navigate('/login')}>
                    Войти
                </Button>
            </div>
        </div>
    );
}

export default EmailConfirmation;
