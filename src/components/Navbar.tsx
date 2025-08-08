import React from 'react';
import Container from "@/components/Container";
import Image from "next/image";

import HamburgerMenu from "@/assets/icons/hamburgerMenu.svg"
import Logo from "@/assets/icons/logo.svg"
import Search from "@/assets/icons/search.svg"
import DashboardIcon from "@/assets/icons/dashboard.svg"
import AccountProfile from "@/assets/images/account-profile.png"

const Navbar = () => {
    return (
        <Container>
            <nav className={`flex justify-between items-center my-3`}>
                <div className={`nav-spacing`}>
                    <HamburgerMenu />
                    <Logo />
                </div>
                <div className={`nav-spacing`}>
                    <Search />
                    <DashboardIcon />
                    <Image className={`size-10 rounded-full`} src={AccountProfile} alt="profile" />
                </div>
            </nav>
        </Container>
    );
};

export default Navbar;