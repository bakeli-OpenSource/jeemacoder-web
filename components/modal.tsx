import clsx from "clsx"
import { Button } from "./button"

export const Modal = ({showModal , onClose , children , className} : {
    showModal : boolean , 
    onClose : () => void,
    children : React.ReactNode,
    className : string
    }) => {

    return showModal ? (
        <div className={clsx(' absolute z-10 w-full h-screen flex justify-center overflow-auto backdrop-blur-sm left-0 right-0 top-0' , 
            className
        )} 
            onClick={onClose}
        >
            <div className='' 
                onClick={e => e.stopPropagation()} >
                {children}
            </div>
        </div>
    ) : null
}

export const YesOrNoModal = ({onClose , href } : {onClose  : () => void , href : string}) => {
    return (
        <div className="max-w-xl rounded-md px-9 py-3 flex flex-col gap-5 bg-white transition-all shadow-md">
            <p> voulez voulez quitter cette page ? </p>
            <div className="flex gap-2 justify-around">
                <Button href={href} types="link" size="small" className="text-dark border"> continuer </Button>
                <Button  onClick={onClose} types="button" size="small" className="text-dark border"> annuler </Button>
            </div>
        </div>
    )
}