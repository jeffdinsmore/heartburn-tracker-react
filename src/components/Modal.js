import React from 'react';

const Modal = props => {
  if(!props.show) {
    return null;
  }
  
  return (
    <div className="modal">
      <div className="modal-conent">
        <div className="modal-header">
          <h4 className="modal-title">Modal title</h4>
        </div>
        <div className="modal-body">
          This is modal content
        </div>
        <div className="modal-footer">
          <button className="button">close</button>
        </div>
      </div>
    </div>
  )

}

export default Modal;