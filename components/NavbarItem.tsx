import React from "react";
import Link from "next/link"
interface NavbarItemProps{
    label:string;
    route:string;
}

const NavbarItem:React.FC<NavbarItemProps> = ({label,route})=>{
    return (
        <Link href={route} className="cursor-pointer hover:font-semibold transition jockey-one-regular">
            {label}
        </Link>
    )
}
export default NavbarItem;