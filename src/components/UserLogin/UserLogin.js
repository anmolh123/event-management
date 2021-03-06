import React, { useState, useCallback, useContext, useEffect, useRef } from 'react';
import Card from '../UI/Card/Card';
import './userLogin.css';
import { UserLoginContext } from '../../context/UserLoginContext';
import { useToasts } from 'react-toast-notifications';
import { useHistory } from 'react-router';

const UserLogin = React.memo(props => {    

    const [ userName, setUserName ] = useState('');
    const [ password, setPassword ] = useState('');
    const { setUserId } = useContext(UserLoginContext);
    const { addToast, removeAllToasts } = useToasts();
    const history = useHistory();
    const users = useRef({});

    useEffect(()=>{
        const id = parseInt(localStorage.getItem('userId'));
        users.current = JSON.parse(localStorage.getItem('users'));
        if(id)
            setUserId(id);
    },[setUserId]);

    const userNameHandler = useCallback(event => {
        setUserName(event.target.value);
    }, []);

    const passwordHandler = useCallback(event => {
        setPassword(event.target.value);
    }, []);

    const errorHandler = useCallback(()=>{
        addToast('Login Failed',{
            appearance: 'error',
            autoDismiss: true,
            autoDismissTimeout: 1000,
            })
        setUserName('');
        setPassword('');
    },[addToast])

    const loginHandler = useCallback(event =>{
        event.preventDefault();
        removeAllToasts();
        if( users.current[userName] ){
            if(users.current[userName].password === password){
                setUserId(users.current[userName].userId);
                localStorage.setItem('userId',users.current[userName].userId);
                history.replace('/');
            }else{
                errorHandler();
            }
        }else{
            errorHandler();
        }
    },[userName, password, history, errorHandler, setUserId, removeAllToasts]);

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
            <div >
                <button 
                    className="button"
                    type="button" 
                    onClick={loginHandler}
                >
                    Login
                </button>
                <button 
                    className="button"
                    type="button"
                    onClick={ ()=> history.replace('/signUp') }
                    style={{background:'#eee', borderColor: '#eee', color:'black', marginLeft: '20px'}}                     
                >
                    Sign-Up
                </button>
                
            </div>
            </form>
        </Card>
        </section>
    );
});

export default UserLogin;
