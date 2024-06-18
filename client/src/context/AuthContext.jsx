

import React, { createContext, useState } from "react";

export const AuthContext = createContext();

function AuthContextProvider({children}) {
  const [auth,setAuth] = useState({isLoggedIn: false, token: null,username:null});
  const handleLogin=(token, username)=>{
 setAuth({...auth, token: token,isLoggedIn:true,username:username});
  }
  const handleLogout=()=>{
    setAuth({...auth, token: null,isLoggedIn:false,username:null});
     }

  return <AuthContext.Provider value={{auth,handleLogin,handleLogout}}>{children}</AuthContext.Provider>
}

export default AuthContextProvider;