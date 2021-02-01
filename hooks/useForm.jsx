import { useState } from 'react';

const useForm = (data) => {
  const [input, setInput] = useState(data);

  const handleInputChange = (e) => setInput({
    ...input,
    [e.currentTarget.name]: e.currentTarget.value,
  });

  return [input, handleInputChange, setInput];
};

export default useForm;
