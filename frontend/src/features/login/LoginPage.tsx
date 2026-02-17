import { useNavigate, type NavigateFunction } from 'react-router-dom';
import Button from '../../components/button/Button';
import styles from './LoginPage.module.css';
import { useState } from 'react';


function LoginPage() {
    const navigate: NavigateFunction = useNavigate();
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [validLogin, setValidLogin] = useState(true);

    function handleUsernameChange(event: React.ChangeEvent<HTMLInputElement>) {
        setUserName(event.target.value);
    }

    function handlePasswordChange(event: React.ChangeEvent<HTMLInputElement>) {
        setPassword(event.target.value);
    }

    function handleLoginClick() {
        if (userName.length > 0 && password.length > 0) {
            navigate('/home');
        } else {
            setValidLogin(false);
        }
    }

    return (
        <div className={styles.loginPage}>
            <div>
                User Name
            </div>
            <input  className={styles.loginInput} 
                    placeholder='Enter username: '
                    value={userName}
                    onChange={handleUsernameChange}/>
            <div>
                Password
            </div>
            <input  className={styles.loginInput} 
                    placeholder='Enter password: '
                    value={password}
                    onChange={handlePasswordChange}/>
            <Button onClick={handleLoginClick}>
                Login
            </Button>
            {
                !validLogin && 
                <div>
                    Username and Password cannot be empty
                </div>
            }
        </div>
    )
}

export default LoginPage;