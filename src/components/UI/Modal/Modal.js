import React from 'react';
import './modal.css'

const Modal = React.memo(props => {
    
    const showHideClassName = props.show ? "modal display-block" : "modal display-none";
  
    return (
      <div className={showHideClassName}>
        <section className="modal-main">
          {props.children}
          <button onClick={props.handleClose}>close</button>
        </section>
      </div>
    );
  });

  export default Modal;