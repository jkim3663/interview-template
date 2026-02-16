import type { ButtonHTMLAttributes } from 'react';
import styles from './Button.module.css';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

function Button({ children, ...rest}: ButtonProps) {
    return (
        <button className={styles.baseButton} {...rest}>
            { children }
        </button>
    );
}

export default Button;