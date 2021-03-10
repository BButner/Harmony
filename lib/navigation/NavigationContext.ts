import React from 'react'

type NavigationContextProps = {
  currentService: string;
}

export const NavigationContext = React.createContext<Partial<NavigationContextProps>>({})

export const NavigationContextProvider = NavigationContext.Provider