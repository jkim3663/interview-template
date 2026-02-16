import { useNavigate, type NavigateFunction } from 'react-router-dom';
import Button from '../../components/button/Button';
import styles from './LoginPage.module.css';


function LoginPage() {
    const navigate: NavigateFunction = useNavigate();

    return (
        <div className={styles.loginPage}>
            <div>
                User Name
            </div>
            <input className={styles.loginInput} placeholder='Enter username: '/>
            <div>
                Password
            </div>
            <input className={styles.loginInput} placeholder='Enter password: '/>
            <Button onClick={() => navigate('/home')}>
                Login
            </Button>
        </div>
    )
}

export default LoginPage;