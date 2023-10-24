import { useLayoutEffect, useState } from "react";

const useResize = (clientId: string) => {
  const [client, setClient] = useState<{
    width?: number;
    height?: number;
  }>({
    width: undefined,
    height: undefined,
  });

  useLayoutEffect(() => {
    const handleClientResize = () => {
      const content = document.getElementById(clientId);
      setClient({
        width: content?.clientWidth,
        height: content?.clientHeight,
      });
    };

    window.addEventListener("resize", handleClientResize);

    handleClientResize();

    return () => {
      window.removeEventListener("resize", handleClientResize);
    };
  }, [clientId]);

  return client;
};

export default useResize;
