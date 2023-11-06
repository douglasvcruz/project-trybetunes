import { useState } from 'react';

export default function useHandleChange(e) {
  const [value, setValue] = useState(e);

  const handleChange = ({ target }) => {
    const newValue = target.type === 'checkbox' ? target.checked : target.value;
    setValue(newValue);
  };
  return { handleChange, value, setValue };
}
