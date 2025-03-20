import { useState, useEffect } from "react";

// Hook giúp giảm tải khi gõ nhanh và tối ưu hóa hiệu suất khi tìm kiếm
export const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};
