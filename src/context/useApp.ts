import { useState } from "react";

const useApp = () => {
  const [mode, setMode] = useState<"light" | "dark">("light");

  const handleChangeMode = () => {
    setMode((prev) => {
      if (prev === "light") {
        return "dark";
      } else return "light";
    });
  };

  return { state: { mode }, actions: { handleChangeMode } };
};

export default useApp;
