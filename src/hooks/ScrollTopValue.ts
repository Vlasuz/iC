import {useEffect, useState} from "react";

export const useScrollTopValue = () => {
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        const block: any = document.querySelector(".main__inner")?.closest(".simplebar-content-wrapper")

        const handleScroll = () => {
            setScrollY(block?.scrollTop);
            document.querySelectorAll(".drop-down-absolute__block").forEach(item => {
                // @ts-ignore
                item.style.transition = "none"
            })
        };

        block?.addEventListener('scroll', handleScroll);

        return () => {
            block?.removeEventListener('scroll', handleScroll);
            document.querySelectorAll(".drop-down-absolute__block").forEach(item => {
                // @ts-ignore
                item.style.transition = "opacity 0.3s ease, visibility 0.3s ease, transform 0.3s ease"
            })
        };
    }, [scrollY]);

    return {scrollY}
}