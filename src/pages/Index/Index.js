import styles from './Index.module.scss';
import { Link } from 'react-router-dom';

function Index() {
  return (
    <div className={styles.Index}>
        <Link to="/login">Вход</Link>
        <Link to="/register">Регистрация</Link>
        <Link to="/email-confirmation?mail=pochta@gmail.com">Подтверждение email</Link>
        <Link to="/email-confurmed?mail=pochta@gmail.com">Email подтвержден</Link>
        <Link to="/change-password">Смена пароля</Link>
        <Link to="/change-password-request">Запрос смены пароля</Link>
    </div>
  );
}

export default Index;
