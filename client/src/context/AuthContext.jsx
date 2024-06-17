

import React, { createContext, useState } from "react";

export const AuthContext = createContext();

function AuthContextProvider({children}) {
  const [auth,setAuth] = useState({isLoggedIn: false, token: null});
  const handleLogin=(token)=>{
 setAuth({...auth, token: token,isLoggedIn:true});
  }

  return <AuthContext.Provider value={{auth,handleLogin}}>{children}</AuthContext.Provider>
}

export default AuthContextProvider;