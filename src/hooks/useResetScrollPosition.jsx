import { useEffect } from "react";

const useResetScrollPosition = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
};

export default useResetScrollPosition;
