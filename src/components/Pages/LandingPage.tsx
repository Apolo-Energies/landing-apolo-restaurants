"use client";
import { useEffect, useRef } from 'react'
import { Block1Component } from '../Blocks/Block1Component';
import { Block2Component } from '../Blocks/Block2Component';
import { Block3Component } from '../Blocks/Block3Component';
import { Block4Component } from '../Blocks/Block4Component';
import { Block5Component } from '../Blocks/Block5Component';
import { Block6Component } from '../Blocks/Block6Component';
import { BlockQuery } from '../Blocks/BlockQuery';
import { sendGTMEvent } from '@next/third-parties/google';

export const LandingPage = () => {

    useEffect(() => {
        sendGTMEvent({ event: 'gtm-test', page: 'landing' })
    }, [])

    const block1Ref = useRef<HTMLDivElement | null>(null);
    const blockQueryRef = useRef<HTMLDivElement | null>(null);

    const scrollTo = (ref: React.RefObject<HTMLDivElement | null>) => {
        if (!ref.current) return;
        const top = ref.current.getBoundingClientRect().top + window.scrollY - 100;
        window.scrollTo({ top, behavior: "smooth" });
    };

    return (
        <div className="min-h-screen bg-white">
            {/* Navigation */}
            <nav className="bg-linear-to-b from-[#15268D] to-[#2541E9] text-white p-4 sticky top-0 z-50">
                <div className="container mx-auto flex justify-center items-center">
                    <img
                        src="/logos/apolologo2.webp"
                        alt="Apolo Energies"
                        className="h-12 md:h-16"
                    />
                </div>
            </nav>


            {/* Content */}
            <div ref={block1Ref}>
                <Block1Component onScrollToQuery={() => scrollTo(blockQueryRef)} />
            </div>
            <Block2Component />
            <Block3Component />
            <Block4Component />
            <Block5Component />
            <div ref={blockQueryRef}>
                <BlockQuery />
            </div>
            {/* Pasamos función scrollTo */}
            <Block6Component onScrollToForm={() => scrollTo(block1Ref)} />
        </div>
    );
};
