import styles from './AuthLayout.module.scss';
import Router from "../Routes";
import Button from "../../components/ui/Button/Button";
import {useNavigate} from "react-router-dom";

// Шаблон системы авторизации (включает хедер, футер и рамку формы)
function AuthLayout() {
    const navigate = useNavigate();

    return (
        <div className={styles.App}>
            <header className={styles.AppHeader}>
                <div className={styles.AppHeaderWrap}>
                    <Button
                        color="green"
                        small
                        roboto
                        onClick={() => navigate("/register")}
                    >
                        Регистрация
                    </Button>
                    <Button
                        color="blue"
                        small
                        roboto
                        onClick={() => navigate("/login")}
                    >
                        Вход
                    </Button>
                </div>
            </header>

            <main className={styles.AppMain}>
                <Router />
            </main>

            <footer className={styles.AppFooter}/>
        </div>
    );
}

export default AuthLayout;
