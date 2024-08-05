import { createContext, useContext } from "react";
import { User } from "./definitions";

export const UserContext = createContext<User | null>(null);

export function useUserContext() {
    const user = useContext(UserContext);

    if(user === null) {
        throw new Error("use useContext must be with a user context")

    }

    console.log('user : ',user);

    return user
}