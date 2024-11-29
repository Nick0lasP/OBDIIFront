import React, { createContext, useState } from 'react';

export const ProblemsContext = createContext();

export const ProblemsProvider = ({ children }) => {
  const [problems, setProblems] = useState([]);

  return (
    <ProblemsContext.Provider value={{ problems, setProblems }}>
      {children}
    </ProblemsContext.Provider>
  );
};

