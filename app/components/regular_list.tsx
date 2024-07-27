import Link from "next/link"

export const ListItem = ({items , resourcename , component : Component , className , onClick , href , id} : {
    items : any[] , 
    resourcename : string , 
    component : React.ElementType , 
    className : string ,
    onClick ?: () => void,
    href ?: string,
    id ?:  string,
}) => {
    
    return (
        <div className={className}>
            {items.map((item , i ) => (
                <>
                    <Component 
                        key={i} 
                        {...{[resourcename]: item}} 
                        onClick={onClick}
                />  
                </>
            ))}
        </div>
    )
}

