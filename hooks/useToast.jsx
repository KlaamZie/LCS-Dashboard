import { useState } from 'react';

const useToast = () => {
  const [message, setMessage] = useState('');
  const [display, setDisplay] = useState(false);

  return [message, setMessage, display, setDisplay];
};

export default useToast;
