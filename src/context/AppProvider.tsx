import { FC, ReactNode } from "react";
import AppContext from "./AppContext";
import useApp from "./useApp";

interface AppProviderProps {
  children?: ReactNode;
}

const AppProvider: FC<AppProviderProps> = ({ children }) => {
  const store = useApp();

  return <AppContext.Provider value={store}>{children}</AppContext.Provider>;
};

export default AppProvider;
