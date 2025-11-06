import React, { createContext } from 'react';
const DealsContext = createContext()
const DealsProvider = ({ children }) => {
    const deals = {

    }
    return <DealsContext value={deals}>
        {children}
    </DealsContext>
};

export default DealsProvider;