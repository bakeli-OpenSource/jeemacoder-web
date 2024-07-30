import { useSearchParams } from "next/navigation"

export const useUserRole = () => {
    const role = useSearchParams();
    return role.get("role") || 'participant'
}


export const useShowModal = () => {
    const register = useSearchParams();
    return register.get("register") || null
}