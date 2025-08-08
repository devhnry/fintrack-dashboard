import React, {useEffect} from 'react';
import {useUIStore} from "@/store/uiStore";

const LayoutWrapper = ({ children }: { children: React.ReactNode }) => {

    const {sidebarOpen} = useUIStore();

    useEffect(() => {
        const handleScrollLock = () => {
            if (window.innerWidth < 768) {
                if (sidebarOpen) {
                    document.body.style.overflow = "hidden";
                } else {
                    document.body.style.overflow = "";
                }
            } else {
                // Always unlock scroll on desktop (>=768)
                document.body.style.overflow = "";
            }
        };

        handleScrollLock();

        // Optional: listen for resize to unlock if resized bigger
        const onResize = () => {
            if (window.innerWidth >= 768) {
                document.body.style.overflow = "";
            } else if (sidebarOpen) {
                document.body.style.overflow = "hidden";
            }
        };

        window.addEventListener("resize", onResize);
        return () => {
            document.body.style.overflow = "";
            window.removeEventListener("resize", onResize);
        };
    }, [sidebarOpen]);

    return (
        <main>
            {children}
        </main>
    );
};

export default LayoutWrapper;