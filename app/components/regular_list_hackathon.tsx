import Link from "next/link";

export const ListItem = ({
    items,
    resourcename,
    component: Component,
    className,
    onClick,
    withPopup = false,
    href,
    id
}: {
    items: any[],
    resourcename: string,
    component: React.ElementType,
    className: string,
    onClick?: (item: any) => void,  // Typage du onClick pour recevoir un item
    withPopup?: boolean,
    href?: string,
    id?: string,
}) => {
    return (
        <div className={className}>
            {items.map((item, i) => (
                <div key={i}>
                    {
                        !withPopup ? 
                        <Component 
                            {...{[resourcename]: item}} 
                            onClick={() => onClick && onClick(item)}  // Passer item à onClick
                        />  
                        : 
                        <Link href={{
                            pathname: href || '',
                            query: {
                                id: item.id  // Utiliser item.id
                            },
                        }}>
                            <Component 
                                {...{[resourcename]: item}} 
                                onClick={() => onClick && onClick(item)}  // Passer item à onClick
                            /> 
                        </Link>
                    }
                </div>
            ))}
        </div>
    );
};
