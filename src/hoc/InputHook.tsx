import { useState } from "react";

const useInput = (initialValue: string) => {
  const [value, setValue] = useState<string>(initialValue);

  return {
    value,
    setValue,
    reset: () => setValue(""),
    bind: {
      value,
      onChange: (event: any) => {
        setValue(event.currentTarget.value);
      },
    },
  };
};

export default useInput;
