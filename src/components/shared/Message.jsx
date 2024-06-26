import { Alert } from 'react-bootstrap'
import PropTypes from 'prop-types';

const Message = ({ 
  type, 
  message 
}) => {
  if (!message) {
    return null;
  }
  
  return (
    <Alert variant={type}>{message}</Alert>
  )
};

Message.defaultProps = {
  type: 'info',
  message: '',
};

Message.propTypes = {
  type: PropTypes.string,
  message: PropTypes.string,
};

export default Message;
