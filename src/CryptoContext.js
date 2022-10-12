import createPalette from '@material-ui/core/styles/createPalette';
import React, { Children, createContext, useContext, useEffect, useState } from 'react';

const Crypto = createContext()

const CryptoContext = ({children}) => {
    const [currency, setCurrency] = useState("USD");
    const [symbol, setsymbol] = useState("$");
    useEffect(() => {
        if(currency === "USD") setsymbol ("$")
    },[currency]);
  return(
      <Crypto.Provider value ={{currency, symbol, setCurrency}}>{children} </Crypto.Provider>
  )
};

export default CryptoContext;

export const CryptoState = () => {
    return useContext(Crypto)
}