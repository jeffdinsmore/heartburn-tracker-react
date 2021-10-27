import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from "prop-types";

function Modal(props) {
  const { foodItem, onClickingDelete, onClickingModal, showModal, onClickingCancel } = props;

  function removeAndClose(id) {
    onClickingDelete(id);
  }
  if (showModal) {
    return (
      ReactDOM.createPortal(
        <React.Fragment>
          <div className="modal">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title"><strong>Delete</strong><br></br>{foodItem.foodName}</h4>
              </div>
              <div className="modal-body">
                Are you sure you want to delete this item? It will be removed permanently.
            </div>
              <div className="modal-footer">
                <button onClick={() => removeAndClose(foodItem.id)} className="btn btn-danger btn-sm">Delete</button>&nbsp;&nbsp;
              <button onClick={() => onClickingCancel()} className="btn btn-secondary btn-sm">Cancel</button>
              </div>
            </div>
          </div>
        </React.Fragment>, document.body
      )
    )
  } else {
    return (null);
  }

}

Modal.propTypes = {
  foodItem: PropTypes.object,
  onClickingDelete: PropTypes.func,
  onClickingEdit: PropTypes.func,
  onClickingCancel: PropTypes.func
};


export default Modal;