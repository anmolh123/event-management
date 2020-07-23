import React, { useState, useCallback, useContext } from 'react';
import Card from '../UI/Card/Card';
import './userLogin.css';
import { UserLoginContext } from '../../context/UserLoginContext';

const UserLogin = React.memo(props => {    

    const [ userName, setUserName ] = useState('');
    const [ password, setPassword ] = useState('');
    const { userId, setUserId } = useContext(UserLoginContext);

    const userNameHandler = useCallback(event => {
        setUserName(event.target.value);
    }, []);

    const passwordHandler = useCallback(event => {
        setPassword(event.target.value);
    }, []);

    const loginHandler = useCallback(event =>{
        event.preventDefault();
        console.log(userId);
        if(userName === 'dummy' && password === 'dummy'){
            console.log('login');
            setUserId('123456');
        }else{
            alert('Login Failed');
            setUserName('');
            setPassword('');
        }

    },[userName, password, userId, setUserId]);

    return (
        <section className="login-form">
        <Card>
            <form>
            <div className="form-control">
                <label htmlFor="userName">User Name</label>
                <input
                    type="text"
                    id="userName"
                    value={userName}
                    onChange={userNameHandler} 
                />
            </div>
            <div className="form-control">
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
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
