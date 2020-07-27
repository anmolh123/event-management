import React, { useState, useCallback, useContext } from 'react';
import Card from '../UI/Card/Card';
import './userLogin.css';
import { UserLoginContext } from '../../context/UserLoginContext';
import { useToasts } from 'react-toast-notifications';

const UserLogin = React.memo(props => {    

    const [ userName, setUserName ] = useState('');
    const [ password, setPassword ] = useState('');
    const { setUserId } = useContext(UserLoginContext);
    const { addToast, removeAllToasts } = useToasts();

    const userNameHandler = useCallback(event => {
        setUserName(event.target.value);
    }, []);

    const passwordHandler = useCallback(event => {
        setPassword(event.target.value);
    }, []);

    const loginHandler = useCallback(event =>{
        event.preventDefault();
        removeAllToasts();
        if(userName === 'dummy' && password === 'dummy'){
            setUserId(123456);
        }else{
            addToast('Login Failed',{
                appearance: 'error',
                autoDismiss: true,
                autoDismissTimeout: 1000,
              })
            setUserName('');
            setPassword('');
        }

    },[userName, password, setUserId, addToast,removeAllToasts]);

    return (
        <section className="login-form">
        <Card>
            <form>
            <div className="form-control">
                <label htmlFor="userName">User Name</label>
                <input
                    type="text"
                    id="userName"
                    autoComplete="off"
                    value={userName}
                    onChange={userNameHandler} 
                />
            </div>
            <div className="form-control">
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    autoComplete="off"
                    value={password}
                    onChange={passwordHandler}
                />
            </div>
            <div>
                <button 
                    className="button"
                    type="button" 
                    onClick={loginHandler}
                >
                    Login
                </button>
            </div>
            </form>
        </Card>
        </section>
    );
});

export default UserLogin;
