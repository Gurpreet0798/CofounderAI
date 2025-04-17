"use client";

import { createContext, useState, useEffect } from "react";

export const emailsContext = createContext<any>(null);

export const EmailsContextProvider = ({ children }: any) => {
  const [emailsData, setEmailsData] = useState<any>([]);

  useEffect(() => {
    // This code runs only on the client side
    const storedEmails = localStorage.getItem("emails");
    if (storedEmails) {
      setEmailsData(JSON.parse(storedEmails));
    }
  }, []);

  useEffect(() => {
    // Update localStorage whenever emailsData changes
    localStorage.setItem("emails", JSON.stringify(emailsData));
  }, [emailsData]);

  return (
    <emailsContext.Provider
      value={{
        emailsData,
        setEmailsData,
      }}
    >
      {children}
    </emailsContext.Provider>
  );
};
