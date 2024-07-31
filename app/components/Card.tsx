import clsx from "clsx"

export const DetailsCardItem = ({icon : Icon , text , amount , className , theme , amounttheme } : {
    icon : React.ElementType , text ?: string , amount ?: string | number, className ?: string , theme ?: string , amounttheme ?: string
}) => {
    return (
    <div className={`flex gap-4 ${className}`} >
        {Icon ? <Icon className="stroke-1  " />  : null}
        <span className={clsx('' , {
            "text-dark-green-hover" : theme == "vert",
            "text-orange" : theme == "orange",
            "text-dark" : theme == "neutre",
        })}>{text} </span>
        <span className={clsx('' , {
            "text-dark-green-hover" : amounttheme == "vert",
            "text-orange" : amounttheme == "orange",
            "text-dark" : amounttheme == "neutre",
        })}> {amount} </span>
    </div>
     )
}