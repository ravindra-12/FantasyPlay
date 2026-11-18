import { createContext, useContext, useMemo, useState } from 'react';
type AuthState={isLoggedIn:boolean;phone:string;login:(phone:string)=>void;logout:()=>void};
const AuthContext=createContext<AuthState|undefined>(undefined);
export function AuthProvider({children}:{children:React.ReactNode}){const [isLoggedIn,setLoggedIn]=useState(false);const [phone,setPhone]=useState('');const value=useMemo(()=>({isLoggedIn,phone,login:(value:string)=>{setPhone(value);setLoggedIn(true)},logout:()=>setLoggedIn(false)}),[isLoggedIn,phone]);return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>}
export function useAuth(){const value=useContext(AuthContext);if(!value)throw new Error('AuthProvider missing');return value;}
