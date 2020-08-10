import { useContext, useEffect } from 'react';
import { UserLoginContext } from '../../context/UserLoginContext';
import { useHistory } from 'react-router';


const Logout = () => {
    
    const { setUserId } = useContext(UserLoginContext);
    const history = useHistory();

    useEffect(()=>{

        localStorage.setItem('userId',0);
        setUserId(null);
        history.push('/');

    },[setUserId,history]);

    return null;
}

export default Logout;
