import { useCallback, useEffect } from "react";

const useAddCounter = (setCounterInfo, defaultCounterNumber) => {
  const addCounter = useCallback(({ number = 1 }) => {
    for (let i = 0; i < number; i += 1) {
      setCounterInfo((prev) => ({
        ...prev,
        [Object.keys(prev).length + 1]: {
          processingNumber: null,
          processed: [],
        },
      }));
    }
  }, []);

  useEffect(() => {
    addCounter({ number: defaultCounterNumber });
  }, []);

  return addCounter;
};
export default useAddCounter;
