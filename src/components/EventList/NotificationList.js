import React, { useEffect, useState, useContext, useCallback } from 'react';
import { UserLoginContext } from '../../context/UserLoginContext';
import Modal from '../UI/Modal/Modal';

const Notifications = React.memo(props => {

    const [ queue, setQueue ] = useState([]);
    const [ show, setshow ] = useState(false);
    const { userId } = useContext(UserLoginContext);

    useEffect(()=>{
        const notify = JSON.parse(localStorage.getItem('notify'));
        
        const filerQueue = notify.queue.filter( item => { 
            if(item[userId] === true) {
                item[userId] = false;
                return true;
            }
            return false;
        }); 

        if(filerQueue.length > 0){
            setQueue(filerQueue);
            setshow(true);   
        }

        localStorage.setItem('notify',JSON.stringify(notify));

    },[userId])

    const closeModal = useCallback(()=>{
        setshow(false);
    },[]);

    return (
        <div>
            <Modal show={show} handleClose={closeModal}>
                <h2> opted Events which are deleted</h2>
                <ol style={{textAlign : 'left'}}>
                    { queue.map( item => (
                        <li key={item['message']['eventId']}>
                            {item['message']['title'] }
                            {" "}
                            <i>{item['message']['date'].split("-").reverse().join("-")}</i>
                        </li>
                    ))}
                </ol>
            </Modal>
        </div>
    );
});

export default Notifications;