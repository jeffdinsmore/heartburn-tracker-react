import { useState } from 'react';
import PropTypes from "prop-types";

const useModal = (id) => {
  const [isShowing, setIsShowing] = useState(false);

  function toggle() {
    setIsShowing(!isShowing);
  }

  return {
    isShowing,
    toggle,
    id,
    useState
  }
};

export default useModal;