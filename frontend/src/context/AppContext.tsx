import React, { createContext } from "react";

interface Props {
    children: React.ReactNode;
}

export const AppContext = createContext({})

const value = {

}

export const AppContextProvider = ({ children }: Props) => {
    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
}