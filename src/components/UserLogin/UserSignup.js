import React, { useState, useCallback, useRef, useEffect } from 'react';
import Card from '../UI/Card/Card';
import './userLogin.css';
import { useToasts } from 'react-toast-notifications';
import { useHistory } from 'react-router';

const UserSignUp = React.memo(props => {    

    const [ userName, setUserName ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ name, setName ] = useState('');
    const { addToast, removeAllToasts } = useToasts();
    const history = useHistory();
    const users =useRef({});

    useEffect(()=>{
        const usersJson = JSON.parse(localStorage.getItem('users'));
        users.current = usersJson;
    },[]);

    const userNameHandler = useCallback(event => {
        setUserName(event.target.value);
    }, []);

    const passwordHandler = useCallback(event => {
        setPassword(event.target.value);
    }, []);

    const nameHandler = useCallback( event =>{
        setName(event.target.value);
    }, []);

    const signUpHandler = useCallback(event =>{
        event.preventDefault();
        removeAllToasts();
        if(name === '' || userName === '' || password === ''){
            addToast(' Enter Valid Inputs ',{
                appearance: 'error',
                autoDismiss: true,
                autoDismissTimeout: 1000,
              })
        }
        else if(users.current[userName]){
            addToast(' User name Exists ',{
                appearance: 'error',
                autoDismiss: true,
                autoDismissTimeout: 1000,
              })
        }else{
            const userId = Math.floor(Math.random() * Math.floor(Math.random() * Date.now()));
            const userDetailObj = { password, name, userId };
            localStorage.setItem('users',JSON.stringify({...users.current, [userName]: userDetailObj }));
            history.replace('/');
        }

    },[userName, password, name, history, addToast,removeAllToasts]);

    return (
        <section className="login-form">
        <Card>
            <form>
            <div className="form-control">
                <label htmlFor="name">Name</label>
                <input
                    type="text"
                    id="name"
                    autoComplete="off"
                    value={name}
                    onChange={nameHandler} 
                />
            </div>
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
                    onClick={signUpHandler}
                >
                    Sign-Up
                </button>
                
            </div>
            </form>
        </Card>
        </section>
    );
});

export default UserSignUp;
