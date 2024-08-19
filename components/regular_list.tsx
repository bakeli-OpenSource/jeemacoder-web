import React from "react";
import Link from "next/link";

export const ListItem = ({
    items = [], // Assurez-vous que 'items' est un tableau par défaut
    resourcename,
    component: Component,
    className,
    onClick,
    withPopup = false,
    href,
    id,
}: {
    items?: any[], // Type optionnel pour 'items'
    resourcename: string,
    component: React.ElementType,
    className: string,
    onClick?: () => void,
    withPopup?: boolean,
    href?: string,
    id?: string,
}) => {
    // Assurez-vous que 'items' est un tableau avant d'utiliser '.map()'
    if (!Array.isArray(items)) {
        console.error("Expected 'items' to be an array, but received:", items);
        return null;
    }

    return (
        <div className={className}>
            {items.map((item, i) => (
                <React.Fragment key={i}>
                    {
                        !withPopup ? 
                            <Component 
                                {...{ [resourcename]: item }} 
                                onClick={onClick}
                            /> 
                            : 
                            <Link 
                                href={{
                                    pathname: `${href}`,
                                    query: {
                                        id: id
                                    },
                                }}
                            >
                                <Component 
                                    {...{ [resourcename]: item }} 
                                    onClick={onClick}
                                /> 
                            </Link>
                    }
                </React.Fragment>
            ))}
        </div>
    );
};
