import styles from './EmailConfirmed.module.scss';
import {useNavigate, useSearchParams} from "react-router-dom";
import Button from "../../components/ui/Button/Button";

// Компонент страницы Уведомления об отправленом письме
function EmailConfirmed() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const mail = searchParams.get("mail")

    return (
        <div className={styles.EmailConfirmed}>
            <div>
                <h1>Письмо отправлено на почту</h1>

                <div className={styles.EmailConfirmedText}>
                    <span>
                        Письмо с ссылкой на страницу для смены пароля отправлено на почту
                    </span>
                    <a href={`mailto:${mail}`} target="_blank">{mail}</a>
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

export default EmailConfirmed;
