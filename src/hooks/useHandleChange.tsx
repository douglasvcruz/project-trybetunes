import { useState } from 'react';

interface event {
  [index: string]: string;
}

export default function useHandleChange(e: event) {
  const [value, setValue] = useState<event>(e);

  const handleChange = (event: { target: HTMLInputElement }) => {
    const newValue = event.target.value;
    setValue(prev => ({
      ...prev,
      [event.target.name]: newValue,
    }));
  };
  return { onChange: handleChange, value, setValue };
}
