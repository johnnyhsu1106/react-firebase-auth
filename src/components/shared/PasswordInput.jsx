import { useState, useId, forwardRef } from 'react';
import { Form } from 'react-bootstrap';
import showPasswordIcon from '/images/show-password.svg';
import hidePasswordIcon from '/images/hide-password.svg';
import PropTypes from 'prop-types';


const PasswordInput = forwardRef(({
  className,
  placeholder,
  required
}, ref) => {
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const passwordInputId = useId();
    
  const handlePasswordToggle = () => {
    setIsPasswordShown((isPrevPasswordShown) => {
      return !isPrevPasswordShown;
    });
  };

  return ( 
    <Form.Group 
      controlId={`password-${passwordInputId}`} 
      className={`${className} position-relative`}
    >
      <Form.Control
        type={isPasswordShown ? 'text' : 'password'}
        required={required} 
        placeholder={placeholder}
        ref={ref}
      />
      <img 
        className='position-absolute bottom-0 end-0 mx-3' 
        style={{height: '75%', cursor: 'pointer'}}
        src={isPasswordShown ? hidePasswordIcon : showPasswordIcon}
        onClick={handlePasswordToggle}
      />
    </Form.Group>
  )
});

PasswordInput.displayName = 'PasswordInput';

PasswordInput.defaultProps = {
  className: '',
  placeholder: '',
  required: true
};

PasswordInput.propTypes = {
  className: PropTypes.string,
  placeholder: PropTypes.string,
  required: PropTypes.bool
};

export default PasswordInput;
