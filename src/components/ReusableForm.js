import React from "react";
import PropTypes from "prop-types";

function ReusableForm(props) {
  return (
    <React.Fragment>
      <form onSubmit={props.formSubmissionHandler}>
        <input
          type='text'
          name='foodName'
          placeholder='Food Item' />
        <br></br>
        <input
          type='text'
          name='ingredients'
          placeholder='Ingredients' />
        <br></br>
        <input
          type="text"
          name='heartburn'
          placeholder='Heartburn Yes/No' />
        <button className="Submit" type='submit'>{props.buttonText}</button>
      </form>
    </React.Fragment>
  );
}

ReusableForm.propTypes = {
  formSubmissionHandler: PropTypes.func,
  buttonText: PropTypes.string
};

export default ReusableForm;