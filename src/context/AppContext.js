import React, { createContext, useContext } from 'react';
import { courseData } from '../data/constants';

// --- 1. Crear el Contexto ---
const AppContext = createContext();

// --- 2. Proveedor del Contexto ---
export const AppProvider = ({ children }) => {
    const contextValue = {
        courses: courseData,
    };

    return (
        <AppContext.Provider value={contextValue}>
            {children}
        </AppContext.Provider>
    );
};

// --- 3. Hook Personalizado para usar el Contexto ---
export const useAppContext = () => {
    return useContext(AppContext);
};
