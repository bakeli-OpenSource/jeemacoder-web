import React , {createContext, useContext, useState} from "react"

export const useAuth = () => {
    return useContext(AuthContext)
}

const AuthContext = React.createContext({})

export function AuthProvider({children} : {children : React.ReactNode}){
    const  [authUser , setAuthUser] = useState<null | {}>(null)
    const  [isLodedIn , setisLodedIn] = useState<null | {}>(false)

    const value= {
        authUser ,
        setAuthUser,
        isLodedIn,
        setisLodedIn
    }
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}