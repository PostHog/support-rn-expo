import React, { createContext, useContext, useState } from 'react';

interface SurveyContextType {
  showSurvey: boolean;
  setShowSurvey: (show: boolean) => void;
}

const SurveyContext = createContext<SurveyContextType | undefined>(undefined);

export const SurveyProvider = ({ children }: { children: React.ReactNode }) => {
  const [showSurvey, setShowSurvey] = useState(false);

  return (
    <SurveyContext.Provider value={{ showSurvey, setShowSurvey }}>
      {children}
    </SurveyContext.Provider>
  );
};

export const useSurvey = () => {
  const context = useContext(SurveyContext);
  if (context === undefined) {
    throw new Error('useSurvey must be used within a SurveyProvider');
  }
  return context;
}; 