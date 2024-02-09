import React from "react";
import { Navbar, NavbarContent, NavbarItem, Link } from "@nextui-org/react";
import { Outlet } from "react-router-dom";

export const NavBar = () => {
    return (
        <>
        <Navbar isBordered variant="sticky">
            <NavbarContent className="hidden sm:flex gap-4" justify="center">
                <NavbarItem>
                    <Link color="foreground" href="/">
                        HomePage
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link color="foreground" href="songs">
                        Songs 🎶
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link color="foreground" href="create-song">
                        Upload Song
                    </Link>
                </NavbarItem>
            </NavbarContent>
        </Navbar>
        <Outlet/>
        </>
    );
}

