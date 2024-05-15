import styles from './Button.module.scss';

// Управляемая кнопка
const Button = ({ children, color, small, roboto, disabled, filled, onClick }) => {
    let className = `${styles.Button} `;

    className += (color === 'green' ? styles.green : styles.blue) + ' ';

    if (small) {
        className += styles.small + " "
    }

    if (roboto) {
        className += styles.roboto + " "
    }

    if (disabled) {
        className += styles.disabled + " "
    }

    if (filled) {
        className += styles.filled + " "
    }

    return (
        <button
            className={className}
            onClick={onClick}
        >
            {children}
        </button>
    );
};

export default Button;