import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Context=createContext();

export function AuthProvider ({children}){
    const [user,setUser] =useState(JSON.parse(localStorage.getItem("user-info")) || false);

    const data={
        user,
        setUser
    }
    const navigate=useNavigate();

    useEffect(()=>{
        localStorage.setItem("user-info", JSON.stringify(user));
    },[user])


    return(
        <Context.Provider value={data}>
            {children}
        </Context.Provider>
    )


}
export const useAuth= ()=>useContext(Context);
