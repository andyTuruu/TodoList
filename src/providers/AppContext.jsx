import { createContext, useContext, useMemo, useState } from 'react';

const AppContext = createContext();

function AppProvider({ children }) {
  const [currentList, setCurrentList] = useState(null);

  const value = useMemo(
    () => ({
      currentList,
      setCurrentList,
    }),
    [currentList]
  );
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

function useApp() {
  const context = useContext(AppContext);

  if (context === undefined)
    throw new Error('AppContext was used outside the AppProvider');
  return context;
}

export { AppProvider, useApp };
