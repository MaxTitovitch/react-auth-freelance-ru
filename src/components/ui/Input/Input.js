import styles from './Input.module.scss';

// Управляемый инпут
const Input = ({ value, placeholder, label, required,  onChange, padding, error, type = 'text' }) => {
    let classNameLabel = `${styles.InputLabel} ${required ? styles.required : ''}`;
    let classNameField = `${styles.InputField} ${error ? styles.error : ''}`;
    let className = `${styles.Input} ${padding ? styles.padding : ''}`;

    return (
        <div className={className}>
            <div className={classNameLabel}>{ label }</div>
            <input
                value={value || ''}
                className={classNameField}
                type={type}
                placeholder={placeholder}
                onChange={onChange}
            />
            { error ? (
                <div className={styles.InputHint}>{error}</div>
            ) : '' }
        </div>
    );
};

export default Input;