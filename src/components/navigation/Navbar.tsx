import Container from "@/components/layout/Container";
import Image from "next/image";

import HamburgerMenu from "@/assets/icons/hamburgerMenu.svg";
import Logo from "@/assets/icons/logo.svg";
import Search from "@/assets/icons/search.svg";
import DashboardIcon from "@/assets/icons/dashboard.svg";
import AccountProfile from "@/assets/images/account-profile.png";
import {useUIStore} from "@/store/uiStore";
import React, {useState} from "react";

const Navbar = () => {
    const { toggleSidebar, search, setSearch } = useUIStore();
    const [showSearchBar, setShowSearchBar] = useState(false);

    return (
        <Container>
            <nav className={`flex justify-between gap-5 my-3 ${showSearchBar ? "items-center xs:items-center" : "items-center"}`}>
                <div className="nav-spacing">
                    <button
                        onClick={toggleSidebar}
                        aria-label="Toggle sidebar"
                        className="focus:outline-none cursor-pointer"
                    >
                        <HamburgerMenu />
                    </button>
                    <Logo />
                </div>
                <div className={`flex flex-row-reverse items-end gap-2 xs:flex-row-reverse xs:gap-1 sm:gap-4`}>
                    <div className="nav-spacing flex-shrink-0 flex items-center gap-4">
                        <div className="cursor-pointer" onClick={() => setShowSearchBar(!showSearchBar)}>
                            <Search />
                        </div>
                        <DashboardIcon className={`${showSearchBar ? 'hidden sm:block' : 'block'}`} />
                        <Image className="size-10 select-none rounded-full focus:outline-none" src={AccountProfile} alt="profile" />
                    </div>

                    <div className={`relative flex-shrink-0 transition-all duration-300 ease-in-out ${
                            showSearchBar ? 'max-w-[120px] sm:max-w-[180px] ml-2 opacity-100' : 'max-w-0 opacity-0 ml-0'
                        }`}
                        style={{ overflow: 'hidden' }}
                    >
                        <input
                            type="text"
                            placeholder="Search transactions..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="border-[1.5px] border-brand-600/20 rounded-[16px] px-3 py-1.5 text-[13px] focus:outline-none text-foreground w-full placeholder:select-none"
                        />
                    </div>

                </div>
            </nav>
        </Container>
    );
};


export default Navbar;